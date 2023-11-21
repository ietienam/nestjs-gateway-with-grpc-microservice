/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import * as configValues from './config.values';

export default registerAs<AppConfig>('app', () => (configValues.default));
