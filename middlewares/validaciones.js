const municipios = [
    "Guatemala",
    "Santa Catarina Pinula",
    "San José Pinula",
    "San José del Golfo",
    "Palencia",
    "Chinautla",
    "San Pedro Ayampuc",
    "Mixco",
    "San Pedro Sacatepéquez",
    "San Juan Sacatepéquez",
    "San Raymundo",
    "Chuarrancho",
    "Fraijanes",
    "Amatitlán",
    "Villa Nueva",
    "Villa Canales",
    "San Miguel Petapa"
];

const tipo_empresa = ["Restaurante", "Distribuidora", "Banco", "Supermercado", "Ferreteria"];

const existeMunicipio = (muni = []) => {
    for (let i = 0; i < muni.length; i++) {
        const municipio = muni[i];
        const regex = new RegExp(municipio, 'i');
        if (!municipios.some((elem) => regex.test(elem))) {
            throw new Error(`${municipio} no es un municipio de la Ciudad Capital`);
        }
    }
    return true;
};

const tipoEmpresaValido = async (nombre = '') => {
    const regex = new RegExp(nombre, 'i');
    if (!tipo_empresa.some((elem) => regex.test(elem))) {
        throw new Error(`${nombre} no está entre los tipos de empresa válidos`);
    }
}

module.exports = {
    existeMunicipio,
    tipoEmpresaValido
}