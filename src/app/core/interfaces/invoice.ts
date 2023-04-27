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
  currency: string;
  invoice_id: string;
}

export interface Service {
  serviceId: number;
  service: string;
}

export interface Merchant {
  id: number;
  merchant: string;
  services: Service[]
}

export interface ProcessingCentre {
  centerId: number;
  centerName: string;
}

export interface ProcessingCountry {
  id: number;
  name: string;
  centers: ProcessingCentre[]
}