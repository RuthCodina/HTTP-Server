import song from '../models/Songs';
import user from '../models/Users';
import { verifyToken } from '../middlewares/authWebToken';


export const createUserSongs = async (req, res)=>{
    console.log(req.body)
    const {name, genre, author, video, likes, createdBy}=req.body
    const newSong = new song({name, genre, author, video, likes, createdBy});

    const userSongSaved = await newSong.save()

    res.status(201).json(userSongSaved)
}


export const getUserSongs = async(req, res)=>{
   const userById = await user.findById(req.userId) 
    const userSongs = await song.find({createdBy:{$in:userById.username}})
    res.status(200).json(userSongs);
}

export const getUserSongById = async(req, res)=>{
  const userSongId= await song.findById(req.params.id)
  res.status(200).send(userSongId)
}

export const updateUserSongById= async (req, res)=>{
 const updUserSongId = await song.findByIdAndUpdate(req.params.id, req.body,{ // mongo me devuelve los datos viejos, entonces agrego esta condición para que me traiga los datos nuevos.
     new:true
 })
 res.status(200).json(updUserSongId)// si le paso 204, no me muestra en inmomnia el objeto actualizado. con 200, si
}

export const deleteUserSongById= async(req, res)=>{
   const deleteSongId= await song.findByIdAndDelete(req.params.id)
   res.status(204).json({message: 'erased'})//no es necesario que le coloqué algo en el json,pero se lo podemos enviar.
}

export const getLikedUserSongs = async(req, res)=>{ 
    const {username}= req.params
  const likelist = await song.find({likes:username}) 
  res.status(200).json(likelist);
}