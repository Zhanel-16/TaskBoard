import { auth } from "@/firebase/config"; //import de un archivo q he creado yo
import { ref } from "vue";
import { // importar funciones q vienen de firebase
    createUserWithEmailAndPassword,
    onAuthStateChanged,         //si estoy logueada o no True/False
    signInWithEmailAndPassword, //iniciar sesion
    signOut,                    //cerrar sesion
    sendEmailVerification       //para verificar q si correo es real
 } from "firebase/auth"         //createUserWithEmailAndPassword viene de firebase/auth

export let usuario = ref(null) //por defecto no tengo nada    VAR GLOBAL DEL USUARIO

//LISTENERS ==> escuchar los cambios de autenticacion ==> logueado o no, 1r parametro siempre auth
onAuthStateChanged(auth, (userFirebase)=>{
    usuario.value = userFirebase 
    console.log("auth: usuario detectado ", userFirebase?.email || "Ninguno")
    // si userFirebase tiene algo q me muestre su email   
})
//registrar usuario
export let registrar = async(email, password) =>{
    try{
        let credencialesUsuario = await createUserWithEmailAndPassword(auth, email, password)
        //espera await a lo q va a hacer esta funcion    auth PARA CONECTARSE
        console.log("usuario creado correctamente ✅", email)

        return { //devolver objeto
            ok: true,
            mensaje: "usuario creado correctamente ✅",
            usuario: credencialesUsuario
        }
    }
    catch(error){
        console.log("Error, ha habido un problema ❌", error)
        return { //devolver objeto
            ok: false,
            error: "Error, ha habido un problema ❌"
        }
    }
}
export let login = async(email, password)=>{
    //similar al register
    try{
        let credencialesUsuario = await signInWithEmailAndPassword(auth, email, password)
        //espera await a lo q va a hacer esta funcion    auth PARA CONECTARSE
        console.log("Sesion iniciada ✅", email)

        return { //devolver objeto
            ok: true,
            mensaje: "Sesion iniciada ✅",
            usuario: credencialesUsuario
        }
    }catch(error){
        console.log("Error, ha habido un problema ❌", error)
        return { //devolver objeto
            ok: false,
            error: "Error, ha habido un problema ❌"
        }
    }
}

// HACER logOut ==> cierra sesion y no necesita parametros
export let logOut = async()=>{
    try{
        await signOut(auth)
        console.log("sesion cerrada ✅")
        return{ok: true}
    }catch(error){
        console.log("error ")
        return{ok:false, error: error.message}
    }
}
// usuarioActual parametro
export let enviarEmailVerificacion = async(usuarioActual=null)=>{ //sendEmailVerification
    try {
        let usuario = usuarioActual || auth.currentUser //auth ya tendra us registrado si o si
        if(usuario.emailVerified){
            console.log("✅email verificado")
            return{
                ok: true,
                message: "email verificado",
            }
        }
        await sendEmailVerification(usuario, {url: window.location.origin + "/perfil"})
        // recibe 2 param : usuario y la ruta
        //{url: window.location.origin + "/login"}  redirige a perfil(mi dashboard), origin q pille mi ruta raiz + q me mande a perfil
        return{
            ok: true,
            message: "email de verificacion enviado",
            }
    } catch (error) {
        console.log("❌ ha habido un problema al enviar el correo de verificacaion")
    }
}

export let estaAutenticado = ()=>{
    //para proteger la ruta, el requisito para acceder a la ruta protegida es estar autentificar
    return usuario.value !== null   
}

//funcion para obtener usuario, si usuario existe
export let obtenerUsuario = () =>{
    return usuario.value
}

// HASTA AQUI LA BASE PARA CUALQUIER PROYECTO
