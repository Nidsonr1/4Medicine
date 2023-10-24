export function isValidDate(startDate: Date, endDate: Date, currentDate: Date) {
	if (startDate < currentDate) {
		return 'A data de início deve estar no futuro.';
	}

	if (endDate < currentDate) {
		return'A data de término deve estar no futuro.';
	}

	if (endDate <= startDate) {
		return 'A data de término deve ser posterior à data de início.';
	}
}