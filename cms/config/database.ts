import { parse } from 'pg-connection-string';

export default ({ env }) => {
  const connectionString = env(
    'DATABASE_URL',
    'postgres://strapi:strapi@localhost:5432/strapi',
  );
  const { host, port, database, user, password } = parse(connectionString);

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
