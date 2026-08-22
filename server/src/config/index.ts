// Export server configuration tokens
export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fakenewsdetection',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
