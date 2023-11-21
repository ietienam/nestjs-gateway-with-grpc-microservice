export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  name: process.env.APP_NAME || 'app',
  workingDirectory: process.env.PWD || process.cwd(),
  port: process.env.API_GATEWAY_PORT
    ? parseInt(process.env.API_GATEWAY_PORT, 10)
    : process.env.PORT
    ? parseInt(process.env.PORT, 10)
    : 3000,
  apiPrefix: process.env.API_PREFIX || 'api',
  fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
  headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  userServicePort: parseInt(process.env.USER_SERVICE_PORT, 10),
  userServiceHost: process.env.USER_SERVICE_HOST,
  notificationServicePort: parseInt(process.env.NOTIFICATION_SERVICE_PORT, 10),
  apigatewayUrl: process.env.API_GATEWAY_URL,
  rabbitmqUrl: process.env.RABBITMQ_URL,
  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
};
