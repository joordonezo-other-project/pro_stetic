window.citationControllerVar = {
    currentDate: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    }
};
const { citationControllerVar: CCitation } = window;

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
        }
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                let { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                currentCitations = responseData;
                if (responseData.length > 0) {
                    responseData = responseData.sort((a, b) => a.id < b.id ? 1 : -1);
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
                            <td><b>Fecha:</b> ${element.date} <b>Inicio:</b> ${element.startHour} <b>Fin:</b> ${element.endHour}</td>
                            <td>
                            <span class="d-flex justify-content-center badge mb-1 status-${element.status}">${i18(element.status)}</span>
                            <button class="btn btn-outline-primary btn-sm ${element.status != 'active' ? 'none-click' : ''}" onclick="cancelCitation(${element.id})" title="cancelar la cita"><i class="bi bi-x-octagon"></i></button>
                            </td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalCitationsDetails" class="btn btn-outline-primary" onclick="showCitationDetails(${element.id})" title="Ver el detalle de la cita"><i class="bi bi-eye"></i>Detalle</button></td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalEditCitation" class="btn btn-outline-primary ${element.status != 'active' ? 'none-click' : ''}" onclick="editCitationDetails(${element.id})" title="Editar cita"><i class="bi bi-pen"></i>Editar</button></td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalPayCitation" class="btn btn-outline-primary ${element.status != 'active' ? 'none-click' : ''}" onclick="showPayCitationDetails(${element.id})" title="Cobrar cita"><i class="bi bi-cash-coin"></i>Cobrar</button></td>
                            `;
                        tbody.appendChild(tr);
                    });
                }

            }
        });
}

const cancelCitation = (id) => {
    fetch('./cancelCitation', {
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
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                let { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                    getAllCitations();
                } else {
                    vNotify.error({ text: message, title: title });
                }
            }
        });
}

const showCitationDetails = async (id) => {
    let citation = currentCitations.find(citation => citation.id === id);
    let responseData = await getCitationDetailsById(id);
    if (responseData) {
        let table = document.getElementById('modalCitationsDetailsTable');
        let tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';

        let detailsService = document.getElementById('detailsService');
        detailsService.innerHTML = `
                    <div class="input-group-text"><b>Asignado a: </b> ${citation.nameWorker} ${citation.lastnameWorker}</div>
                    <div class="input-group-text"><b>Cliente: </b> ${citation.nameUser} ${citation.lastnameUser}</div>
                    <div class="input-group-text"><b>Estado: </b> ${i18(citation.status)}</div>
                    `;
        console.log(responseData);
        responseData.forEach(element => {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                            <td>${element.id}</td>
                            <td>${element.name}</td>	
                            <td>${element.duration} Minutos</td>	
                            <td>$ ${element.cost}</td>	
                            <td>${element.description}</td>	
                            <td>${element.observation}</td>	
                            `;

            tbody.appendChild(tr);
        });
    }
}
const getCitationDetailsById = async (id) => {
    return fetch('./getCitationDetails', {
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
                const { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                    return responseData;
                } else {
                    vNotify.error({ text: message, title: title });
                }
            }
        });
}
const editCitationDetails = async (id) => {
    document.getElementById('citationId').value = id;
    let citation = currentCitations.find(citation => citation.id === id);
    document.getElementById('editobservationsCitation').value = citation.description;
    document.getElementById('editcitationHourInit').value = dayjs(citation.startHour, 'HH:mm:ss').format('HH:mm');
    document.getElementById('editcitationHourEnd').value = dayjs(citation.endHour, 'HH:mm:ss').format('HH:mm');
    document.getElementById('editcitationDate').value = citation.date;
    document.getElementById('editinputAsigned').value = citation.nameWorker + ' ' + citation.lastnameWorker;
    document.getElementById('editinputAsigned').setAttribute('data-id', citation.idWorker);
    document.getElementById('editinputClient').value = citation.nameUser + ' ' + citation.lastnameUser;
    document.getElementById('editinputClient').setAttribute('data-id', citation.idUser);

    let editselectServiceCitationContainer = document.getElementById('editselectServiceCitationContainer');
    editselectServiceCitationContainer.innerHTML = '';
    let services = await getServicesAvailables();
    CCitation.servicesAvailables = services;
    buildSelectServices(services, 'edit');
    buildAndShowCurrentsServices(citation.id);

}
const buildAndShowCurrentsServices = async (id) => {
    let services = await getServicesByCitationId(id);
}

function getCalendarStart(dayOfWeek, currentDate) {
    var date = currentDate - 1;
    var startOffset = (date % 7) - dayOfWeek;
    if (startOffset > 0) {
        startOffset -= 7;
    }
    return Math.abs(startOffset);
}

const navigateCalendar = (direction) => {
    if (direction === 'next' && CCitation.currentDate.month < 12) {
        CCitation.currentDate.month++;
        if (CCitation.currentDate.month == 12) {
            CCitation.currentDate.month = 0;
            CCitation.currentDate.year++
        }
    } else if (direction === 'previous' && CCitation.currentDate.month >= 0) {
        CCitation.currentDate.month--;
        if (CCitation.currentDate.month == -1) {
            CCitation.currentDate.month = 11;
            CCitation.currentDate.year--
        }
    }
    updateCalendar();
}
const updateCalendar = async () => {

    let currentDate = new Date();
    currentDate = new Date(CCitation.currentDate.year, CCitation.currentDate.month, currentDate.getDate());
    let firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    let neutralDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    let day = firstDate.getUTCDay();
    let date = firstDate.getUTCDate();
    let dayOfWeek = getCalendarStart(day, date);

    let labelMonth = document.getElementById('labelMonth');
    labelMonth.textContent = dayjs(currentDate).locale('es').format('MMMM YYYY');

    let tableCalendar = document.querySelector('#calendarTable tbody');
    tableCalendar.innerHTML = '';
    let currenDay = 0;

    let currentdateByShow = {
        date: null,
        day: null,
    }
    for (i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        for (j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if ((i == 0 && j > dayOfWeek - 1) || (i > 0 && neutralDate.getDate() > currenDay)) {
                currenDay++;
                let dateByDay = await getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay);
                let dateByDay2 = await getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay + 1);

                let isToday = currenDay == currentDate.getDate() && new Date().getMonth() == currentDate.getMonth() && new Date().getFullYear() == currentDate.getFullYear();
                if (isToday) {
                    currentdateByShow.date = dateByDay;
                    currentdateByShow.day = currenDay;
                }
                td.innerHTML = `
            <button id="calendarDay${currenDay}" class="btn btn-outline-primary btn-block btnCalendarCircle ${dayjs(dateByDay2).isBefore(new Date()) ? 'opacity-05' : ''} ${currenDay} ${isToday ? 'fw-bold btnShadow' : ''}" data-date="${dateByDay}" onclick="showCitationByDate('${dateByDay}',${currenDay})">
            ${currenDay} ${isToday ? 'Hoy' : ''}
            </button>
            `;
            }
            tr.appendChild(td);
        }
        tableCalendar.appendChild(tr);
    }
    //generate Click for currentdateByShow
    document.getElementById(`calendarDay${currentdateByShow.day}`).click(currentdateByShow.date, currentdateByShow.day);

}
const showCitationByDate = async (date, day) => {
    document.querySelectorAll('.btnCalendarCircleActive').forEach(item => {
        item.classList.remove('btnCalendarCircleActive');
    });
    document.getElementById('calendarDay' + day).classList.add('btnCalendarCircleActive');

    let schedules = await getScheduleByRangeDates(date, date);
    CCitation.schedules = schedules;
    let rangeSchedules = schedules.filter(item => item.date == date);
    rangeSchedules = rangeSchedules.map(item => {
        return item.rangeSchedules[0];
    });

    let citation = {
        date,
        rangeSchedules
    }
    let dayTable = await buildTableDay(citation);
    let thisDayContainer = document.getElementById('thisDayContainer');
    thisDayContainer.innerHTML = dayTable.outerHTML;
}
const buildTableDay = (citation) => {
    let objConfig = [];
    if (citation.rangeSchedules) {
        objConfig = citation.rangeSchedules.map(item => {

            return {
                startHour: item.startHour,
                endHour: item.endHour,
                color: colorRGB()
            }
        });
    }
    let table = document.createElement('table');
    table.classList.add('table');
    table.id = 'dayTable';
    let tbody = document.createElement('tbody');
    const { initialHour, hoursPerDay, millisecondsAdded } = window.globalConfig;

    let minutes = (millisecondsAdded / 60 / 1000);
    let hours = minutes / 60;
    let totalIterator = (hoursPerDay / hours);
    let numberIterationFrom = (totalIterator - initialHour) + 1;
    let iteratorDate = dayjs().hour(initialHour).minute(0).second(0).millisecond(0);
    for (let k = initialHour; k < numberIterationFrom; k++) {
        let tr = document.createElement('tr');
        if (objConfig.length > 0) {
            objConfig.forEach(item => {
                let beginHour = dayjs(item.startHour, 'HH:mm:ss');
                let endHour = dayjs(item.endHour, 'HH:mm:ss');
                if (iteratorDate.isSame(beginHour) || iteratorDate.isBetween(beginHour, endHour) || iteratorDate.isSame(endHour)) {
                    tr.style.backgroundColor = item.color;
                }
            });
        }
        tr.innerHTML = `
        <td class="col-1 text-center">${iteratorDate.format('HH:mm')}</td>
        <td class="col-11"><div data-bs-toggle="modal" data-bs-target="#modalAddCitation" class="btn btn-outline-primary size-of-calendar witoutBorder" onclick="setStartHourCitation('${iteratorDate.format('HH:mm')}', '${citation.date}')" title="Agregar cita"></div></td>
        `;
        tbody.appendChild(tr);
        iteratorDate = iteratorDate.add(millisecondsAdded, 'millisecond');
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
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                return responseData;
            }
        });
}

const setPeopleCitationByRole = (fullName, idPerson, roleName, role, typeSearch) => {

    if (roleName == 'worker') {
        let inputAsigned = '';
        if (typeSearch == 'edit') {
            inputAsigned = document.getElementById('editinputAsigned');
        } else {
            inputAsigned = document.getElementById('inputAsigned');
        }
        inputAsigned.value = fullName;
        inputAsigned.setAttribute('data-id', idPerson);
    } else if (roleName == 'client') {
        let inputClient = '';
        if(typeSearch == 'edit'){
            inputClient = document.getElementById('editinputClient');
        }else{
            inputClient = document.getElementById('inputClient');
        }
        inputClient.value = fullName;
        inputClient.setAttribute('data-id', idPerson);
    }

}

const searchPeopleByName = (typeSearch) => {
    let name = '';
    if (typeSearch == 'edit') {
        name = document.getElementById('editnamePeopleSearch').value;
    } else {
        name = document.getElementById('namePeopleSearch').value;
    }
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
                        // vNotify.success({ text: message, title: title });
                    } else {
                        vNotify.error({ text: message, title: title });
                    }

                    let listOfPeople = null;
                    if (typeSearch == 'edit') {
                        listOfPeople = document.getElementById('editlistOfPeople');

                    } else {
                        listOfPeople = document.getElementById('listOfPeople');
                    }

                    listOfPeople.innerHTML = '';
                    if (responseData.length > 0) {
                        responseData.map(item => {
                            if (!typeSearch || (typeSearch == 'edit' && item.roleName == 'worker')) {

                                let li = document.createElement('li');
                                li.classList.add('list-group-item');
                                li.innerHTML = `
                        <div class="row">
                            <div class="input-group mb-2">
                                <span class="fw-bold input-group-text">${item.name} ${item.lastName}</span>
                                <span class="fw-bold input-group-text">${i18(item.roleName)}</span>
                                <button class="btn btn-outline-primary " onclick="setPeopleCitationByRole('${item.name} ${item.lastName}',${item.id},'${item.roleName}',${item.role},'${typeSearch}')"><i class="bi bi-plus"></i> Agregar</button>
                            </div>
                        </div>
                        `;
                                listOfPeople.appendChild(li);
                            }
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
    CCitation.servicesAvailables = services;
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
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                return responseData;
            }

        });
}
const getServicesByCitationId = (id) => {
    return fetch('./getServicesByCitationId', {
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
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    // vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                return responseData;
            }

        });
}

const buildSelectServices = (services, modalType) => {

    let contentSelect = '';
    let id = '';
    if (modalType == 'edit') {
        contentSelect = document.getElementById('editselectServiceCitationContainer');
        id = 'editselectServiceCitation';
    } else {
        contentSelect = document.getElementById('selectServiceCitationContainer');
        id = 'selectServiceCitation';
    }
    contentSelect.innerHTML = '';
    let selectServices = document.createElement('div');
    selectServices.id = id;

    if (services.length > 0) {
        services.map(item => {
            selectServices.innerHTML += `
                        <div class="row mb-3">
                        <div class="input-group">
                        <label class="form-control">
                            ${item.name} | ${item.duration} Minutos | $ ${item.cost}
                        </label>
                        <button class="btn btn-outline-primary btn-sm" onclick="clickOptionService(${item.id},'${modalType}')"><i class="bi bi-plus"></i> Agregar</button>
                        </div>
                        </div>
                        `;
        });
        contentSelect.appendChild(selectServices);
    }
}

let tempArrayServices = [];
let editTempArrayServices = [];

const clickOptionService = (idService, modalType) => {
    let service = CCitation.servicesAvailables.find(item => item.id == idService);
    let existService = [];
    let startHour;
    if (modalType == 'edit') {
        existService = editTempArrayServices.find(item => item.id == idService);
        startHour = document.getElementById('editcitationHourInit').value;
    } else {
        existService = tempArrayServices.find(item => item.id == idService);
        startHour = document.getElementById('citationHourInit').value;
    }

    if (!existService) {
        if (modalType == 'edit') {
            if (editTempArrayServices.length > 0) {
                let lastService = editTempArrayServices[editTempArrayServices.length - 1];
                service.startHour = lastService.endHour;
                service.endHour = dayjs(service.startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
            } else {
                service.startHour = startHour;
                service.endHour = dayjs(startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
            }
            let isScheduleAvailable = checkScheduleAvailable(service, modalType);
            if (!isScheduleAvailable) {
                vNotify.error({ text: 'El servicio no esta disponible en el horario seleccionado', title: 'Citas Cruzadas' });
                return;
            } else {
                editTempArrayServices.push(service);
            }
        }
        else {
            if (tempArrayServices.length > 0) {
                let lastService = tempArrayServices[tempArrayServices.length - 1];
                service.startHour = lastService.endHour;
                service.endHour = dayjs(service.startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
            } else {
                service.startHour = startHour;
                service.endHour = dayjs(startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
            }
            let isScheduleAvailable = checkScheduleAvailable(service, modalType);
            if (!isScheduleAvailable) {
                vNotify.error({ text: 'El servicio no esta disponible en el horario seleccionado', title: 'Citas Cruzadas' });
                return;
            } else {
                tempArrayServices.push(service);
            }
        }
    } else
        return;

    let finalDuration = 0;
    let total = 0;
    let ids = {
        id: null,
        citationHour: null,
        totalCost: null
    };
    if (modalType == 'edit') {
        ids.id = 'editservicesDetailsTable';
        ids.citationHour = 'editcitationHourEnd';
        ids.totalCost = 'edittotalCost';
        editTempArrayServices.forEach(item => {
            finalDuration += item.duration;
            total += item.cost;
        });
    } else {
        ids.id = 'servicesDetailsTable';
        ids.citationHour = 'citationHourEnd';
        ids.totalCost = 'totalCost';
        tempArrayServices.forEach(item => {
            finalDuration += item.duration;
            total += item.cost;
        });
    }
    document.getElementById(`${ids.citationHour}`).value = dayjs(startHour, 'HH:mm').add(finalDuration, 'minute').format('HH:mm');
    document.querySelector(`#${ids.totalCost} span`).textContent = `$ ${total}`;
    let servicesDetailsTableTbody = document.querySelector(`#${ids.id} tbody`);
    let tr = document.createElement('tr');
    tr.id = `trService${service.id}`;

    tr.innerHTML = `
    <td class="text-center">${service.id}</td>
    <td class="text-center">${service.name}</td>
    <td class="text-center">${service.duration} Minutos</td>
    <td class="text-center">$ ${service.cost}</td>
    <td class="text-center">${service.startHour}</td>
    <td class="text-center">${service.endHour}</td>
    <td class="text-center"><input type="text" id="inputObservation${service.id}" class="form-control"/></td>
    <td class="text-center"><button class="btn btn-outline-danger btn-sm" onclick="removeService(${service.id},'${modalType}')"><i class="bi bi-trash"></i></button></td>
    `;
    servicesDetailsTableTbody.insertBefore(tr, document.getElementById(`#${ids.totalCost}`));

}
const removeService = (id, modalType) => {
    let thisArrayServices = [];
    if (modalType == 'edit') {
        editTempArrayServices = editTempArrayServices.filter(item => item.id != id);
        thisArrayServices = editTempArrayServices;
    } else {
        tempArrayServices = tempArrayServices.filter(item => item.id != id);
        thisArrayServices = tempArrayServices;
    }
    let startHour;
    let ids = {
        id: null,
        citationHour: null,
        totalCost: null
    };
    if (modalType == 'edit') {
        ids.id = 'editservicesDetailsTable';
        ids.citationHourinit = 'editcitationHourInit';
        ids.citationHourEnd = 'editcitationHourEnd';
        ids.totalCost = 'edittotalCost';
    } else {
        ids.id = 'servicesDetailsTable';
        ids.citationHourinit = 'citationHourInit';
        ids.citationHourEnd = 'citationHourEnd';
        ids.totalCost = 'totalCost';
    }
    startHour = document.getElementById(`${ids.citationHourinit}`).value;

    let finalDuration = 0;
    let total = 0;
    console.log(thisArrayServices)
    thisArrayServices = thisArrayServices.map((item, index) => {
        if (index == 0) {
            item.startHour = startHour;
            item.endHour = dayjs(startHour, 'HH:mm').add(item.duration, 'minute').format('HH:mm');

        } else {
            let lastService = thisArrayServices[index - 1];
            item.startHour = lastService.endHour;
            item.endHour = dayjs(item.startHour, 'HH:mm').add(item.duration, 'minute').format('HH:mm');
        }
        let tr = document.getElementById(`trService${item.id}`);
        tr.querySelectorAll('td')[4].textContent = item.startHour;
        tr.querySelectorAll('td')[5].textContent = item.endHour;
        finalDuration += item.duration;
        total += item.cost;
        return item;
    });
    document.getElementById(`${ids.citationHourEnd}`).value = dayjs(startHour, 'HH:mm').add(finalDuration, 'minute').format('HH:mm');
    document.querySelector(`#${ids.totalCost} span`).textContent = `$ ${total}`;
    let servicesDetailsTableTbody = document.querySelector(`#${ids.id} tbody`);
    let tr = servicesDetailsTableTbody.querySelector(`#trService${id}`);
    servicesDetailsTableTbody.removeChild(tr);
}
const checkScheduleAvailable = async (service, modalType) => {
    let thisDate;
    if (modalType == 'edit') {
        thisDate = document.getElementById('editcitationDate').value;
    } else {
        thisDate = document.getElementById('citationDate').value;
    }
    let schedules = await getScheduleByRangeDates(thisDate, thisDate);
    CCitation.schedules = schedules;
    schedules = CCitation.schedules.filter(item => item.date == thisDate);

    let isAvailable = true;
    if (schedules && schedules.length > 0) {
        for (schedule of schedules) {
            for (range of schedule.rangeSchedules) {
                let initialHour = dayjs(service.startHour, 'HH:mm');
                let finalHour = dayjs(service.endHour, 'HH:mm');

                if (dayjs(range.startHour, 'HH:mm').isSame(initialHour) || dayjs(range.startHour, 'HH:mm').isBetween(initialHour, finalHour) || dayjs(range.endHour, 'HH:mm').isBetween(initialHour, finalHour)) {
                    isAvailable = false;
                    return false;
                }
            }
        }
    }
    return isAvailable;
}
const saveCitation = () => {
    let thisModalBtnClose = document.querySelector('#modalAddCitation button.btn-close');

    let citationDate = document.getElementById('citationDate')?.value;
    let startHour = document.getElementById('citationHourInit')?.value;
    let endHour = document.getElementById('citationHourEnd')?.value;
    let idClient = document.getElementById('inputClient')?.getAttribute('data-id');
    let idAsigned = document.getElementById('inputAsigned')?.getAttribute('data-id');
    let observationsCitation = document.getElementById('observationsCitation')?.value || '';

    let contains = citationDate && startHour && endHour && idClient && idAsigned;

    if (!contains) {
        vNotify.error({ text: 'Hay Campos vacios que son necesarios', title: 'Campos Requeridos' });
        thisModalBtnClose.click();
        return;
    }
    if (tempArrayServices.length == 0) {
        vNotify.error({ text: 'Debe agregar al menos un servicio', title: 'Campos Requeridos' });
        thisModalBtnClose.click();
        return;
    }
    tempArrayServices = tempArrayServices.map(item => {
        return {
            id: item.id,
            description: document.getElementById(`inputObservation${item.id}`)?.value || ''
        };
    });

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
            description: observationsCitation,
            dataShedule: {
                startHour: dayjs(startHour, 'HH:mm').format('HH:mm:ss'),
                endHour: dayjs(endHour, 'HH:mm').format('HH:mm:ss'),
                date: citationDate
            },
            services: tempArrayServices
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
                thisModalBtnClose.click();
            }
        });
}
