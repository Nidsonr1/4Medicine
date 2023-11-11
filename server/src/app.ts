import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import 'express-async-errors';

import './shared/container';
import { routes } from './http/routes';
import { env } from 'env';
import { ZodError } from 'zod';
import cors from 'cors';
import { ApiErrors } from '@helpers/api-errors/api-errors';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static('tmp/uploads'));
app.use(express);

app.use((
	error: Error & Partial<ApiErrors>,
	_: Request,
	response: Response,
	next: NextFunction
) => {
	if (error instanceof ZodError) {
		return response.status(400).json({
			message: 'Validation Error.',
			issues: error
		});
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	}

	const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';
	return response.status(statusCode).json({ message });

});
