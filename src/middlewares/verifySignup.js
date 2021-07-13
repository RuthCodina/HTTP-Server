import user from '../models/Users';
import bcrypt from 'bcryptjs';
import {secret} from '../config';
import passport from "passport"
import webToken from 'jsonwebtoken';
// import {Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
// import {secret} from '../config';

export const checkEmailAndPassword= async (req, res, next)=>{
    const existingEmail = await user.findOne({email:{$in:req.body.email}});
    console.log(existingEmail);

    if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.email)){
        return res.status(400).json({message:'the input email is incorrect'});
    }
    if(existingEmail){
      return res.status(400).json({message:'the input email already exits'});
    }
    
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(req.body.password)){
      return res.status(400).json({message:'the password must has at least 10 caracters, one Uppercase Letter, one Lowercase letter and one @$!%*?&'});
    }
     
    
  else{
      next()
      return;
  }
}


export const checkLogin = async (req, res, next)=>{
   
  if(!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.email)){
    return res.status(400).json({message:'the input email is incorrect'});
  }
    const existingEmail = await user.findOne({email:{$in:req.body.email}});
    console.log('-->', existingEmail);
  
    if(!existingEmail){
      return res.status(400).json({message:'the email doesn´t exist'})
    }
    
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(req.body.password)){
      return res.status(400).json({message:'the password must has at least 10 caracters, one Uppercase Letter, one Lowercase letter and one @$!%*?&'});
    }
    
    const comparison = await bcrypt.compare(req.body.password, existingEmail.password );
    if(!comparison){
           return res.status(400).json({message:'invalid password'})
    }

  else{
      next()
      return;
  }
}

