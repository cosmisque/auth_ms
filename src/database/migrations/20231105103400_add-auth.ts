import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('auth_tokens', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().unique();
    table.string('access_token').notNullable();
    table.string('refresh_token').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('auth_tokens');
}
