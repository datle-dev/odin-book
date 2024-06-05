import express from 'express';
import asyncHandler from 'express-async-handler';
import { isAuth } from '../auth/auth-utils.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.json({
      title: 'index',
    });
  }),
);

router.get(
  '/test',
  isAuth,
  asyncHandler(async (req, res, next) => {
    res.json({
      title: 'test successful',
    });
  }),
);

router.post(
  '/logout',
  asyncHandler(async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  }),
);

export default router;
