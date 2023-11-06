export function hideSensitiveData(email: string, cpf: string) {
	const [initialCPF, , slpitCPF] = cpf.split('.');
	const [, digitCPF] = slpitCPF.split('-');

	const [splitEmail,  emailDomain] = email.split('@');

	//Código comentado, pois vou decidir se realmente precisa omitir o e-mail do paciente
	// const maskEmail = email.slice(0, -15);
  
	// const lenthInitialEmail = splitEmail.length - maskEmail.length;

	return {
		cpf: `${initialCPF}.***.***-${digitCPF}`
	};
}