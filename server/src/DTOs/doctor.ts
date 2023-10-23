export interface IRegisterDoctorRequest {
  name: string,
  CRM:  string,
  password: string,
  expertise: string[],
  phone: string,
  cell?: string
  agreement: string[]
}

export interface IUpdateDoctorRequest {
  phone: string;
  cell?: string;
  agreement: string[];
  doctorId: string
}

export interface IReturnDoctorsInfo {
	id: string,
	name: string,
	CRM: string,
	expertise: string[],
	phone: string,
	agreement: string[],
  cell?: string | null
}

export interface ILoginDoctorRequest {
  CRM: string;
  password: string
}

export interface ILoginDoctorResponse {
  name: string,
  CRM: string,
  token: string
}

export interface IListPatientsResponse {
	doctorId: string,
	search?: string
}
