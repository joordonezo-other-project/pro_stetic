<button data-bs-toggle="modal" data-bs-target="#modalNewTransaction" class="btn btn-primary mb-2"
    title="Nueva Transacción"><i class="bi bi-arrow-left-right"></i> Nueva Transacción</button>
<div id="countersOfBox">
    <!--to-do from javaScript controller-->
</div>
<table class="table" id="boxTransactionTable">

    <caption>Caja</caption>
    <thead class="table-light">
        <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center">Descripción</th>
            <th scope="col" class="text-center">Tipo</th>
            <th scope="col" class="text-center">Cantidad</th>
        </tr>
    </thead>
    <tbody>
        <!--to-do from javaScript controller-->
    </tbody>
</table>

@include('servicesTemplates.modals.modalnNewTransaction')
