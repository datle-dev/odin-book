import express from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import User from '../models/user';
import { genPassword } from '../auth/password-utils';

const router = express.Router();

router.post('/', [
  body('username').exists(),
  body('password').exists(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const saltHash = await genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: req.body.username,
      hash: hash,
      salt: salt,
    });

    console.log(`newUser: ${newUser}`);
    if (!errors.isEmpty()) {
      res.json({
        title: 'signup error',
        errors: errors.array(),
      });
      return;
    } else {
      await newUser.save().then((user) => console.log(user));

      res.redirect('/');
    }
  }),
]);

export default router;
