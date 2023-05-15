// const db = require('../models');
// const ROLES = db.ROLES;
// const User = db.user;

import { ROLES } from "../configs/roleLists.js";
import User from "../models/userModel.js";

const checkCandidate = async (req, res, next) => {
    try {
        const candidateUsername = await User.findOne({ username: req.body.username })
        if (candidateUsername) {
            return res.status(400).json({ message: 'Failed! Username is already in use!' })
        }
        const candidateEmail = await User.findOne({ email: req.body.email })
        if (candidateEmail) {
            return res.status(400).json({ message: 'Failed! Email is already in use!' })
        }
        next()
    } catch (error) {
        res.status(500).send({ message: err });
        return;
    }
};

const checkRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`,
                });
                return;
            }
        }
    }
    next();
};

export {
    checkCandidate,
    checkRoles
}

