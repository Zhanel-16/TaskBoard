<template>
    <section>
        <div class="todo">
            <h1>Iniciar Sesion</h1>
            <form @submit.prevent="iniciarSesion">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" placeholder="ejemplo@tuemail.com" id="email" v-model="email" required>
                </div>
                <div>
                    <label for="pass">Contraseña</label>
                    <input type="password" placeholder="Minimo 6 caracteres" id="pass" v-model="password" required >
                </div>
                <p v-if="error">{{ error }}</p> 
                <!-- solo se ven si hay "resultado" -->
                <p v-if="exito">{{ exito }}</p>
                <div class="btn">
                    <button type="submit">Iniciar Sesion</button>
                </div>
                <p class="text">No tienes cuenta? <router-link to="/register">Crear cuenta</router-link></p>
            </form>
        </div>
    </section>
</template>
<script setup>
import { useToast } from 'vue-toastification'
import { useRouter } from "vue-router";
let router = useRouter()
import { login, enviarEmailVerificacion } from "@/servicios/autenticacion";

import { ref } from "vue";
let toast=useToast()
let email = ref("")
let password = ref("")

let error = ref("")
let exito = ref("")
let cargando = ref(false)

let iniciarSesion = async()=>{
    error.value = "" //resetear si tuviera antes algun valor 
    exito.value = ""
    cargando.value = true
    let resultado = await login(email.value, password.value)

    let usuario = resultado.usuario.user //quiero saber datos del user asi podre poner
                                     // usuario.email, .usuario lo q sea
    console.log(usuario)
    let respuestaEmail = await enviarEmailVerificacion(usuario)
    

    if(!usuario.emailVerified){ // si el email no esta verificado
        toast.error("Verifica tu email ⚠️") // error
        return
    }else{ // si el email está verificado
        exito.value = "yes email verificado" 
        toast.success("Has iniciado sesión correctamente! ✔️")
    }
    cargando.value = false
    if(resultado.ok){                         //en resultado se guardara UN OBJETO (return de okey) 
        exito.value = `Yes!✅ ${email.value} sesion iniciada`
        router.push("/") //tareas
    }else{
        error.value = `❌ Error!`
    }
}
</script>

<style lang="sass">
*
    margin: 0
    padding: 0
    box-sizing: border-box

section
    font-family: "SN Pro", sans-serif;
    min-height: 100vh
    background: #f2f4f8
    display: flex
    align-items: center
    justify-content: center

.todo
    background: white
    padding: 2rem
    width: 100%
    max-width: 400px
    border-radius: 10px

    h1
        text-align: center
        color: #333

    form
        font-family: "SN Pro", sans-serif;
        display: flex
        flex-direction: column
        gap: 1rem
        div
            display: flex
            flex-direction: column
            label
                font-size: 1rem
                color: darkgray
                padding: 0.3rem

            input
                color: darkgray
                padding: 0.6rem
                border: 1.2px solid 
                border-radius: 5px
                font-size: 0.9rem
        .btn
            display: flex
            justify-content: center
            align-items: center
            button
                margin-top: 1rem
                padding: 0.7rem
                width: 9rem
                background: darkslateblue
                color: white
                border: none
                border-radius: 5px
                font-size: 1rem
                cursor: pointer
        .text
            display: flex
            justify-content: center
            align-items: center
        
</style>