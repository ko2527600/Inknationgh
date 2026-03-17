import express from 'express';
import { getCMSPage, updateCMSPage } from '../controllers/cmsController.js';

const router = express.Router();

router.route('/:pageName')
  .get(getCMSPage)
  .put(updateCMSPage);

export default router;
