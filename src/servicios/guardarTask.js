import {db} from "@/firebase/config"                        //ESTE ARCHIVO TMB LO PUEDO UTILIZAR EN EX
import {      //importar funciones de f
    doc,      //doc hace referencia al documento(registro)
    setDoc,   //AÑADIR a bd ==> establecer valores dentro de un doc 
    getDoc,   //recoge   OBTENER de bd
    updateDoc //actualizar
} from "firebase/firestore"
import { usuario } from "./autenticacion"
// crear/actualizar perfil de un usuario, crear entra cuando us no este 
export let guardarPerfilUsuario = async (usuarioId, datosPerfil)=>{ //datosPerfil es un objeto
    try { //docRef crear refrencia a un doc dnd guardo datos 
        let docRef = doc(db, "usuarios", usuarioId) //db es conexion, nom de mi tabla, id de usuario
        //añade a tabla usuarios; para un usuario autentificado le creare un id, un id q ya tengo bd pero lo eliminare
        // let perfilCompleto = {
        //     ...datosPerfil //copia de datosPerfil y puedo modificar y
        // }
        await setDoc(docRef, datosPerfil)
        return {ok:true}
        
    } catch (error) {
        return {ok:false, error: error.message}
    }
}
// obtener perfil de usuario
export let obtenerPerfilUsuario = async(usuarioId)=>{
    try{ 
        let docRef = doc(db, "usuarios", usuarioId) //bd conexion, usuarios la tabla
        let docSnap = await getDoc(docRef) //capturar

        if(docSnap.exists()){
            return{
                ok: true,
                perfil: {id: docSnap.id, ...docSnap.data()}
            }
            
        }
    }
    catch(error){
        console.log("ha habido un error")
        return{
            ok:false,
            error: error.message
        }
    }
    
}