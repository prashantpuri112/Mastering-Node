const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router(); // create a new router

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUsers)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);


module.exports = router; // export the router