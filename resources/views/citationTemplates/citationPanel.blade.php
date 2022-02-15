<button data-bs-toggle="modal" data-bs-target="#modalAddCitation" class="btn btn-primary mb-2"><i
        class="bi bi-plus"></i> Crear Cita</button>

@include('citationTemplates.modals.modalAddCitation')

<table class="table" id="citationTable">
    <caption>Tabla de Citas</caption>
    <thead class="table-light">
        <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Descripción</th>
            <th scope="col">Asignado a</th>
            <th scope="col">Cliente</th>
            <th scope="col">Estado</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody>
        <!--to-do from javaScript controller-->
    </tbody>
</table>

@include('citationTemplates.modals.modalCitationsDetails')
