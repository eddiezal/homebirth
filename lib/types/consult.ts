export interface ConsultRequest {
  providerId: string;
  providerName: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  password?: string;
  submittedAt: string;
}
