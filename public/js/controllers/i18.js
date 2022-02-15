const words = {
    'active': 'Activo',
    'inactive': 'Inactivo',
};

const i18 = (word) => {
    return words[word] || word;
};