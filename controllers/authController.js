const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");
const User = require("../models/user");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL });

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    };

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    };

    const payload = {
        id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        },
    });
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    
    res.status(204).json({
        message: "No Content",
    });
};

const changeSubscription = async (req, res) => {
    const { _id } = req.user;
    const { email, subscription } = await User.findByIdAndUpdate(_id, req.body, { new: true });
    
    res.json({
        user: {
            email,
            subscription,
        },
    });
};

const updateAvatar = async (req, res) => {
    const { path: oldPath, filename } = req.file
    const { _id } = req.user;
    const newPath = `${avatarsPath}/${filename}`; 
    
    const image = await jimp.read(oldPath);
    await image.resize(250, 250).writeAsync(oldPath);
      
    await fs.rename(oldPath, newPath);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    });
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    changeSubscription: ctrlWrapper(changeSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};