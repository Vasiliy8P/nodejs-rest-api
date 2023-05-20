const {HttpError} = require("../helpers");

const validateBody = schema => {
    const funk = (req, _, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, `missing required ${error.details[0].context.key} field`));
        }
        next();
    };

    return funk;
};

module.exports = validateBody;