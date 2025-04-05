import { drizzle } from 'drizzle-orm/postgres-js';
import { dev } from '$app/environment';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';

const url = dev ? 'postgresql://postgres:postgres@127.0.0.1:54322/postgres' : env.DATABASE_URL;

if (!url) {
	throw new Error('DATABASE_URL is not set');
}

const client = postgres(url)
export const db = drizzle({client});
