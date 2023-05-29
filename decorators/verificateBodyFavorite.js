const {HttpError} = require("../helpers");

const verificateBodyFavorite = () => {
    const func = (req, _, next) => {
        if (!Object.keys(req.body).length) {
            next(HttpError(400, "missing field favorite"));
        }
        next();
    }

    return func;
};

module.exports = verificateBodyFavorite;