const express=require('express');
const routes= express.Router();
const user=require('../controller/user')

routes.route('/user').get(user.getAll);
routes.route('/user').post(user.add);
routes.route('/user/:id').delete(user.deleteUser);

module.exports=routes;