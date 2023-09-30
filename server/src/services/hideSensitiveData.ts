

export function hideSensitiveData(email: string, cpf: string) {
	const [initialCPF, , slpitCPF] = cpf.split('.');
	const [, digitCPF] = slpitCPF.split('-');

	const [splitEmail,  emailDomain] = email.split('@');

	const maskEmail = email.slice(0, -15);
  
	const lenthInitialEmail = splitEmail.length - maskEmail.length;

	return {
		email: `${maskEmail}${'*'.repeat(lenthInitialEmail)}@${emailDomain}`,
		cpf: `${initialCPF}.***.***-${digitCPF}`
	};
}