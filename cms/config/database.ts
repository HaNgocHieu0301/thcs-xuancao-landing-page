import { parse } from 'pg-connection-string';

export default ({ env }) => {
  const { host, port, database, user, password } = parse(
    env('DATABASE_URL', 'postgres://strapi:strapi@localhost:5432/strapi'),
  );

  return {
    connection: {
      client: 'postgres',
      connection: {
        host,
        port,
        database,
        user,
        password,
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      debug: false,
    },
  };
};
