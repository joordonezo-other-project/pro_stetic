<!-- Modal -->
<div class="modal fade" id="modalEditCitation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Editar Cita</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3 justify-content-around">
                    <label for="citationDate" class="col-md-1 col-form-label ">{{ __('Id') }}</label>
                    <div class="col-md-1">
                        <div class="input-group">
                            <input id="citationId" type="text" class="form-control" disabled>
                        </div>
                    </div>
                    <label for="citationDate"
                        class="col-md-auto col-form-label text-md-end">{{ __('Fecha Cita') }}</label>
                    <div class="col-md-auto">
                        <div class="input-group">
                            <input id="editcitationDate" type="date" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                    <label for="citationHourInit"
                        class="col-md-auto col-form-label text-md-end">{{ __('Hora Inicial') }}</label>
                    <div class="col-md-auto">
                        <div class="input-group">
                            <input id="editcitationHourInit" type="time" class="form-control" autofocus disabled
                                required>
                        </div>
                    </div>
                    <label for="citationHourEnd"
                        class="col-md-auto col-form-label text-md-end">{{ __('Hora Final') }}</label>
                    <div class="col-md-auto">
                        <div class="input-group">
                            <input id="editcitationHourEnd" type="time" class="form-control" autofocus disabled
                                required>
                        </div>
                    </div>
                </div>

                <label for="basic-url" class="form-label">Asignación de cita</label>
                <div class="row mb-3">
                    <div class="input-group">
                        <ul id="editlistOfPeople" class="list-group  col-md-6 offset-md-3 mb-2"></ul>
                    </div>
                    <div class="col-md-6 offset-md-3">
                        <label for="editlistOfPeople"
                            class="col-md-4 col-form-label text-md-end">{{ __('Busqueda de personas') }}</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input id="editnamePeopleSearch" type="text" class="form-control"
                                placeholder="Busque por Nombre o Apellido" onkeypress="searchPeopleByName('edit')">
                        </div>
                    </div>
                </div>
                <div class="row mb-3 justify-content-around">
                    <label for="inputAsigned"
                        class="col-md-2 col-form-label text-md-end">{{ __('Asignado A') }}</label>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input id="editinputAsigned" type="text" class="form-control" data-id="" required
                                autofocus>
                        </div>
                    </div>
                    <label for="inputClient" class="col-md-2 col-form-label text-md-end">{{ __('Cliente') }}</label>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input id="editinputClient" type="text" class="form-control" data-id="" required
                                autofocus disabled>
                        </div>
                    </div>
                </div>
                <label for="basic-url" class="form-label">Agregar Servicios</label>
                <div class="row mb-3 justify-content-around">
                    <label for="selectServiceCitation"
                        class="col-md-4 col-form-label text-md-end">{{ __('Servicios Disponibles') }}</label>
                    <div class="col-md-8">
                        <div class="input-group" id="editselectServiceCitationContainer">
                            <!--from js controller-->
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <table class="table-light" id="editservicesDetailsTable">
                        <caption>Detalle de citas</caption>
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">Id</th>
                                <th scope="col" class="text-center">Servicio</th>
                                <th scope="col" class="text-center">Duración</th>
                                <th scope="col" class="text-center">Precio</th>
                                <th scope="col" class="text-center">Hora Inicio</th>
                                <th scope="col" class="text-center">Hora Fin</th>
                                <th scope="col" class="text-center">Observaciones</th>
                                <th scope="col" class="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!--from js controller-->
                            <tr id="edittotalCost">
                                <td>Total: </td>
                                <td>
                                    <span class="text-center fw-bold">
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row mb-3">
                    <label for="observationsCitation"
                        class="col-md-4 col-form-label text-md-end">{{ __('Observaciones') }}</label>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input id="editobservationsCitation" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveCitation()"><i class="bi bi-save"></i>
                    Guardar</button>
            </div>
        </div>
    </div>
</div>
