import express from 'express';
import contactController from '../../controllers/client/contact.controller.js';
import contactValidate from '../../validators/client/contact.validate.js';
const contactRoute = express.Router();

contactRoute.get('/', contactController.contact);
contactRoute.post('/', contactValidate.contactPostValidate, contactController.contactPost);

export default contactRoute;
