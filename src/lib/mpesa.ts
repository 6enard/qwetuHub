import axios from 'axios';

const CONSUMER_KEY = 'sYs9Ig9SvbwVOqqiJ6psYKJWBu1wi3kzG7YXN2ApwL2BYdxO';
const CONSUMER_SECRET = 'xailp5i99ryshgC3L7BnP17dPTNAvvxAXlKlOOyHQmWqbcUkDQowxMkIsc4o7EYr';
const BUSINESS_NUMBER = '0740087715';

const getAccessToken = async () => {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export const initiateSTKPush = async (phoneNumber: string, amount: number) => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const shortcode = BUSINESS_NUMBER;
    
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortcode,
        Password: Buffer.from(`${shortcode}${CONSUMER_SECRET}${timestamp}`).toString('base64'),
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://example.com/callback', // Replace with your callback URL when ready
        AccountReference: 'QWETUHub',
        TransactionDesc: 'Payment for supplies'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error initiating STK push:', error);
    throw error;
  }
};