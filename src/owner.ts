import express from "express";
const owner = express.Router();
import makeUploader from "./libs/utilis/uploader";
import ownerController from "./controllers/owner.controller";

/* Owner Roters */

owner.get('/', ownerController.home);
owner.get('/signup', ownerController.getSignup);
owner.post('/signup', makeUploader('members').single('memberImage'), ownerController.ownerSingup);
owner.get('/login', ownerController.getLogin);
owner.post('/login', ownerController.ownerLogin);
owner.get('/logout', ownerController.logout);
owner.get('/check-me', ownerController.checkAuthSession);

/* User Routers */

owner.get('/user/all', ownerController.verifyOwner, ownerController.getUsers);
owner.post('/update-user', ownerController.verifyOwner, ownerController.updateOwner);

export default owner;
