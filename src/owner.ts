import express from "express";
const owner = express.Router();
import makeUploader from "./libs/utilis/uploader";
import ownerController from "./controllers/owner.controller";


owner.get('/', ownerController.home);
owner.get('/signup', ownerController.getSignup);
owner.post('/signup', makeUploader('members').single('memberImage'), ownerController.signup);
owner.get('/login', ownerController.getLogin);
owner.post('/login', ownerController.login);
owner.get('/logout', ownerController.logout);
owner.get('/check-me', ownerController.checkAuthSession);

export default owner;
