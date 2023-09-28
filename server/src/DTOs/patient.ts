export interface RegisterPatientRequest {
  name: string,
  cpf: string,
  email: string,
  password: string,
  color: string,
  birthdate: string,
  civilStatus: string,
  motherName: string,
  fatherName: string,
  bloodType: string,
  zipCode: string,
  city: string,
  uf: string,
  neighborhood: string,
  street: string,
  complement: string,
  number: number,
  cell: string,
}

export interface UpdatePatientRequest {
  name: string,
  email: string,
  bloodType: string,
  zipCode: string,
  city: string,
  uf: string,
  neighborhood: string,
  street: string,
  complement: string,
  number: number,
  cell: string,
}


export interface ReturnPatient {
  name: string
  cpf: string
  email: string
  civilStatus: string
  color: string
  birthdate: string
  motherName: string
  fatherName: string
  bloodType: string
  address: {
    zipCode: string
    city: string
    uf: string
    neighborhood: string
    street: string
    complement: string
    number: number
    cell: string
  }
}

export interface LoginPatientRequest {
  email: string;
  password: string;
}

export interface LoginPatientResponse {
  name: string,
  email: string,
  token: string
}