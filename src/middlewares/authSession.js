import passport from "passport"
import user from '../models/Users';
import bcrypt from 'bcryptjs';
import { secret } from "../config";
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;

passport.use(  // este código no se uso, pero se deja por si se llegara a necesitar.
  new StrategyJwt({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.secret,
  },
  (jtwPayload, done)=> {
     return user.findOne({email: jtwPayload.email})
      .then((user)=>{
         return  done(null, user)
      })
      . catch((err)=>{ 
        console.log(err)
        return done(err)}) 
  }   
));






