const getAllCitations = () => {
    fetch('./getAllCitations', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        /*body: JSON.stringify({
            nameClientOrder: document.getElementById('nameClientOrder').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            orderDate: document.getElementById('orderDate').value,
            description: document.getElementById('descriptionOrder').value || '',
            orderDetails: orderDetails,
        }),*/
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                console.log(responseData)
                currentCitations = responseData;
                if (responseData.length > 0) {
                    let table = document.getElementById('citationTable');
                    let tbody = table.getElementsByTagName('tbody')[0];
                    tbody.innerHTML = '';
                    responseData.forEach(element => {
                        let tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${element.id}</td>
                            <td>${element.creationDate}</td>
                            <td>${element.description}</td>
                            <td>${element.nameWorker} ${element.lastnameWorker}</td>
                            <td>${element.nameUser} ${element.lastnameUser}</td>
                            <td>${i18(element.status)}</td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalCitationsDetails" class="btn btn-outline-primary" onclick="showCitationDetails(${element.id})" title="Ver el detalle de la cita"><i class="bi bi-eye"></i>Ver  Detalle</button></td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalCitationsDetailsEdit" class="btn btn-outline-primary" onclick="editCitationDetails(${element.id})" title="Editar cita"><i class="bi bi-pen"></i>Editar</button></td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalCitationsDetailsPay" class="btn btn-outline-primary" onclick="payCitationDetails(${element.id})" title="Editar cita"><i class="bi bi-cash-coin"></i>Cobrar</button></td>
                            `;
                        tbody.appendChild(tr);
                    });

                }
            }
        });
}

const showCitationDetails = (id) => {
    let citation = currentCitations.find(citation => citation.id === id);
    fetch('./getCitationDetails', {
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
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                console.log(data);
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                console.log(responseData)
                if (responseData) {
                    let table = document.getElementById('modalCitationsDetailsTable');
                    let tbody = table.getElementsByTagName('tbody')[0];
                    tbody.innerHTML = '';

                    let detailsService = document.getElementById('detailsService');
                    detailsService.innerHTML = `
                    <div class="input-group-text"><b>Asignado a: </b> ${citation.nameWorker} ${citation.lastnameWorker}</div>
                    <div class="input-group-text"><b>Cliente: </b> ${citation.nameUser} ${citation.lastnameUser}</div>
                    <div class="input-group-text"><b>Comentario: </b>${responseData.description}</div>
                    `;
                    responseData.services.forEach(element => {
                        let tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${element.id}</td>
                            <td>${element.name}</td>	
                            <td>${element.duration} Minutos</td>	
                            <td>$ ${element.cost}</td>	
                            <td>${element.description}</td>	
                            `;

                        tbody.appendChild(tr);
                    });
                }
            }
        });
}

function getCalendarStart(dayOfWeek, currentDate) {
    var date = currentDate - 1;
    var startOffset = (date % 7) - dayOfWeek;
    if (startOffset > 0) {
        startOffset -= 7;
    }
    return Math.abs(startOffset);
}

const updateCalendar = async () => {

    let currentDate = new Date();
    let firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let neutralDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let day = firstDate.getUTCDay();
    let date = firstDate.getUTCDate();
    let dayOfWeek = getCalendarStart(day, date);
    let tableCalendar = document.querySelector('#calendarTable tbody');
    tableCalendar.innerHTML = '';
    let currenDay = 0;
    //let currentProduction = await getProductionByMonth(currentDate.getFullYear(), (currentDate.getMonth() + 1));

    for (i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        for (j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if ((i == 0 && j > dayOfWeek - 1) || (i > 0 && neutralDate.getDate() > currenDay)) {
                currenDay++;
                let dateByDay = getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay);
                //let prodTotal = currentProduction.find(item => item.dateOfProduction == dateByDay);
                td.innerHTML = `
                <div class="container ">
                <div class="row justify-content-center">
                <span class="fw-bold text-center ${currenDay == currentDate.getDate() ? 'badge bg-secondary':''}">${dateByDay} ${currenDay == currentDate.getDate() ? 'Hoy':''}</span>
                <canvas data-bs-toggle="modal" data-bs-target="#modalAddCitation" class="btn btn-outline-primary mb-2 size-of-calendar">

                </canvas>
                </div>
                </div>
            `;
            }
            tr.appendChild(td);
        }
        tableCalendar.appendChild(tr);
    }

}