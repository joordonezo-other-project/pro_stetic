<!-- Modal -->
<div class="modal fade" id="modalAddCitation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Cita</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row mb-3">
                    <label for="citationDate"
                        class="col-md-4 col-form-label text-md-end">{{ __('Fecha Cita') }}</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input id="citationDate" type="date" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="citationHourInit"
                        class="col-md-4 col-form-label text-md-end">{{ __('Hora Inicial') }}</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input id="citationHourInit" type="time" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="citationHourEnd"
                        class="col-md-4 col-form-label text-md-end">{{ __('Hora Final') }}</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input id="citationHourEnd" type="time" class="form-control" autofocus disabled required>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="selectServiceCitation"
                        class="col-md-4 col-form-label text-md-end">{{ __('Servicio') }}</label>
                    <div class="col-md-6">
                        <div class="input-group" id="selectServiceCitationContainer">
                            <!--from js controller-->
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputAsigned"
                        class="col-md-4 col-form-label text-md-end">{{ __('Asignado A') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputAsigned" type="text" class="form-control" data-id="" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="inputClient" class="col-md-4 col-form-label text-md-end">{{ __('Cliente') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputClient" type="text" class="form-control" data-id="" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-12">
                        <div class="input-group">
                            <ul id="listOfPeople" class="list-group  col-md-12 mb-2"></ul>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input id="namePeopleSearch" type="text" class="form-control"
                                placeholder="Busque por Nombre o Apellido" onkeypress="searchPeopleByName()">
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="observationsCitation" class="col-md-4 col-form-label text-md-end">{{ __('Observaciones') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="observationsCitation" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveCitation()"><i
                        class="bi bi-save"></i>Guardar</button>
            </div>
        </div>
    </div>
</div>
