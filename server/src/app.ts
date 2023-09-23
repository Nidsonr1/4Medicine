import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

import './shared/container';
import { routes } from './http/routes';
import { env } from 'env';
import { ZodError } from 'zod';

export const app = express();

app.use(express.json());
app.use((
	error: Error,
	_: Request,
	response: Response,
	next: NextFunction
) => {
	if (error instanceof ZodError) {
		return response.status(400).json({
			message: 'Validation Error.',
			issues: error.format()
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	}

	return response.status(500).json({ message: 'Internal Server Error' });

});

app.use(routes);