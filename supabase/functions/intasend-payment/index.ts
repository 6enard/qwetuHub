import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const INTASEND_API_KEY = 'ISPubKey_live_ced76b7f-2555-4337-beb6-d2ff2089f975';
const INTASEND_API_URL = 'https://sandbox.intasend.com/api/v1/payment/mpesa-stk-push/';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phoneNumber, amount, orderId } = await req.json();

    if (!phoneNumber || !amount) {
      return new Response(
        JSON.stringify({ error: 'Phone number and amount are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const response = await fetch(INTASEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${INTASEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        amount,
        currency: 'KES',
        email: null,
        name: null,
        reference: orderId,
        api_ref: orderId
      })
    });

    if (!response.ok) {
      throw new Error(`IntaSend API error! status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing IntaSend payment:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process payment request',
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});