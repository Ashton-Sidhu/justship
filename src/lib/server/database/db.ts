import { drizzle } from 'drizzle-orm/libsql';
import { dev } from '$app/environment';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from '$lib/server/database/schema'

const url = dev ? 'postgresql://postgres:postgres@127.0.0.1:54322/postgres' : env.POSTGRES_URL;

if (!url) {
	throw new Error('POSTGRES_URL is not set');
}

const libsql = createClient({ url, authToken: env.POSTGRES_URL});
export const db = drizzle(libsql, { schema });
