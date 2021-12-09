export default () => ({
  production: process.env.PRODUCTION,
  authentication: {
    secret: process.env.JWT_SECRET,
    jwt_expiration_time: parseInt(process.env.JWT_EXPIRATION_TIME, 10) || 3600,
  },
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  elastic: {
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});
