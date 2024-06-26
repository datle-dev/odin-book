import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login/failure',
    successRedirect: '/login/success',
  }),
);

router.get(
  '/success',
  asyncHandler(async (req, res, next) => {
    res.json({
      title: 'login success',
    });
  }),
);

router.get(
  '/failure',
  asyncHandler(async (req, res, next) => {
    res.json({
      title: 'login failure',
    });
  }),
);

export default router;
