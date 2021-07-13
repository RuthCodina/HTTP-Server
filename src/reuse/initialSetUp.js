import role from '../models/Roles';

export const createRoles = async () =>{
    const count = await role.estimatedDocumentCount() // el método sirve para contar si hay documentos
   try{ 
       if(count>0 ) return; // si ya existen roles creados, cuando re reinicie la base de datos, no va a volver a crearlos.

    const nameRoles = await Promise.all([
                    new role({name: 'user'}).save(),
                    new role({name: 'admin'}).save(),
                   ])
    console.log(nameRoles)
  } catch(error){
      console.log(error);
 }
};