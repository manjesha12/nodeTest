const Joi = require('joi');
module.exports.agencyCreateSchema = async (req, res, next) => {
    const schema = Joi.object({
        AgencyId: Joi.number().label("AgencyId is required").required(),
        Name: Joi.string().label("Name is required").required(),
        Address1: Joi.string().label("Address1 is required").required(),
        Address2: Joi.string().label("Address2 is required"),
        State: Joi.string().label("State is required").required(),
        City: Joi.string().label("City is required").required(),
        Phone_Number: Joi.number().label("Phone_Number is required").required(),
        ClientId: Joi.number().label("ClientId is required").required(),
        ClientName: Joi.string().label("ClientId is required").required(),
        Email: Joi.string().label("Email is required").required(),
        PhoneNumber: Joi.number().label("PhoneNumber is required").required(),
        TotalBill: Joi.number().label("TotalBill is required").required(),
    });
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        let errors = {};
        error.details.forEach(err => {
            errors[err.context.key] = err.context.label
        });
        res.json(errors);
    } else {
        req.body = value;
        next();
    }
}

module.exports.agencyUpdate = async (req, res, next) => {
    const schema = Joi.object({
        ClientName: Joi.string().label("ClientId is required"),
        Email: Joi.string().label("Email is required"),
        PhoneNumber: Joi.number().label("PhoneNumber is required"),
        TotalBill: Joi.number().label("TotalBill is required"),
    });
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        let errors = {};
        error.details.forEach(err => {
            errors[err.context.key] = err.context.label
        });
        res.json(errors);
    } else {
        req.body = value;
        next();
    }
}