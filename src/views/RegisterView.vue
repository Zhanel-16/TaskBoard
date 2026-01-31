<template>
    <section>
        <div class="todo">
            <h1>Register</h1>
            <form @submit.prevent="registrarUsuario">
                <div>
                    <label for="email">Email:</label>
                    <input type="email" placeholder="ejemplo@tuemail.com" id="email" v-model="email" required>
                </div>
                <div>
                    <label for="pass">Contraseña</label>
                    <input type="password" placeholder="Minimo 6 caracteres" id="pass" v-model="password" required >
                </div>
                <div>
                    <label for="pass">Confirmar Contraseña</label>
                    <input type="password" placeholder="Minimo 6 caracteres" id="pass" v-model="confirmarPass" required>
                </div>
                <div class="btn">
                    <button type="submit">Registrarse</button>
                </div>
                
            </form>
        </div>
    </section>
  
</template>
<script setup>
    import { useToast } from 'vue-toastification'
    import { ref, computed } from 'vue'; 
    import { registrar } from '@/servicios/autenticacion';
import router from '@/router';
import { RouterLink } from 'vue-router';
    let toast = useToast()
    let email = ref("")
    let password = ref("")
    let confirmarPass = ref("")
    let error = ref("")
    let exito = ref("")
    let cargando = ref(false) //se activa cuando estoy buscando informacion
    

    let coinciden = computed(()=>{
        return password.value === confirmarPass.value //verificar si son iguales
    })
    
    let registrarUsuario = async()=>{
        if(password.value.length <6 || confirmarPass.value.length < 6){
        toast.error("La contraseña debe de tener mas de 6 caracteres, vuelve a inte")
    }
        error.value = ""                              //resetear si tuviera antes algun valor
        exito.value = ""
        if(!coinciden.value){                         //validacion basica
            toast.error("Contraseñas no coinciden")
            error.value = "Contraseñas no coinciden"
            return error.value                                 //q no siga ejecutando mas codigo, acaba ahi
        }
        cargando.value = true //true pq estoy haciendo await
        let resultado = await registrar(email.value, password.value)  // aqui el resto de validaciones
        //en resultado se guardara UN OBJETO (return de okey)
        cargando.value = false
        console.log(resultado.usuario) 
        if (resultado.ok){
            toast.success("registrado exist")
           
            exito.value = `okey ✅😆 ${email.value} creado exitosamente`
            email.value = ""
            password.value = ""
            confirmarPass.value = ""
            router.push("/login")
            
        }else{

            error.value = `❌ Error! ${resultado.error} `
            //limpiar formulario
            email.value = ""
            password.value = ""
            confirmarPass.value = ""
        }
    }
</script>

<style lang="sass">
*
    margin: 0
    padding: 0
    box-sizing: border-box

section
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
        margin-bottom: 1.5rem
        color: #333

    form
        display: flex
        flex-direction: column
        gap: 1rem

        div
            display: flex
            flex-direction: column

            label
                margin-bottom: 0.3rem
                font-size: 0.9rem
                color: #555

            input
                padding: 0.6rem
                border: 1px solid 
                border-radius: 5px
                font-size: 0.9rem
                transition: border 0.3s
        .btn
            display: flex
            justify-content: center
            align-items: center
            button
                margin-top: 1rem
                padding: 0.7rem
                width: 9rem
                
                background: #4f46e5
                color: white
                border: none
                border-radius: 5px
                font-size: 1rem
                cursor: pointer
                transition: background 0.3s
        .text
            display: flex
            justify-content: center
            align-items: center
        

</style>