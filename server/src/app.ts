import express from 'express';
import 'reflect-metadata';

import './shared/container';
import { routes } from './http/routes';

export const app = express();

app.use(express.json());
app.use(routes);