export interface IRegisterPatientRequest {
  name: string;
  cpf: string;
  email: string;
  password: string;
  gender: string;
  cell: string;
  dateOfBirth: string;
  zipCode: string;
  city: string;
  uf: string;
  neighborhood: string;
  street: string;
  complement?: string | undefined;
  number: number;
}

export interface IUpdatePatientRequest {
  name: string;
  email: string;
  zipCode: string;
  city: string;
  uf: string;
  neighborhood: string;
  street: string;
  complement?: string;
  number: number;
  cell: string;
  patientId: string
}


export interface IReturnPatient {
  id: string;
  name: string;
  cpf: string;
  email: string;
  dateOfBirth: string;
  cell: string;
  address: {
    zipCode: string;
    city: string;
    uf: string;
    neighborhood: string;
    street: string;
    complement?: string | null;
    number: number;
  }
}

export interface ILoginPatientRequest {
  cpf: string;
  password: string;
}

export interface ILoginPatientResponse {
  id: string;
  name: string;
  email: string;
  token: string
}