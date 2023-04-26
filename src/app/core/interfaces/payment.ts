export interface RazorpayPayment {
  order_id: string;
  amount: number;
  name: string;
  contact: string | number;
  email: string;
}

export interface RazorpayOrder {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string
}