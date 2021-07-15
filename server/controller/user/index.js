const user =require('../../service/user');

// Get info of single user
const get=(req,res)=>{
    res.status(200).send(user.getOne(req.params.id))
}

// Get
const add=(req,res)=>{
    user.addUser(req.body).then((result)=>{
        res.status(200).send(result);
    }).catch(err=>{res.status(500).send(err);})
}

const deleteUser=(req,res)=>{
    user.delete(req.params.id).then((result)=>{
        res.status(200).send(result);
    }).catch(err=>{res.status(500).send(err);})
}
const getAll=(req,res)=>{
    user.getAll(req.query).then((data)=>{
        res.status(200).send(data)
    }).catch(err=>{
        console.log(err)
        res.status(400).send({status:false,message:err})
    })
}





module.exports={get,add,deleteUser,getAll}