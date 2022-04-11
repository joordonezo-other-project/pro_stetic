

const showPayCitationDetails = async (citationId) => {
    let citation = currentCitations.find(citation => citation.id === citationId);

    console.log(citation)
    let citationsDetails = await getCitationDetailsById(citationId);
    paintDetailsInModal(citationsDetails, citation);
    console.log(citationsDetails)

}
const paintDetailsInModal = async (citationsDetails, citation) => {
    let table = document.getElementById('modalPayCitationsDetailsTable');
    let tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    let detailsService = document.getElementById('payDetailsService');
    detailsService.innerHTML = `
                    <input type="hidden" id="payCitationId" value="${citation.id}">
                    <div class="input-group-text"><b>Asignado a: </b> ${citation.nameWorker} ${citation.lastnameWorker}</div>
                    <div class="input-group-text"><b>Cliente: </b> ${citation.nameUser} ${citation.lastnameUser}</div>
                    <div class="input-group-text"><b>Estado: </b> ${i18(citation.status)}</div>
                    `;
    citationsDetails.forEach(element => {
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
    let iva = 0;
    let totalIVA = 0;
    let subtotal = 0;
    let total = 0;
    let paramIva = await getParameterByName('iva');
    if (paramIva) {
        iva = Number(paramIva)
    }
    citationsDetails.forEach(element => {
        totalIVA += element.cost * (iva / 100);
        subtotal += element.cost;
    });
    total = totalIVA + subtotal;
    let totals = document.getElementById('modalPayCitationsDetailsTotals');
    totals.innerHTML = `
                    <div class="row">
                        <div class="col-lg-4 offset-lg-8 align-self-end">
                            <div class="input-group-text mb-2"><b>Subtotal: </b> $${subtotal}</div>
                            <div class="input-group-text mb-2"><b>IVA ${iva}%: </b> $${totalIVA}</div>
                            <div class="input-group-text mb-2"><b>TOTAL: </b> $${total}</div>
                        </div>
                        <select class="form-control" id="typeOfPayment">
                            <option value="cash">Efectivo</option>
                            <option value="creditCard">Tarjeta de Crédito</option>
                            <option value="debitCard">Tarjeta de Débito</option>
                            <option value="transfer">Transferencia</option>
                        </select>
                    </div>
                    `;


}

const payService = () => {
    let payCitationId = document.getElementById('payCitationId').value;
    let typeOfPayment = document.getElementById('typeOfPayment').value;

    let thisModalBtnClose = document.querySelector('#modalPayCitation button.btn-close');

    fetch('./payService', {
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
            payCitationId: Number(payCitationId),
            type: typeOfPayment
        })
    })
        .then(response => response.json())
        .then(data => {
            if (!data.error) {
                const { message, title, responseData, status } = data;
                if (status === true) {
                    vNotify.success({ text: message, title: title });
                    thisModalBtnClose.click();
                    getAllCitations();
                } else {
                    vNotify.error({ text: message, title: title });
                }
            }
        });

}
