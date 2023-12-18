import { z } from 'zod';

//Patient's validation
export const registerPatientSchema = z.object({
	name: z.string(),
	cpf: z.string(),
	email: z.string(),
	password: z.string().min(8),
	gender: z.string(),
	cell: z.string(),
	dateOfBirth: z.string(),
	zipCode: z.string(),
	city: z.string(),
	uf: z.string(),
	neighborhood: z.string(),
	street: z.string(),
	complement: z.string().optional(),
	number: z.number(),
});

export const sharedExamsSchema = z.object({
	doctorId: z.string(),
	patientId: z.string(),
	examId: z.string()
});

export const sharedReportsSchema = z.object({
	doctorId: z.string(),
	patientId: z.string(),
	reportId: z.string()
});

export const updatePatientSchema = z.object({
	name: z.string(),
	email: z.string(),
	zipCode: z.string(),
	city: z.string(),
	uf: z.string(),
	neighborhood: z.string(),
	street: z.string(),
	complement: z.string().optional(),
	number: z.coerce.number(),
	cell: z.string(),
	patientId: z.string()
});

export const infoPatientSchema = z.object({
	patientId: z.string()
});

export const loginPatientSchema = z.object({
	cpf: z.string(),
	password: z.string()
});

//Appointment's validation
export const registerAppointmentSchema = z.object({
	title: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string().optional(),
	doctorId: z.string(),
	patientId: z.string(),
	link: z.string().optional()
});

export const listAppointmentSchema = z.object({
	customerId: z.string()
});

//Doctor's validation
export const infoDoctorSchema = z.object({
	doctorId: z.string()
});

export const listDoctorSchema = z.object({
	search: z.string().optional()
});

export const listPatientsSchema = z.object({
	search: z.string().optional(),
	doctorId: z.string()
});

export const loginDoctorSchema = z.object({
	CRM: z.string(),
	password: z.string().min(6)
});

export const registerDoctorSchema = z.object({
	name: z.string(),
	CRM: z.string().min(9).max(11),
	password: z.string().min(6),
	expertise: z.array(z.string()),
	phone: z.string().optional(),
	cell: z.string(),
	agreement: z.array(z.string())
});

export const updateDoctorSchema = z.object({
	name: z.string(),
	phone: z.string(),
	agreement: z.array(z.string()),
	expertise: z.array(z.string()),
	cell: z.string().optional(),
	doctorId: z.string()
});

export const listDoctorsWhoSharedSchema = z.object({
	doctorsIds: z.array(z.string())
});

//Exam's validation
export const listExamsSchema = z.object({
	customerId: z.string(),
	order: z.string().optional(),
	search: z.string().optional(),
	take: z.coerce.number(),
	skip: z.coerce.number()
});

export const registerExamSchema = z.object({
	documentTitle: z.string(),
	document: z.string(),
	patientId: z.string()
});

//Report's validation
export const listReportsSchema = z.object({
	customerId: z.string(),
	order: z.string().optional(),
	search: z.string().optional(),
	take: z.coerce.number(),
	skip: z.coerce.number().optional()
});

export const registerReportSchema = z.object({
	documentTitle: z.string(),
	document: z.string(),
	patientId: z.string(),
	doctorId: z.string()
});