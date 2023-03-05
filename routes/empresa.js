/*
    Rutas de sucursales
    host + /api/empresa
*/
//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
//Controllers
const { getEmpresas, postEmpresa, putEmpresa, deleteEmpresa } = require('../controllers/empresa');
//Middlewares
const { emailExiste, nombreEmpresa } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tipoEmpresaValido } = require('../middlewares/validaciones');
//Creacion objeto tipo Router()
const router = Router();
//Manejo de rutas

//Mostrar las empresas
router.get('/mostrar', getEmpresas);

//Registro de una empresa
router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreEmpresa),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'Password es obligatorio y debe ser de 6 caracteres').isLength({ min: 6 }),
    //check('tipo_empresa').custom(tipoEmpresaValido),
    check('tipo_empresa').custom(tipoEmpresaValido),
    validarCampos
], postEmpresa);

//Modificar una empresa
router.put('/modificar', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(nombreEmpresa),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'Password es obligatorio y debe ser de 6 caracteres').isLength({ min: 6 }),
    check('tipo_empresa').custom(tipoEmpresaValido),
    validarCampos
], putEmpresa);

//Eliminacion de una empresa
router.delete('/eliminar', [
    validarJWT,
    validarCampos
], deleteEmpresa);

module.exports = router;