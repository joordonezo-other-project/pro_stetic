
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
    let startDate = await getDateFormat(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    let endDate = await getDateFormat(neutralDate.getFullYear(), neutralDate.getMonth(), neutralDate.getDate());
    let schedules = await getScheduleByRangeDates(startDate, endDate);
    //console.log(schedules);
    for (i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        for (j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if ((i == 0 && j > dayOfWeek - 1) || (i > 0 && neutralDate.getDate() > currenDay)) {
                currenDay++;
                let dateByDay = await getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay);
                let rangeSchedules = schedules.find(item => item.date == dateByDay)?.rangeSchedules;
                //console.log(rangeSchedules);
                let citation = {
                    dateByDay,
                    rangeSchedules
                }
                let dayTable = await buildTableDay(citation);
                td.innerHTML = `
                <div class="container ">
                <div class="row justify-content-center ${currenDay < currentDate.getDate() ? 'none-click' : ''}">
                <span class="fw-bold text-center ${currenDay == currentDate.getDate() ? 'badge bg-secondary' : ''}">${dateByDay} ${currenDay == currentDate.getDate() ? 'Hoy' : ''}</span>
                ${dayTable.outerHTML}       
                </div>
                </div>
            `;
            }
            tr.appendChild(td);
        }
        tableCalendar.appendChild(tr);
    }

}

const buildTableDay = (citation) => {
    let objConfig = [];
    if (citation.rangeSchedules) {
        objConfig = citation.rangeSchedules.map(item => {
            let hourStart = Number(item.startHour.split(':')[0]);
            return {
                startHour: hourStart,
                diff: Number(item.endHour.split(':')[0]) - hourStart,
                color: colorRGB()
            }
        });
    }
    let table = document.createElement('table');
    table.classList.add('table');
    table.id = 'dayTable';
    let tbody = document.createElement('tbody');
    let renewFind = 6;
    let copyItem;
    for (let k = 6; k < 19; k++) {
        let tr = document.createElement('tr');
        if (objConfig.length > 0) {
            let item = objConfig.find(item => item.startHour == k);
            if (item) {
                copyItem = { ...item };
                renewFind = copyItem.startHour + copyItem.diff;
            }
            if (k < renewFind && copyItem) {
                tr.style.backgroundColor = copyItem.color;
                tr.classList.add('none-click');
            } else {
                tr.classList.remove('none-click');
            }
        }
        tr.innerHTML = `
        <td>${dayjs().hour(k).format('HH:00')}</td>
        <td><div data-bs-toggle="modal" data-bs-target="#modalAddCitation" class="btn btn-outline-primary size-of-calendar" onclick="setStartHourCitation('${dayjs().hour(k).format('HH:00')}', '${citation.dateByDay}')" title="Agregar cita"></div></td>
        `;
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    return table;
}


const getScheduleByRangeDates = (startDate, endDate) => {
    return fetch('./getScheduleByRangeDates', {
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
            startDate: startDate,
            endDate: endDate
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                return responseData;
            }
        });
}
const setPeopleCitationByRole = (fullName, idPerson, roleName, role) => {

    if (roleName == 'worker') {
        let inputAsigned = document.getElementById('inputAsigned');
        inputAsigned.value = fullName;
        inputAsigned.setAttribute('data-id', idPerson);
    } else if (roleName == 'client') {
        let inputClient = document.getElementById('inputClient');
        inputClient.value = fullName;
        inputClient.setAttribute('data-id', role);
    }

}

const searchPeopleByName = () => {
    let name = document.getElementById('namePeopleSearch').value;
    if (name.length > 0) {
        fetch('./searchPeopleByName', {
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
                name,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.error) {
                    const { message, title, responseData, status } = data;
                    if (status === true) {
                        vNotify.success({ text: message, title: title });
                    } else {
                        vNotify.error({ text: message, title: title });
                    }
                    let listOfPeople = document.getElementById('listOfPeople');
                    listOfPeople.innerHTML = '';
                    if (responseData.length > 0) {
                        responseData.map(item => {
                            let li = document.createElement('li');
                            li.classList.add('list-group-item');
                            li.innerHTML = `
                        <div class="row">
                            <div class="input-group mb-2">
                                <span class="fw-bold input-group-text">${item.name} ${item.lastName}</span>
                                <span class="fw-bold input-group-text">${i18(item.roleName)}</span>
                                <button class="btn btn-outline-primary " onclick="setPeopleCitationByRole('${item.name} ${item.lastName}',${item.id},'${item.roleName}',${item.role})"><i class="bi bi-plus"></i> Agregar</button>
                            </div>
                        </div>
                        `;
                            listOfPeople.appendChild(li);
                        });


                    }
                }
            });
    }
}
const setStartHourCitation = async (hour, dateByDay) => {
    let citationDate = document.getElementById('citationDate');
    citationDate.value = dateByDay;
    let citationHourInit = document.getElementById('citationHourInit');
    citationHourInit.value = hour;
    let services = await getServicesAvailables();
    buildSelectServices(services);


}

const getServicesAvailables = () => {
    return fetch('./getServicesAvailables', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                return responseData;
            }

        });
}

const buildSelectServices = (services) => {
    let contentSelect = document.getElementById('selectServiceCitationContainer');
    contentSelect.innerHTML = '';
    let selectServices = document.createElement('select');
    selectServices.classList.add('form-select');
    selectServices.id = "selectServiceCitation"
    selectServices.addEventListener('change', (e) => {
        clickOptionService(e, services);
    });

    if (services.length > 0) {
        services.map(item => {
            selectServices.innerHTML += `
                        <option value="${item.id}">
                            ${item.name} | ${item.duration} Minutos | $ ${item.cost}
                        </option>
                        `;
        });
        contentSelect.appendChild(selectServices);
    }
}

const clickOptionService = (event, services) => {
    let idService = event.target.value;
    let service = services.find(item => item.id == idService);

    let startHour = document.getElementById('citationHourInit').value;
    let endHour = dayjs(startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
    document.getElementById('citationHourEnd').value = endHour;

}

const saveCitation = () => {

    let citationDate = document.getElementById('citationDate')?.value;
    let startHour = document.getElementById('citationHourInit')?.value;
    let endHour = document.getElementById('citationHourEnd')?.value;
    let idService = document.getElementById('selectServiceCitation')?.value;
    let idClient = document.getElementById('inputClient')?.getAttribute('data-id');
    let idAsigned = document.getElementById('inputAsigned')?.getAttribute('data-id');
    let observationsCitation = document.getElementById('observationsCitation')?.value;

    let contains = citationDate && startHour && endHour && idService && idClient && idAsigned;

    if (!contains) {
        vNotify.error({ text: 'Hay Campos vacios que son necesarios', title: 'Campos Requeridos' });
        return;
    }


    fetch('./saveCitation', {
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
            idUser: Number(idClient),
            idWorker: Number(idAsigned),
            idService: Number(idService),
            description: observationsCitation,
            dataShedule: {
                startHour: startHour,
                endHour: endHour,
                date: citationDate
            }
        }),

    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message + '\n N° Cita: ' + responseData, title: title });

                } else {
                    vNotify.error({ text: message, title: title });
                }
                updateCalendar();
                let thisModalBtnClose = document.querySelector('#modalAddCitation button.btn-close');
                thisModalBtnClose.click();
            }
        });
}
