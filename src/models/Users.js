import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username:{
        type: String,
        require: true,
        unique:true,
    },
    email:{
        type:String,
        unique: true,
        trim:true
    },
    password:{
        type: String,
        required: true,
    },
    roles:[{
        ref:'role',
        type: Schema.Types.ObjectId // con esto relaciono el schema user con el schema rol, a través de su id.
    }]
},{
    timestamps:true,
    versionkey: false
})

// para cifrar contraseña
userSchema.statics.encryptPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10) // manera de aplicar el algoritmo, y con el 10 le indico cuantas veces va a aplicar el algoritmo.
    const hash= await bcrypt.hash(password, salt)
    return hash;
}

userSchema.methods.checkPassword = async(password, passwordReceived) =>{ // statics, forma de llamar un método, sin necesidad de  instanciar un objeto.
    const comparison = await bcrypt.compare(password, passwordReceived) // returna un booleano dependiendo de si las contraseñas coinciden o no.
    return comparison;
}



export default model('user', userSchema)