import axios from 'axios';

interface STKResponse {
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CustomerMessage: string;
}

export const initiateSTKPush = async (phoneNumber: string, amount: number): Promise<STKResponse> => {
  try {
    const response = await axios.post<STKResponse>(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mpesa`,
      {
        phoneNumber,
        amount
      },
      {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
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
      throw new Error(error.response.data.error || 'Payment initiation failed');
    }
    throw new Error('Failed to initiate payment. Please try again.');
  }
};