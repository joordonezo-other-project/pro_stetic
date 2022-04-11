const getAllParameter = () => {
    fetch('./getAllParameter', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
    }).then(response => response.json())
        .then(data => {
            if (!data.error) {
                let { message, title, responseData, status } = data;
                if (status === true) {
                    //vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                let boxTransactionTable = document.getElementById('systemParameterTable');
                let tbody = boxTransactionTable.querySelector('tbody');
                if (responseData) {
                    responseData = responseData.sort((a, b) => a.id < b.id ? 1 : -1);
                    tbody.innerHTML = '';
                    responseData.forEach(element => {
                        let tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td class="text-center">${element.id}</td>
                            <td class="text-center">${element.name}</td>
                            <td class="text-center">${element.value}</td>
                            <td class="text-center">
                            <button class="btn btn-outline-primary btn-sm" onclick="deleteParameter(${element.id})" title="Eliminar Parametro"><i class="bi bi-trash"></i></button>
                            </td>
                            `;
                        tbody.appendChild(tr);
                    });

                }
            }
        });
}
const saveNewParameter = () => {
    let nameParameter = document.getElementById('nameParameter').value;
    let valueParameter = document.getElementById('valueParameter').value;

    if (!nameParameter || !valueParameter) {
        vNotify.error({ text: 'Debe ingresar todos los datos', title: 'Error' });
        return;
    }

    let thisModalBtnClose = document.querySelector('#modalAddParameter button.btn-close');
    fetch('./saveNewParameter', {
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
            name: nameParameter,
            value: valueParameter
        })
    }).then(response => response.json())
        .then(data => {
            if (!data.error) {
                let { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                    getAllParameter();
                    document.getElementById('nameParameter').value = '';
                    document.getElementById('valueParameter').value = '';
                } else {
                    vNotify.error({ text: message, title: title });
                }
                thisModalBtnClose.click();
            }
        });

}
const deleteParameter = (id) => {
    fetch('./deleteParameter', {
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
    }).then(response => response.json())
        .then(data => {
            if (!data.error) {
                let { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                    getAllParameter();
                } else {
                    vNotify.error({ text: message, title: title });
                }
            }
        });
}