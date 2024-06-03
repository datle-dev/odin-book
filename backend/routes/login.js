import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('local', {
    failureRedirect: '/login/failure',
    successRedirect: '/login/success',
  }),
);

export default router;
