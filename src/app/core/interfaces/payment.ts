export interface Payment {
  order_id: string;
  invoice_id: string;
  amount: number;
  name: string;
  contact: string | number;
  email: string;
  gateway: string;
}

export interface RazorpayOrder {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string
}

export interface StripeOrder {
  stripe_order_id: string;
  stripe_payment_id: string;
  stripe_signature: string
}

export interface PaymentAttemptsTS {
  order_id: string;
  payment_gateway: string;
  service_amount: string;
  gateway_fees: string;
  status: string;
  date_time: string;
}