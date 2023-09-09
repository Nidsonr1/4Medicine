export interface RegisterDoctorRequest {
  name: string,
  CRM:  string,
  password: string,
  expertise: string,
  phone: string,
  agreement: string
}


export interface UpdateDoctorRequest {
  phone: string;
  agreement: string;
}
