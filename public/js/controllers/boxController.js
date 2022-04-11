const getAllBox = () => {
    fetch('./getAllBox', {
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
                    getCountersOfBox();
                } else {
                    vNotify.error({ text: message, title: title });
                }
                let boxTransactionTable = document.getElementById('boxTransactionTable');
                let tbody = boxTransactionTable.querySelector('tbody');
                if (responseData) {
                    responseData = responseData.sort((a, b) => a.id < b.id ? 1 : -1);
                    tbody.innerHTML = '';
                    responseData.forEach(element => {
                        let tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td class="text-center">${element.id}</td>
                            <td class="text-center">${element.description}</td>
                            <td class="text-center"><div class="d-inline-flex">${i18(element.type)} <span class="d-flex justify-content-center badge mb-1 col-5 ${element.type}"> ${element.type == 'income' ? '<i class="bi bi-arrow-bar-up"></i>':'<i class="bi bi-arrow-bar-down"></i>'}</span></div></td>
                            <td class="text-center">$${element.quantity}</td>
                            `;
                        tbody.appendChild(tr);
                    });

                }
            }
        });
}

const saveNewBoxTransaction = () => {
    let boxDescription = document.getElementById('boxDescription').value;
    let boxType = document.getElementById('boxType').value;
    let boxQuantity = document.getElementById('boxQuantity').value;

    if (!boxDescription || !boxType || !boxQuantity) {
        vNotify.error({ text: 'Debe completar todos los campos', title: 'Error' });
        return;
    }
    let thisModalBtnClose = document.querySelector('#modalNewTransaction button.btn-close');
    fetch('./saveNewBoxTransaction', {
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
            description: boxDescription,
            type: boxType,
            quantity: boxQuantity
        })
    }).then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                    getAllBox();
                } else {
                    vNotify.error({ text: message, title: title });
                }
                thisModalBtnClose.click();
            }
        });
}

const getCountersOfBox = () => {
    fetch('./getCountersOfBox', {
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
                const { message, title, responseData, status } = data;
                if (status === true) {
                    //vNotify.success({ text: message, title: title });
                } else {
                    vNotify.error({ text: message, title: title });
                }
                let countersOfBox = document.getElementById('countersOfBox');
                if (responseData) {
                    countersOfBox.innerHTML = `
                        <div class="row mb-2">
                            <div class="col-4 text-center"><b>Ingresos Totales: </b>$${responseData.income}</div>
                            <div class="col-4 text-center"><b>Egresos Totales: </b>$${responseData.egress}</div>
                            <div class="col-4 text-center"><b>Balance General: </b>$${responseData.balance}</div>
                        </div>
                            `;

                }
            }
        });
}