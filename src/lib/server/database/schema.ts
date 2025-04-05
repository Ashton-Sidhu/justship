import { pgTable, text, integer, boolean, serial, timestamp } from 'drizzle-orm/pg-core';
	import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

if (process.env.DATABASE_URL?.startsWith("postgres://")) {

	export const userTable = pgTable('user', {
		id: text('id').notNull().primaryKey(),
		email: text('email').notNull(),
		email_verified: boolean('email_verified') 
	});

	export const sessionTable = pgTable('session', {
		id: text('id').notNull().primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => userTable.id),
		expiresAt: timestamp("expires_at", {
			withTimezone: true,
			mode: "date"
		}).notNull()
	});

	export const emailVerificationTokenTable = pgTable('email_verification_token', {
		id: text('id').notNull().primaryKey(),
		user_id: text('user_id').notNull(),
		email: text('email').notNull(),
		expires_at: timestamp('expires_at').notNull()
	});

	export const signinTable = pgTable('signin', {
		id: serial('id').primaryKey(),
		logged_in_at: timestamp('logged_in_at').notNull(),
		ip_address: text('ip_address').notNull(),
		email: text('email').notNull()
	});
} else {

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	email: text('email').notNull(),
	email_verified: integer('email_verified', { mode: 'boolean' })
});

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull()
});

export const emailVerificationTokenTable = sqliteTable('email_verification_token', {
	id: text('id').notNull().primaryKey(),
	user_id: text('user_id').notNull(),
	email: text('email').notNull(),
	expires_at: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const signinTable = sqliteTable('signin', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	logged_in_at: integer('logged_in_at', { mode: 'timestamp' }).notNull(),
	ip_address: text('ip_address').notNull(),
	email: text('email').notNull()
});
	
}


