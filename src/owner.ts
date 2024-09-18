import express from "express";
const owner = express.Router();
import makeUploader from "./libs/utilis/uploader";
import ownerController from "./controllers/owner.controller";
import watchController from "./controllers/watch.controller";
import jewelryController from "./controllers/jewelry.controller";

/* Owner Roters */

owner.get('/', ownerController.home);
owner.get('/signup', ownerController.getSignup);
owner.post(
    '/signup',
    makeUploader('members').single('memberImage'),
    ownerController.ownerSingup);
owner.get('/login', ownerController.getLogin);
owner.post('/login', ownerController.ownerLogin);
owner.get('/logout', ownerController.logout);
owner.get('/check-me', ownerController.checkAuthSession);

/* User Routers */

owner.get('/user/all', ownerController.verifyOwner, ownerController.getUsers);
owner.post('/update-user', ownerController.verifyOwner, ownerController.updateOwner);

/* Watch Routers */

owner.get('/watch-all', ownerController.verifyOwner, watchController.getAllWatch);
owner.post(
    '/watch/create',
    ownerController.verifyOwner,
    makeUploader('watches').array('watchImages', 10),
    watchController.createWatch,
);
owner.post('/watch/update-watch/:id', ownerController.verifyOwner, watchController.updateWatch);
owner.post('/watch/remove-watch/:id', ownerController.verifyOwner, watchController.removeWatch);

/* Jewelry Routers */

owner.get('/jewelry-all', ownerController.verifyOwner, jewelryController.getAllJewelry);
owner.post(
    '/jewelry/create',
    ownerController.verifyOwner,
    makeUploader('jewelries').array('jewelryImages', 10),
    jewelryController.createJewelry,
);
owner.post('/watch/update-jewelry/:id', ownerController.verifyOwner, jewelryController.updateJewelry);
owner.post('/watch/remove-jewelry/:id', ownerController.verifyOwner, jewelryController.removeJewelry);


export default owner;
