//Importaciones de modelos
const Empresa = require('../models/empresa');
const Sucursal = require('../models/sucursal');
//Este archivo maneja validaciones personalizadas

//Verificamos si el correo ya existe en la DB
const emailExiste = async (correo = '') => {
    const existeEmail = await Empresa.findOne({ correo });
    if (existeEmail) {
        throw new Error(`${correo} ya existe y esta registrado en la DB`);
    }
}

//Verifica si existe un tipo de empresa en la BD
/*const tipoEmpresaValido = async (nombre = '') => {
    const existeTipo = await Tipo.findOne({ nombre });
    if (!existeTipo) {
        throw new Error(`${nombre} no esta registrado en la BD`);
    }
}*/

//Verifica si existe el nombre de la empresa en la BD
const nombreEmpresa = async (nombre = '') => {
    const existeEmpresa = await Empresa.findOne({ nombre });
    if (existeEmpresa) {
        throw new Error(`${nombre} ya existe en la DB`);
    }
}

//Verifica si existe el nombre de la sucursal en la BD
const nombreSucursal = async (nombre = '') => {
    const sucursalBD = await Sucursal.findOne({ nombre });
    if (sucursalBD) {
        throw new Error(`${nombre} ya existe en la DB`);
    }
}

//Verifica si existe un municipio en la BD
/*const nombreMunicipio = async (municipios = []) => {
    for (let i = 0; i < municipios.length; i++) {
        const municipio = municipios[i];
        const regex = new RegExp(municipio, 'i');
        const existeMunicipio = await Municipio.findOne({ nombre: regex });
        if (!existeMunicipio) {
            throw new Error(`${municipio} no esta registrado en la BD`);
        }
    }
}*/

module.exports = {
    //tipoEmpresaValido,
    //nombreMunicipio,
    emailExiste,
    nombreEmpresa,
    nombreSucursal
}