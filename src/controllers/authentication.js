import user from '../models/Users';
import tokenWeb from 'jsonwebtoken';
import {secret}from '../config';
import role from '../models/Roles';


export const singUp = async(req, res)=>{
    const {username, email, password, roles} = req.body;
  
   
    const newUser= new user({
                       username,
                       email,
                       password: await user.encryptPassword(password),
                  })

    if(roles){
       const findRoles = await role.find({name:{$in:roles}})
       newUser.roles =findRoles.map(el => el._id)
    } else{
        const rol = await role.findOne({name: 'user'})
        newUser.roles = [rol._id];
    }

    const userCreated = await newUser.save(); // para guardar y el await para no esperar a que se desarrolle, y no usar promesas
    console.log(userCreated)

    const token = await tokenWeb.sign({id:userCreated._id},secret.secret,{ // esto es lo que el user debe enviar al back, para entrar a las rutas protegidas.
                            expiresIn: 1200 // estos son los segundos de 20 min.
                })

   return  res.status(200).json({token})
}


export const login = async(req, res)=>{
    const {email,password}= req.body
    const findUser = await user.findOne({email:email}).populate("roles")//recorre el objeto y muestra lo de adentro

    const match = await findUser.checkPassword(password, findUser.password)
    
    if(!match) return res.status(401).json({token:null, message: 'invalid password'})

    if(!findUser){
        return res.status(400).json('User does not exist');
    }
    const token = await tokenWeb.sign({id:findUser._id},secret.secret,{ // esto es lo que el user debe enviar al back, para entrar a las rutas protegidas.
                    expiresIn: 1200 // estos son los segundos de 20 min.
                 })

    res.status(200).json({token});
    console.log(findUser)
}



