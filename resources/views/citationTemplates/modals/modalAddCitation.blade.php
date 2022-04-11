<!-- Modal -->
<div class="modal fade" id="modalAddCitation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Cita</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3 justify-content-around">
                    
                    <label for="citationDate"
                        class="col-md-auto col-form-label ">{{ __('Fecha Cita') }}</label>
                    <div class="col-md-auto">
                        <div class="input-group">
                            <input id="citationDate" type="date" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                    <label for="citationHourInit"
                        class="col-md-auto col-form-label ">{{ __('Hora Inicial') }}</label>
                    <div class="col-md-auto">
                        <div class="input-group">
                            <input id="citationHourInit" type="time" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                    <label for="citationHourEnd"
                        class="col-md-auto col-form-label ">{{ __('Hora Final') }}</label>
                    <div class="col-md-auto">
                        <div class="input-group">
                            <input id="citationHourEnd" type="time" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                </div>

                <label for="basic-url" class="form-label">Asignación de cita</label>
                <div class="row mb-3">
                    <div class="input-group">
                        <ul id="listOfPeople" class="list-group  col-md-6 offset-md-3 mb-2"></ul>
                    </div>
                    <div class="col-md-6 offset-md-3">
                        <label for="listOfPeople"
                            class="col-md-4 col-form-label text-md-end">{{ __('Busqueda de personas') }}</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input id="namePeopleSearch" type="text" class="form-control"
                                placeholder="Busque por Nombre o Apellido" onkeypress="searchPeopleByName()">
                        </div>
                    </div>
                </div>
                <div class="row mb-3 justify-content-around">
                    <label for="inputAsigned"
                        class="col-md-2 col-form-label text-md-end">{{ __('Asignado A') }}</label>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input id="inputAsigned" type="text" class="form-control" data-id="" required autofocus>
                        </div>
                    </div>
                    <label for="inputClient" class="col-md-2 col-form-label text-md-end">{{ __('Cliente') }}</label>
                    <div class="col-md-4">
                        <div class="input-group">
                            <input id="inputClient" type="text" class="form-control" data-id="" required autofocus>
                        </div>
                    </div>
                </div>
                <label for="basic-url" class="form-label">Agregar Servicios</label>
                <div class="row mb-3 justify-content-around">
                    <label for="selectServiceCitation"
                        class="col-md-4 col-form-label text-md-end">{{ __('Servicios Disponibles') }}</label>
                    <div class="col-md-8">
                        <div class="input-group" id="selectServiceCitationContainer">
                            <!--from js controller-->
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <table class="table-light" id="servicesDetailsTable">
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
                            <tr id="totalCost">
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
                            <input id="observationsCitation" type="text" class="form-control" required autofocus>
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
