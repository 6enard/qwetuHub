import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MPESA_API_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
const CONSUMER_KEY = Deno.env.get('MPESA_CONSUMER_KEY');
const CONSUMER_SECRET = Deno.env.get('MPESA_CONSUMER_SECRET');
const BUSINESS_NUMBER = Deno.env.get('MPESA_BUSINESS_NUMBER');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

async function getAccessToken() {
  const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  
  try {
    const response = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error('Invalid access token response');
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to authenticate with M-Pesa');
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { phoneNumber, amount } = await req.json();

    if (!phoneNumber || !amount) {
      return new Response(
        JSON.stringify({ error: 'Phone number and amount are required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = btoa(`${BUSINESS_NUMBER}${CONSUMER_SECRET}${timestamp}`);

    const response = await fetch(MPESA_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: BUSINESS_NUMBER,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: phoneNumber,
        PartyB: BUSINESS_NUMBER,
        PhoneNumber: phoneNumber,
        CallBackURL: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mpesa-callback`,
        AccountReference: 'QWETUHub',
        TransactionDesc: 'Payment for supplies'
      })
    });

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing M-Pesa request:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process payment request' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});