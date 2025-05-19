import express from 'express';
import {shorteningUrl,redirectUrl} from '../controllers/urlsController.js';
import IsValidURL from '../middlewares/isURLmiddleware.js';
import checkCachedUrls from '../middlewares/checkCacheMiddleware.js';
const urlRouter = express.Router();



urlRouter.post('',IsValidURL,shorteningUrl);

urlRouter.get('/:url',checkCachedUrls,redirectUrl);

export default urlRouter;
