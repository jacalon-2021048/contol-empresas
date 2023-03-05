//Importaciones
const { response, request } = require('express');
const jwt = require('jsonwebtoken');
//Importacion modelo
const Empresa = require('../models/empresa')

const validarJWT = async (req = request, res = response, next) => {
    //Solicitud del token en el header
    const token = req.header('x-token');
    
    //Verificar si el token enviado existe
    if (!token) {
        return res.status(401).json('No hay token en la peticion');
    }

    try {
        //Verificacion del token con una llave privada para decodificar el token
        const { uid } = jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);

        //Extrer informacion del usuario que corresponda el uid
        const empresa = await Empresa.findById(uid);

        //Verificar si el uid de la empresa no existe
        if (!empresa) {
            return req.status(400).json('Token no valido - la empresa no esta registrada');
        }
        //Si no hay error se iguala el usuario de la base de datos al del objeto request
        //Sigue con la ejecucion
        req.empresa = empresa;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }

}

module.exports = {
    validarJWT
}