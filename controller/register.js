
const logService = require("../services/log");
const mysqlService = require("../services/mysql");
const config = require("../config");
const geolocation = require("geolocation");

//POST---------------
const registerUser = async (req, res) => {
    const {email,name,lastname,pass} = req.body;

    // VALIDACIONES DE CAMPOS
    if(email!=undefined || email==''){
        req.sessionError = 'Debe digitar un correo';
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }

    if(name!=undefined || name==''){
        req.sessionError = 'Debe digitar su nombre';
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }

    if(lastname!=undefined || lastname==''){
        req.sessionError = 'Debe digitar su apellido';
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }

    if(pass!=undefined || pass==''){
        req.sessionError = 'Debe digitar una contrasña';
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }else if(pass.length<8){
        req.sessionError = 'La contraseña debe tener mas de 8 caracteres';
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }

    // SE PORCEDE A REGISTRAR AL USUARIO
    try {
        await mysqlService.registerUser(email,name,lastname,pass);
    } catch (error) {
        req.sessionError = 'Error al procesar el registro, intentelo mas tarde.';
        console.error('ERROR: ',error);
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }
    // Si el registro fue exitoso, redirect a la pantalla de registro y mostrar al usuario que se ha registrado
    req.sessionSucces = true;
    res.redirect('/register',{
        sessionSuccess:req.sessionSuccess
    });

}
const registerPropertyPost = async (req, res) => {
    // Si el usuario no tiene una session activa, sera devuelto a la pantalla principal
    if(req.user_id==undefined){
        req.sessionError = "No tiene acceso a esta pantalla";
        res.redirect('/home',{
            sessionError:req.sessionError
        });
    }

    const {address,address2,id_city,price,itbis,rooms,adults,kids} = req.body;
    var currentPosition;

    if(address!=undefined || address==''){
        req.sessionError = 'Debe digitar una direccion';
        res.redirect('/register-property',{
            sessionError:req.sessionError
        });
    }

    if(id_city!=undefined || id_city==''){
        req.sessionError = 'Debe seleccionar una ciudad';
        res.redirect('/register-property',{
            sessionError: req.sessionError
        });
    }

    if(price!=undefined || isNaN(price)){
        req.sessionError = 'Debe digitar el precio por alquiler';
        res.redirect('/register-property',{
            sessionError:req.sessionError
        });
    }

    if(rooms!=undefined || isNaN(rooms)){
        req.sessionError = 'Debe digitar la cantidad de habitaciones';
        res.redirect('/register-property',{
            sessionError:req.sessionError
        });
    }

    if(adults!=undefined || isNaN(adults)){
        req.sessionError = 'Debe digitar la cantidad de adultos maximo';
        res.redirect('/register-property',{
            sessionError:req.sessionError
        });
    }

    if(kids!=undefined || isNaN(kids)){
        req.sessionError = 'Debe digitar la cantidad de niños maximo';
        res.redirect('/register-property',{
            sessionError:req.sessionError
        });
    }

    try {
        geolocation.getCurrentPosition(function (err, position) {
            if (err) throw err

            currentPosition = position;
            console.log(position)
        })
    } catch (error) {
        req.sessionError = 'Error al conseguir la ubicacion';
        console.error('ERROR: ',error);
        res.redirect('/register',{
            sessionError: req.sessionError
        });
    }
    try {
        await mysqlService.registerUserProperty(req.user_id,address,address2,id_city,price,itbis,rooms,adults,kids,currentPosition);
    } catch (error) {
        req.sessionError = 'Error al procesar el registro, intentelo mas tarde.';
        console.error('ERROR: ',error);
        res.redirect('/register',{
            sessionError:req.sessionError
        });
    }

    req.sessionSucces = true;
    res.render("register-property", {
        sessionSuccess:req.sessionSuccess
    });
}

//GET---------------
const getRegisterEmail = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/");
        return;
    }
    res.render("register", {
        show_modal:false,
        sessionSuccess: req.sessionSuccess
    });
}

const getRegisterPhone = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/");
        return;
    }

    res.render("register-phone", {
        
    });
}

const getRegisterProperty = (req, res) => {
    logService.info("Estado de la sesion: " + req.state);

    // Al acceder a la ruta raiz:

    if (req.state == "done") {
        logService.info("Estado del usuario: done");
        res.redirect("/dashboard");
        return;
    }

    res.render("register-property", {
        
    });
}

module.exports={
    registerUser,
    getRegisterEmail,
    getRegisterPhone,
    getRegisterProperty,
    registerPropertyPost
}