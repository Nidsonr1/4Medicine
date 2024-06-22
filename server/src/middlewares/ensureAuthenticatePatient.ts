import { Unauthenticated } from '@helpers/api-errors/api-errors';
import { env } from 'env';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';


interface IPayload {
  sub: string;
}

export async function EnsureAuthenticatePatient(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const authHeader = request.headers.authorization;
		
		if (!authHeader) {
			throw new Unauthenticated();
		}

		const [, token] = authHeader.split(' ');

		if (!token) {
			console.log('Deu erro aqui no token');
		}
		
		const { sub } = verify(token, '345066e416e13e7d2dc19de4632cb996') as IPayload;
		request.patientId = sub;

		return next();
	} catch (error) {
		if (error instanceof Unauthenticated) {
			return response.status(401).json({
				message: error.message
			});
		}
	}
}
