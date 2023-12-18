export function isValidDate(startDate: Date, endDate: Date, currentDate: Date) {
	const inititalDay = startDate.getDate();
	const endDay = endDate.getDate();

	if (startDate < currentDate) {
		return 'A data de início deve estar no futuro.';
	}

	if (endDate < currentDate) {
		return'A data de término deve estar no futuro.';
	}

	if (endDate <= startDate) {
		return 'A data de término deve ser posterior à data de início.';
	}

	if (inititalDay != endDay) {
		return 'A data de início e de término tem que está no mesmo dia.';
	}
}