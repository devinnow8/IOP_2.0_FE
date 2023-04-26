export interface Invoice {
  merchant: string;
  merchant_service: string;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_email: string;
  applicant_phone_number: string | number;
  applicant_nationality: string;
  processing_center: string;
  processing_country: string;
  service_fee: number;
  gateway_fee: number;
  total: number;
  mode_of_payment: string;
}