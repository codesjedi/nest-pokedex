import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
  MONGO_URL: Joi.required(),
  PORT: Joi.number().default(3000),
});
