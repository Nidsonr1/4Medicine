import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const expertiseList = [
		{name: 'Cardiologia'},
		{name: 'Dermatologia'},
		{name: 'Endocrinologia'},
		{name: 'Gastroenterologia'},
		{name: 'Geriatria'},
		{name: 'Ginecologia'},
		{name: 'Hematologia'},
		{name: 'Infectologia'},
		{name: 'Nefrologia'},
		{name: 'Neurologia'},
		{name: 'Oftalmologia'},
		{name: 'Ortopedia'},
		{name: 'Otorrinolaringologia'},
		{name: 'Pediatria'},
		{name: 'Pneumologia'},
		{name: 'Psiquiatria'},
		{name: 'Reumatologia'},
		{name: 'Urologia'}
	];

	const agreementList = [
		{ name: 'Unimed'},
		{ name: 'Hapvida'},
		{ name: 'Bradesco'},
		{ name: 'Amil'},
		{ name: 'SulAmérica'},
		{ name: 'Outros'},
	];

	for (const expertise of expertiseList ) {
		await prisma.expertise.create({
			data: expertise
		});
	}

	for (const agreement of agreementList) {
		await prisma.agreement.create({
			data: agreement
		});
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	}).finally(() => {
		prisma.$disconnect;
	});



















