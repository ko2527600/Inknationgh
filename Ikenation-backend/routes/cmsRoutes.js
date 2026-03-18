import express from 'express';
import { getCMSPage, updateCMSPage } from '../controllers/cmsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();


router.route('/:pageName')
  .get(getCMSPage)
  .put(protect, admin, updateCMSPage);


export default router;
