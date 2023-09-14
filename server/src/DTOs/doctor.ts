export interface RegisterDoctorRequest {
  name: string,
  CRM:  string,
  password: string,
  expertise: string,
  phone: string,
  cell?: string
  agreement: string
}

export interface UpdateDoctorRequest {
  phone: string;
  cell: string;
  agreement: string;
}

export interface returnDoctorsInfo {
	id: string,
	name: string,
	CRM: string,
	expertise: string,
	phone: string,
	agreement: string,
  cell?: string 
}

export interface LoginDoctorRequest {
  CRM: string;
  password: string
}

export interface LoginDoctorResponse {
  name: string,
  CRM: string,
  token: string
}