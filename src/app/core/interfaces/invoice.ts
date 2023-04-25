export interface Invoice {
  merchant: string;
  merchant_service: string;
  applicant_first_name: string;
  applicant_last_name: string;
  applicant_email: string;
  applicant_phone_number: string;
  applicant_nationality: string;
  processing_center: string;
  processing_country: string;
  service_fee: string;
  gateway_fee: string;
  total: string;
  mode_of_payment: string;
}