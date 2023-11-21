import Joi from 'joi';
import 'dotenv/config';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    USER_SERVICE_PORT: Joi.number().default(50051),
    USER_SERVICE_DATABASE: Joi.string().required().description('Mongo DB url'),
    RABBITMQ_URL: Joi.string().required().description('RabbitMQ url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.USER_SERVICE_PORT,
  jwtSecret: envVars.JWT_SECERET,
  rabbitmq: {
    url: envVars.RABBITMQ_URL,
  },
  mongoose: {
    url: envVars.USER_SERVICE_DATABASE,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
export default config;
