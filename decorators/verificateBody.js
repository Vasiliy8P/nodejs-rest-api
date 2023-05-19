const {HttpError} = require("../helpers");

const verificateBody = () => {
    const func = (req, _, next) => {
        if (!Object.keys(req.body).length) {
            next(HttpError(400, "missing fields"));
        }
        next();
    }

    return func;
};

module.exports = verificateBody;