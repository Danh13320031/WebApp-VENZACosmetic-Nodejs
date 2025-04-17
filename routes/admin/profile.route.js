import express from 'express';
import profileController from '../../controllers/admin/profile.controller.js';

const profileRoute = express.Router();

profileRoute.get('/', profileController.profile);

export default profileRoute;
