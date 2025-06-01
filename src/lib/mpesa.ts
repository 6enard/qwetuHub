import axios from 'axios';

interface STKResponse {
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CustomerMessage: string;
}

const MPESA_API_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
const CONSUMER_KEY = 'sYs9Ig9SvbwVOqqiJ6psYKJWBu1wi3kzG7YXN2ApwL2BYdxO';
const CONSUMER_SECRET = 'xailp5i99ryshgC3L7BnP17dPTNAvvxAXlKlOOyHQmWqbcUkDQowxMkIsc4o7EYr';
const BUSINESS_NUMBER = '0740087715';

const getAccessToken = async () => {
  const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`);
  
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.data.access_token) {
      throw new Error('Invalid access token response');
    }
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.errorMessage || 'Failed to authenticate with M-Pesa');
    }
    throw new Error('Network error while authenticating with M-Pesa');
  }
};

export const initiateSTKPush = async (phoneNumber: string, amount: number): Promise<STKResponse> => {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = btoa(`${BUSINESS_NUMBER}${CONSUMER_SECRET}${timestamp}`);

    const response = await axios.post<STKResponse>(
      MPESA_API_URL,
      {
        BusinessShortCode: BUSINESS_NUMBER,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: phoneNumber,
        PartyB: BUSINESS_NUMBER,
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
      throw new Error(error.response.data.errorMessage || 'Failed to initiate payment');
    }
    throw new Error('Network error while processing payment');
  }
};