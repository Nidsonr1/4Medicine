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

export interface returnDoctorsInfo {
	id: string,
	name: string,
	CRM: string,
	expertise: string,
	phone: string,
	agreement: string
}