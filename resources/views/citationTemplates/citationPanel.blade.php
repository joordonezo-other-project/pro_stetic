<ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-citation-table-tab" data-bs-toggle="pill"
            data-bs-target="#pills-citation-table" type="button" role="tab" aria-controls="pills-citation-table"
            aria-selected="true" onclick="getAllCitations()"><i class="bi bi-table"></i> Tabla</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-citation-calendar-tab" data-bs-toggle="pill"
            data-bs-target="#pills-citation-calendar" type="button" role="tab" aria-controls="pills-citation-calendar"
            aria-selected="true" onclick="updateCalendar()"><i class="bi bi-calendar-week"></i> Calendario</button>
    </li>
</ul>
<div class="tab-content" id="pills-tabContent">


    <div class="tab-pane fade show active" id="pills-citation-table" role="tabpanel"
        aria-labelledby="pills-citation-table-tab">

        <table class="table" id="citationTable">

            <caption>Tabla de Citas</caption>
            <thead class="table-light">
                <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col" class="text-center">Fecha creación</th>
                    <th scope="col" class="text-center">Descripción</th>
                    <th scope="col" class="text-center">Asignado a</th>
                    <th scope="col" class="text-center">Cliente</th>
                    <th scope="col" class="text-center">Fecha Cita</th>
                    <th scope="col" class="text-center">Estado</th>
                    <th scope="col" class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <!--to-do from javaScript controller-->
            </tbody>
        </table>

        @include('citationTemplates.modals.modalCitationsDetails')

        @include('citationTemplates.modals.modalEditCitation')

        @include('citationTemplates.modals.modalPayCitation')

    </div>
    <div class="tab-pane fade show" id="pills-citation-calendar" role="tabpanel"
        aria-labelledby="pills-citation-calendar-tab">
        @include('citationTemplates.modals.modalAddCitation')

        @include('citationTemplates.citationCalendar')

    </div>
</div>
