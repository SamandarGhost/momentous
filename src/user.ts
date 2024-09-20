import express from "express";
const user = express.Router();
import makeUploader from "./libs/utilis/uploader";
import userController from "./controllers/user.controller";
import jewelryController from "./controllers/jewelry.controller";
import watchController from "./controllers/watch.controller";

/* User routers */
user.get('/user/owner', userController.getOwner);
user.post('/user/signup', makeUploader('members').single('memberImage'), userController.signup);
user.post('/user/login', userController.login);
user.post('/user/logout', userController.verifyAuth, userController.logout);
user.get('/user/detail', userController.verifyAuth, userController.getUserDetail);
user.post('/user/update', userController.verifyAuth, makeUploader('members').single('memberImage'), userController.updateUser);
user.get('/user/top-users', userController.getTopUsers);

/* watch router */
user.post('/watch/like/:id', userController.verifyAuth, watchController.likeWatch);
user.post('/watch/save/:id', userController.verifyAuth, watchController.saveWatch);

/* jewelry router */
user.post('/jewelry/like/:id', userController.verifyAuth, jewelryController.likeJewelry);
user.post('/jewelry/save/:id', userController.verifyAuth, jewelryController.saveJewelry);


export default user;
