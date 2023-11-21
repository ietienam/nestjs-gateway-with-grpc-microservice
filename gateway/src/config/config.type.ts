export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  port: number;
  apiPrefix: string;
  fallbackLanguage: string;
  headerLanguage: string;
  userServicePort: number;
  userServiceHost: string;
  notificationServicePort: number;
  apigatewayUrl: string;
  rabbitmqUrl: string;
  mailHost: string;
  smtpUsername: string;
  smtpPassword: string;
  restaurantSerVicePort: number;
  restaurantServiceHost: string;
};

export type AllConfigType = {
  app: AppConfig;
};
