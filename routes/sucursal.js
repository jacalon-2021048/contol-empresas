/*
    Rutas de sucursales
    host + /api/empresa/sucursal
*/
//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
//Controllers
const { getSucursales, postSucursal, putSucursal, deleteSucursal, buscarSucursal } = require('../controllers/sucursal');
//Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existeMunicipio } = require('../middlewares/validaciones')
const { nombreSucursal } = require('../helpers/db-validators');
//Creacion objeto tipo Router()
const router = Router();

//Manejo de rutas
//En todas las funciones se usa el token
router.use(validarJWT);

//Obtener todas las sucursales - metodo privado - cualquier empresa
router.get('/mostrar', getSucursales);

//Crear una sucursal - metodo privado - cualquier empresa
router.post('/agregar', [
    check('nombre', 'Agregue un nombre a la sucursal').not().isEmpty(),
    check('nombre').custom(nombreSucursal),
    //check('municipios').custom(nombreMunicipio),
    check('municipios').custom(existeMunicipio),
    validarCampos
], postSucursal);

//Actualizar una sucursal - metodo privado - cualquier empresa
router.put('/modificar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'Agregue un nombre a la sucursal').not().isEmpty(),
    validarCampos
], putSucursal);

//Borrar una sucursal - metodo privado - cualquier empresa
router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], deleteSucursal);

//Buscar una sucursal - metodo privado - cualquier empresa
router.get('/:termino', buscarSucursal);
module.exports = router;