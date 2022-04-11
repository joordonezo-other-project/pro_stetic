let services = [];
const getAllServices = () => {
    fetch('./getAllServices', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    }).then(res => res.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                if (responseData && responseData.length > 0) {
                    services = responseData;
                    let table = document.getElementById('servicesTable');
                    let tbody = table.querySelector('tbody');
                    tbody.innerHTML = '';
                    responseData.forEach(element => {
                        let tr = document.createElement('tr');
                        tr.innerHTML = `<td>${element.id}</td>
                                        <td>${element.name}</td>
                                        <td>${element.description}</td>
                                        <td>${element.duration} Minutos</td>
                                        <td>$ ${element.cost}</td>
                                        <td>
                                            <button data-bs-toggle="modal" data-bs-target="#modalEditService" class="btn btn-outline-primary" onclick="showEditService(${element.id})"><i class="bi bi-pen"></i> Editar</button>
                                            <button class="btn btn-outline-primary" onclick="deleteService(${element.id})"><i class="bi bi-trash"></i> Eliminar</button>
                                        </td>`;
                        tbody.appendChild(tr);
                    });
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const saveNewService = () => {
    let nameService = document.getElementById('nameService').value;
    let descriptionService = document.getElementById('descriptionService').value;
    let durationService = document.getElementById('durationService').value;
    let costService = document.getElementById('costService').value;

    if (!nameService || !descriptionService || !durationService || !costService) {
        vNotify.error({ text: 'Todos los campos son obligatorios', title: 'Error' });
        return;
    }

    fetch('./saveNewService', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name: nameService,
            description: descriptionService,
            duration: durationService,
            cost: costService
        })
    }).then(res => res.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                let modalAddService = document.getElementById('modalAddService');
                let buttonClose = modalAddService.querySelector('button[aria-label="Close"]');
                buttonClose.click();
                getAllServices();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const deleteService = (id) => { 
    fetch('./deleteService', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            id: id
        })
    }).then(res => res.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                getAllServices();
            }
        })
        .catch(err => {
            console.log(err);
        });
}
const showEditService = (id) => {
    let currentService = services.find(element => element.id === id);
    document.getElementById('idServiceEdit').value = currentService.id;
    document.getElementById('nameServiceEdit').value = currentService.name;
    document.getElementById('descriptionServiceEdit').value = currentService.description;
    document.getElementById('durationServiceEdit').value = currentService.duration;
    document.getElementById('costServiceEdit').value = currentService.cost;
}

const editService = () => {
    let id= document.getElementById('idServiceEdit').value;
    let name = document.getElementById('nameServiceEdit').value;
    let description = document.getElementById('descriptionServiceEdit').value;
    let duration = document.getElementById('durationServiceEdit').value;
    let cost = document.getElementById('costServiceEdit').value;

    if(!name || !description || !duration || !cost) {
        vNotify.error({ text: 'Todos los campos son obligatorios', title: 'Error' });
        return;
    }

    fetch('./editService', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            id,
            name,
            description,
            duration,
            cost
        })
    }).then(res => res.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                cleanAndCloseModalEditService();
                getAllServices();
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const cleanAndCloseModalEditService = () => {
    document.getElementById('idServiceEdit').value = '';
    document.getElementById('nameServiceEdit').value = '';
    document.getElementById('descriptionServiceEdit').value = '';
    document.getElementById('durationServiceEdit').value = '';
    document.getElementById('costServiceEdit').value = '';
    let modalEditService = document.getElementById('modalEditService');
    let buttonClose = modalEditService.querySelector('button[aria-label="Close"]');
    buttonClose.click();
}
