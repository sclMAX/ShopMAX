export interface PaymentMethodSettingInterface {
  security_code?: {mode?: string, card_location?: string, length?: number};
  card_number?: {length?: number, validation?: string};
  bin?: {
    pattern?: string,
    installments_pattern?: string,
    exclusion_pattern?: string
  };
}
export interface PaymentMethodInterface {
  id?: string;
  name?: string;
  payment_type_id?: string;
  status?: string;
  secure_thumbnail?: string;
  thumbnail?: string;
  deferred_capture?: string;
  settings?: PaymentMethodSettingInterface[];
  additional_info_needed?: [];
  min_allowed_amount?: number;
  max_allowed_amount?: number;
  accreditation_time?: number;
  financial_institutions?: [];
  processing_modes?: [];
}
