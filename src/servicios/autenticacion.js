import { auth } from "@/firebase/config"
import { ref } from "vue"
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendEmailVerification,
  updateProfile
} from "firebase/auth"
export let usuario = ref(null)

onAuthStateChanged(auth, user => {
  usuario.value = user
})

export let registrar = async (email, password) => {
  try {
    let cred = await createUserWithEmailAndPassword(auth, email, password)
    
    await sendEmailVerification(cred.user)
    
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
  return usuario.value !== null
}
export let emailEstaVerificado = () => {
  return usuario.value && usuario.value.emailVerified
}

export let enviarEmailVerificacion = async()=>{
  try {
    let usuario = auth.currentUser
    if(!usuario){
      console.log("❌ No hay usuario")
      return{ ok: false, message: "No hay usuario" }
    }
    
    if(usuario.emailVerified){
      return{ ok: true, message: "email ya verificado" }
    }
    await sendEmailVerification(usuario)
    return{ ok: true, message: "email enviado" }
  } catch (error) {
    console.log("❌ error enviar email:", error)
    return{ ok: false, message: error.message }
  }
}
// //funcion para obtener usuario, si usuario existe
// export let obtenerUsuario = () =>{
//     return usuario.value
// }

// // HASTA AQUI LA BASE PARA CUALQUIER PROYECTO