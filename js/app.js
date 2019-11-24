$('document').ready(function () { 
    Observador();

    document.getElementById('btnRegistro').addEventListener('click', registrar);
    document.getElementById('btnSesion').addEventListener('click', Ingreso);


})


    function registrar() {

    var email = document.getElementById('email').value;
    var pass = document.getElementById('pass').value;

        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function () {
                verificar();
                msjRegistro("Usuario registrado, por favor revise su correo..", "success");

            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode);
                console.log(errorMessage);
                msjRegistro("Ha ocurrio un error..", "danger");
            });

    //document.getElementById('email').value = "";
    //document.getElementById('pass').value = "";
}



    function Ingreso(e) {
        var email2 = document.getElementById('emailInicio').value;
        var pass2 = document.getElementById('passInicio').value;

        var btnSesion = document.getElementById('btnSesion').innerText;

        if (btnSesion == 'Iniciar Sesion') {

            e.preventDefault();
            firebase.auth().signInWithEmailAndPassword(email2, pass2).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...

                console.log(errorCode);
                console.log(errorMessage);
            });
        }

        else {
          
           cerrarSesion();
        }
        
       
    }

    function msjRegistro(mensaje, color) {

    contenido.innerHTML = `
    
        <p class="text-${color}">${mensaje}</p>
        `; 
    setTimeout(limpiarCampos, 4000);
   
}


    function limpiarCampos() {

    location.reload();

}

    function Observador() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                estado(user);
                console.log('Existe');
                console.log(user.emailVerified);
                

                // ...
            } else {
                // User is signed out.
                console.log('No existe');
                contenido.innerHTML = `
    
                `;
                // ...
            }
        });
        
    }



    function estado(user) {
        var user = user;
        //var contenido = document.getElementById('contenido');
        var btnSesion = document.getElementById('btnSesion');

        if (user.emailVerified) {
            btnSesion.innerText = 'Salir';
            document.getElementById('passInicio').value= '';
        }
        else {
            document.getElementById('btnSesion').innerText = 'Iniciar Sesion';
        }

    }

    function cerrarSesion() {
        firebase.auth().signOut()
            .then(function () {
                console.log('saliendo');
                
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    function verificar() {

        var user = firebase.auth().currentUser;

        user.sendEmailVerification()
            .then(function () {
                console.log('Se esta enviando msj confirmacion...');
            })
            .catch(function (error) {
                console.log('ERROR');
                // An error happened.
            });

    }

