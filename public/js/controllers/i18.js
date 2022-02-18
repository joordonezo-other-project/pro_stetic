const words = {
    'active': 'Activo',
    'inactive': 'Inactivo',
    'worker': 'Trabajador',
    'client': 'Cliente',
};

const i18 = (word) => {
    return words[word] || word;
};