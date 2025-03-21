const userModel = require('../models/userShema')
const bcrypt = require('bcrypt')
const { query } = require('express')
const jwt = require('jsonwebtoken')

const maxTime = 24 *60 * 60 //24H
//const maxTime = 1 * 60 //1min
const createToken = (id) => {
    return jwt.sign({id},'net secret pfe', {expiresIn: maxTime })
}



module.exports.getAllUsers= async (req,res) => {
    try {
        const usersListe = await userModel.find()
        res.status(200).json({usersListe});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.getUserByID = async (req, res) => {
    try {
      const {id} = req.params;
      const users = await userModel.findById(id);
      if (users.length === 0 && !users) {
          throw new Error ("No users found");
      }
      res.status(200).json({users});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
module.exports.addUserAdmin= async (req,res) => {
    try {
        console.log(req.body);
        const { firstName,lastName, email , password } = req.body;
        const role = 'admin'
        const user = new userModel({firstName,lastName , email , password , role})
        const useradded = await user.save()
        
        res.status(200).json({message:"user addes sccessfully",data:useradded});

    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
}

module.exports.addUserTechnicienRadio= async (req,res) => {
    try {
        console.log(req.body);
        const {firstName,lastName, email , password  } = req.body;
        const role = 'technicien radio'
        const user = new userModel({firstName,lastName , email , password , role})
        const useradded = await user.save()
        res.status(200).json({useradded}); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserAgentComptable= async (req,res) => {
    try {
        console.log(req.body);
        const {firstName,lastName, email , password } = req.body;
        const role= 'agent comptable'
        const user = new userModel({firstName,lastName , email , password , role})
        const useradded = await user.save()
        res.status(200).json({useradded});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.addUserFournisseurLsTélècom= async (req,res) => {
    try {
        console.log(req.body);
        const {firstName,lastName, email , password} = req.body;
        const role = 'fournisseur Ls télècom'
        const user = new userModel({firstName,lastName , email , password , role})
        const useradded = await user.save()
        res.status(200).json({useradded});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.updateuser = async (req, res) => {
    try {
        const {id} = req.params
        const {firstName,lastName, email } = req.body

        const checkIFUserExists = await userModel.findById(id); //false => undefined
      if (!checkIFUserExists)
        {
            throw new Error ("User not found !")
        }
        
        await userModel.findByIdAndUpdate(id,{$set : {firstName,lastName, email }}) 
        const updated = await userModel.findById(id)
    
        res.status(200).json({updated})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
    }

    module.exports.searchUsersByName = async (req, res) => { //?minAge=18&maxAge=80
        try {
      
            //const name = req.query.name
            console.log(req,query.firstName)
            const {firstName} = req.query
      
      
          const usersListe= await userModel.find({firstName : {$regex :firstName, $options : "i" }});
          if (usersListe.length === 0 && !usersListe) {
              throw new Error ("No users found");
          }
          res.status(200).json({usersListe});
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      };

module.exports.deleteUser = async (req, res) => {
    try{
      const {id} = req.params;
      const checkIFUserExists = await userModel.findById(id); //false => undefined
      if (!checkIFUserExists)
        {
            throw new Error ("User not found !")
        }
      await userModel.findByIdAndDelete(id);
      res.status(200).json("deleted");
    }catch (err) {
      res.status(500).json({message: err.message});
    };
   }

module.exports.login= async (req,res) => {
    try {
        const { email , password } = req.body;
        const user = await userModel.login(email, password)
        const token = createToken(user._id)
        res.cookie("jwt_token_PFE", token, {httpOnly:false,maxAge:maxTime * 1000})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
module.exports.logout= async (req,res) => {
    try {
  
        res.cookie("jwt_token_PFE", "", {httpOnly:false,maxAge:1})
        res.status(200).json("logged")
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




