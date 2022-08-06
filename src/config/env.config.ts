export const envConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongoDb: process.env.MONGO_URL,
  port: process.env.PORT || 3001,
});
