import Joi from 'joi';

class Check {
  static create(req, res, next) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/).required(),
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      return next();
    }
    return res.status(400).json({
      status: 400,
      message: result.error.details[0].message.replace(/[^a-zA-Z0-9 ]/g, ''),
    });
  }
}
export default Check;
