
import song from '../models/Songs';


export const getSongs = async (req, res)=>{
    const userSongs = await song.find()
    res.status(200).json(userSongs);
}

export const getSongById = async (req, res)=>{
    const publicSongId= await song.findById(req.params.id)
    res.status(200).send(publicSongId)
}

export const updateLike =async (req, res)=>{
    const publicSongId= await song.findById(req.params.id)
 
    const updateSongId = await song.updateOne(publicSongId, {$addToSet: 
                                                                   {likes:
                                                                    {$each: [req.body.likes[0]]}}}, {new:true})
       
    res.status(200).json(updateSongId)

}
