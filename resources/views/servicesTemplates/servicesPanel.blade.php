<button data-bs-toggle="modal" data-bs-target="#modalAddService" class="btn btn-primary mb-2" title="Nuevo servicio"><i
        class="bi bi-plus"></i>Nuevo Servicio</button>

<table class="table" id="servicesTable">

    <caption>Tabla de Servicios</caption>
    <thead class="table-light">
        <tr>
            <th scope="col" class="text-center">#</th>
            <th scope="col" class="text-center">Nombre</th>
            <th scope="col" class="text-center">Descripción</th>
            <th scope="col" class="text-center">Duración</th>
            <th scope="col" class="text-center">Costo</th>
            <th scope="col" class="text-center">Acciones</th>
        </tr>
    </thead>
    <tbody>
        <!--to-do from javaScript controller-->
    </tbody>
</table>

@include('servicesTemplates.modals.modalAddService')

@include('servicesTemplates.modals.modalEditService')
