const {Users}=require('../../models/')
const md5 =require('crypto-js/md5');

class User{

    // Get all users list
    async getAll(filter){
    return new Promise((resolve,reject)=>{
      let limit= filter.limit || 50;
      let offset= filter.offset || 0;
        Users.findAll(
            {
              returning: true,
              limit:limit,
              offset:offset
            },
          ).then((employee) => {
            if (!employee) {
              throw new Error("User Not Found");
            }
            return employee
        
          }).then(async (result) => {
        
            resolve({ status: true, data: result })
          })
            .catch(err => { reject({ status: false, message: err.message }) });
          
    })
   
    }

    // Get Specific User
    async getUser(id,by){
        return new Promise((resolve,reject)=>{
        let options={email:id};
        if(by){
            options.password= md5(by.password).toString()
        }
      
        Users.findOne(
      {
        where: options
      },
        ).then((user) => {
        if (!user) {
            throw new Error("Invalid email");
        }
        return user
  
        }).then(async (result) => {
         resolve({ status: true, data: result })
        })
        .catch(err => { reject({ status: false, message: err.message }) });
        })
    }

    // Add User
    async addUser(data){
    return new Promise(async(resolve,reject)=>{

        let isEmailExist=await Users.emailExist(data.email);

        if(isEmailExist){
        return resolve({ status: false, message: "Email already exist for the user" });
        }
        data.password=md5(data.password).toString();
        
        let options = {
        returning: true
        };

         Users.create(data, options)
          .then(result => resolve({ status: true, data: result }))
          .catch(err => { reject(err) });

    });
}

  //  Delete User
  async delete(id){

    return new Promise((resolve,reject)=>{
    
      Users.destroy(
        {
          where: {id:id}
        },
      ).then((user) => {
      if (!user) {
          throw new Error("Unable to delete User");
      }
      return user

      }).then(async (result) => {
       resolve({ status: true, message: "User deleted successfully." })
      })
      .catch(err => { reject(err); });
      })
  }
}

module.exports=new User();