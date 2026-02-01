import { auth } from "@/firebase/config"
import { ref } from "vue"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from "firebase/auth"

export let usuario = ref(null)
onAuthStateChanged(auth, user => {
  usuario.value = user
})

export let registrar = async (email, password) => {
  try {
    let cred = await createUserWithEmailAndPassword(auth, email, password)
    return { ok: true, usuario: cred }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}

export let login = async (email, password) => {
  try {
    let cred = await signInWithEmailAndPassword(auth, email, password)
    return { ok: true, usuario: cred }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}
export let logOut = async () => {
  await signOut(auth)
}

export let estaAutenticado = ()=>{
    //para proteger la ruta, el requisito para acceder a la ruta protegida es estar autentificar
    return usuario.value !== null   
}
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

// //funcion para obtener usuario, si usuario existe
// export let obtenerUsuario = () =>{
//     return usuario.value
// }

// // HASTA AQUI LA BASE PARA CUALQUIER PROYECTO