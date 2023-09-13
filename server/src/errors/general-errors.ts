export class Unauthenticated extends Error {
	constructor() {
		super('Token Missing');
	}
}

