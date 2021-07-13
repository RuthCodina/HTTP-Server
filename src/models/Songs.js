import { Schema, model} from "mongoose";

const songSchema = new Schema({
    name: String,
    genre:String,
    author: String,
    video: String,
    likes:Array, // un arreglo en el cual se van a agregar el username de los usuarios, y en el front se renderizaría la longitud del arreglo.
    createdBy:String, // para poder filtrar a la lista protegida de cada usario. 
},{
    timestamps:true,
    versionkey: false
})

export default model('song', songSchema);