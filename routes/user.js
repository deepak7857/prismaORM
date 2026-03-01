const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController=require('../controler/userControler')

router.post('/register',
    userController.registerUser)
router.get("/users",userController.getAllUsers);
router.put("/user/:id",[
    body('password').optional().isLength({min:6}).withMessage("password should be at least 6 characters long")
],userController.updateUser);
router.delete("/user/:id",userController.deleteUser);

module.exports=router;