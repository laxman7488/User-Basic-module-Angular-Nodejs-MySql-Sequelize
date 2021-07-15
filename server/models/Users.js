module.exports = (sequelize, DataTypes) => {

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
     },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('Admin', 'User'),
        allowNull: false,
        defaultValue:'User'
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  
  
    Users.emailExist = async (email) => {
    return  new Promise((resolve,reject)=>{
        Users.findOne({
        where: {
          email: email
        }
      
      }).then(response => {
        resolve(response?true:false);
      
      }).catch(err=>{reject(err);});
  
        })
    }
  

    return Users;
  };
  