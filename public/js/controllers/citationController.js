
window.citationControllerVar = {};
const { citationControllerVar } = window;

citationControllerVar.currentMonth = new Date().getMonth();
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
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
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
                            <td><b>Fecha:</b> ${element.date} <b>Inicio:</b> ${element.startHour} <b>Fin:</b> ${element.endHour}</td>
                            <td>${i18(element.status)}</td>
                            <td><button data-bs-toggle="modal" data-bs-target="#modalCitationsDetails" class="btn btn-outline-primary" onclick="showCitationDetails(${element.id})" title="Ver el detalle de la cita"><i class="bi bi-eye"></i>Detalle</button></td>
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
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                if (responseData) {
                    let table = document.getElementById('modalCitationsDetailsTable');
                    let tbody = table.getElementsByTagName('tbody')[0];
                    tbody.innerHTML = '';

                    let detailsService = document.getElementById('detailsService');
                    detailsService.innerHTML = `
                    <div class="input-group-text"><b>Asignado a: </b> ${citation.nameWorker} ${citation.lastnameWorker}</div>
                    <div class="input-group-text"><b>Cliente: </b> ${citation.nameUser} ${citation.lastnameUser}</div>
                    <div class="input-group-text"><b>Comentario: </b>${responseData.observations}</div>
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

const navigateCalendar = (direction) => {
    if (direction === 'next' && citationControllerVar.currentMonth < 12) {
        citationControllerVar.currentMonth++;
        citationControllerVar.currentMonth == 12 ? 
        citationControllerVar.currentMonth = 0 : citationControllerVar.currentMonth;
    } else if (direction === 'previous' && citationControllerVar.currentMonth >= 0) {
        citationControllerVar.currentMonth--;
        citationControllerVar.currentMonth == -1 ?
        citationControllerVar.currentMonth = 11 : citationControllerVar.currentMonth;
    }
    updateCalendar();
}
const updateCalendar = async () => {

    let currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), citationControllerVar.currentMonth, currentDate.getDate());
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
    let startDate = await getDateFormat(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    let endDate = await getDateFormat(neutralDate.getFullYear(), neutralDate.getMonth(), neutralDate.getDate());
    let schedules = await getScheduleByRangeDates(startDate, endDate);
    citationControllerVar.schedules = schedules;
    for (i = 0; i < 6; i++) {
        let tr = document.createElement('tr');
        for (j = 0; j < 7; j++) {
            let td = document.createElement('td');
            if ((i == 0 && j > dayOfWeek - 1) || (i > 0 && neutralDate.getDate() > currenDay)) {
                currenDay++;
                let dateByDay = await getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay);
                let dateByDay2 = await getDateFormat(currentDate.getFullYear(), currentDate.getMonth(), currenDay + 1);
                let rangeSchedules = schedules.filter(item => item.date == dateByDay);
                rangeSchedules = rangeSchedules.map(item => {
                    return item.rangeSchedules[0];
                });

                let citation = {
                    dateByDay,
                    rangeSchedules
                }
                let dayTable = await buildTableDay(citation);
                let isToday = currenDay == currentDate.getDate() && new Date().getMonth() == currentDate.getMonth() && new Date().getFullYear() == currentDate.getFullYear();
                td.innerHTML = `
                <div class="container ">
                <div class="row justify-content-center ${dayjs(dateByDay2).isBefore(new Date()) ? 'none-click' : ''}">
                <span class="fw-bold text-center ${isToday ? 'badge bg-secondary' : ''}">${dateByDay} ${isToday ? 'Hoy' : ''}</span>
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
    citationControllerVar.servicesAvailables = services;
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
    let selectServices = document.createElement('div');
    selectServices.id = "selectServiceCitation";

    if (services.length > 0) {
        services.map(item => {
            selectServices.innerHTML += `
                        <div class="row mb-3">
                        <div class="input-group">
                        <label class="form-control">
                            ${item.name} | ${item.duration} Minutos | $ ${item.cost}
                        </label>
                        <button class="btn btn-outline-primary btn-sm" onclick="clickOptionService(${item.id})"><i class="bi bi-plus"></i> Agregar</button>
                        </div>
                        </div>
                        `;
        });
        contentSelect.appendChild(selectServices);
    }
}

let tempArrayServices = [];

const clickOptionService = (idService) => {
    let service = citationControllerVar.servicesAvailables.find(item => item.id == idService);
    let existService = tempArrayServices.find(item => item.id == idService);





    let startHour = document.getElementById('citationHourInit').value;
    if (!existService) {
        if (tempArrayServices.length > 0) {
            let lastService = tempArrayServices[tempArrayServices.length - 1];
            service.startHour = lastService.endHour;
            service.endHour = dayjs(service.startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
        } else {
            service.startHour = startHour;
            service.endHour = dayjs(startHour, 'HH:mm').add(service.duration, 'minute').format('HH:mm');
        }
        let isScheduleAvailable = checkScheduleAvailable(service);
        if (!isScheduleAvailable) {
            vNotify.error({ text: 'El servicio no esta disponible en el horario seleccionado', title: 'Citas Cruzadas' });
            return;
        } else {
            tempArrayServices.push(service);
        }
    } else
        return;

    let finalDuration = 0;
    let total = 0;
    tempArrayServices.forEach(item => {
        finalDuration += item.duration;
        total += item.cost;
    });
    document.getElementById('citationHourEnd').value = dayjs(startHour, 'HH:mm').add(finalDuration, 'minute').format('HH:mm');
    document.querySelector('#totalCost span').textContent = `$ ${total}`;
    let servicesDetailsTableTbody = document.querySelector('#servicesDetailsTable tbody');
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
    <td class="text-center"><button class="btn btn-outline-danger btn-sm" onclick="removeService(${service.id})"><i class="bi bi-trash"></i></button></td>
    `;
    servicesDetailsTableTbody.insertBefore(tr, document.getElementById('totalCost'));

}
const removeService = (id) => {
    tempArrayServices = tempArrayServices.filter(item => item.id != id);
    let startHour = document.getElementById('citationHourInit').value;
    let finalDuration = 0;
    let total = 0;
    tempArrayServices = tempArrayServices.map((item, index) => {
        if (index == 0) {
            item.startHour = startHour;
            item.endHour = dayjs(startHour, 'HH:mm').add(item.duration, 'minute').format('HH:mm');

        } else {
            let lastService = tempArrayServices[index - 1];
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
    document.getElementById('citationHourEnd').value = dayjs(startHour, 'HH:mm').add(finalDuration, 'minute').format('HH:mm');
    document.querySelector('#totalCost span').textContent = `$ ${total}`;
    let servicesDetailsTableTbody = document.querySelector('#servicesDetailsTable tbody');
    let tr = servicesDetailsTableTbody.querySelector(`#trService${id}`);
    servicesDetailsTableTbody.removeChild(tr);
}
const checkScheduleAvailable = (service) => {
    let thisDate = document.getElementById('citationDate').value;
    let schedules = citationControllerVar.schedules.filter(item => item.date == thisDate);

    let isAvailable = true;
    if (schedules && schedules.length > 0) {
        for (schedule of schedules) {
            for (range of schedule.rangeSchedules) {
                let initialHour = dayjs(service.startHour, 'HH:mm');
                let finalHour = dayjs(service.endHour, 'HH:mm');
                //let questionHour = dayjs();
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
