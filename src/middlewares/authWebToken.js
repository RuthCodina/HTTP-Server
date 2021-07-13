import webToken from 'jsonwebtoken';
import {secret} from '../config';
import user from '../models/Users';
import song from '../models/Songs';


//función que verifique  si estoy enviando un token
export const verifyToken = async (req, res, next) =>{
    
  try{ 
   const token = req.headers["access-token"]; // busca la propiedad access-token del objeto headers.

   if(!token) return res.status(403).json({message: 'you are not logged'})

   const decoded =  webToken.verify(token, secret.secret) // me va a dar la información de adentro del token.
   req.userId =decoded.id // áca agrego al req, la propuedad userId, que luego podré usar en isOwner

   const findUser = await user.findById(req.userId, {password:0}) // áca me extraigo el Id de la información del token y coloco password en 0, para no verla ni usarla. 
   if(!findUser) return res.status(404).json({message:'user does not exits'})

   next()
} catch(error){
     console.log(error)
    return res.status(404).json({message:'unathorized'})
  }
}

export const isOwner = async (req, res, next)=>{
  const userById = await user.findById(req.userId)
  const {id,username} = req.params
  const songById = await song.findById(id)
  const likes = await song.find({likes:username})
  console.log('->', likes)
  
  if(id){
    if(userById.username === songById.createdBy){
      next()
      return;
    }
  }
   else{
    if(username){
       if(username === userById.username){ //revisar esta condición
        next()
        return;
       }  
     }
  } 
    
  
  return res.status(403).json({message:'require to be the Owner'});
}