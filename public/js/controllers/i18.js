const words = {
    'active': 'Activo',
    'inactive': 'Inactivo',
    'worker': 'Trabajador',
    'client': 'Cliente',
    'canceled': 'Cancelado',
    'payment': 'Pago',
    'income': 'Ingreso',
    'egress': 'Egreso',
};

const i18 = (word) => {
    return words[word] || word;
};