import axios from 'axios';

const CONSUMER_KEY = 'sYs9Ig9SvbwVOqqiJ6psYKJWBu1wi3kzG7YXN2ApwL2BYdxO';
const CONSUMER_SECRET = 'xailp5i99ryshgC3L7BnP17dPTNAvvxAXlKlOOyHQmWqbcUkDQowxMkIsc4o7EYr';
const BUSINESS_NUMBER = '0740087715';

interface STKResponse {
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CustomerMessage: string;
}

const getAccessToken = async () => {
  const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    
    if (!response.data.access_token) {
      throw new Error('Failed to get access token');
    }
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to authenticate with M-Pesa');
  }
};

export const initiateSTKPush = async (phoneNumber: string, amount: number): Promise<STKResponse> => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const shortcode = BUSINESS_NUMBER;
    const password = btoa(`${shortcode}${CONSUMER_SECRET}${timestamp}`);
    
    const response = await axios.post<STKResponse>(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount), // Ensure amount is a whole number
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: 'https://example.com/callback',
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

    if (!response.data.CheckoutRequestID) {
      throw new Error('Invalid response from M-Pesa');
    }

    return response.data;
  } catch (error) {
    console.error('Error initiating STK push:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errorMessage || 'Payment initiation failed');
    }
    throw new Error('Failed to initiate payment. Please try again.');
  }
};