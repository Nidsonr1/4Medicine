import { Unauthenticated } from '@errors/general-errors';
import { env } from 'env';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string
}

export async function EnsureAuthenticateDoctor(
	request: Request,
	response: Response,
	next: NextFunction
) {
	try {
		const authHeader = request.headers.authorization;

		if(!authHeader) {
			throw new Unauthenticated();
		}

		const [, token] = authHeader.split(' ');
		const { sub } = verify(token, env.DOCTORKEY) as IPayload;

		request.doctorId = sub;

		return next();
	} catch (error) {
		if (error instanceof Unauthenticated) {
			return response.status(401).json({
				message: error.message
			});
		}
	}
}