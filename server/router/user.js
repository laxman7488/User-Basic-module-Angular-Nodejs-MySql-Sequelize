const express=require('express');
const routes= express.Router();
const user=require('../controller/user');
const auth=require('../controller/login/auth')

routes.route('/user').get(auth,user.getAll);
routes.route('/user').post(auth,user.add);
routes.route('/user/:id').delete(auth,user.deleteUser);

module.exports=routes;