import express from 'express';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    res.json({
      title: 'signup',
    });
  }),
);

export default router;
