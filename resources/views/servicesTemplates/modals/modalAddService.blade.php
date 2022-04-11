<!-- Modal -->
<div class="modal fade" id="modalAddService" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Servicio</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalAddServiceContent" class="row mb-3 ">
                    <div class="input-group justify-content-center">
                        <div class="input-group justify-content-center mb-2">
                            <div class="row mb-3">
                                <label for="nameService"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input id="nameService" type="text" class="form-control" required autofocus>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="descriptionService"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Descripción') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input id="descriptionService" type="text" class="form-control" required
                                            autofocus>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="durationService"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Duración Minutos') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input id="durationService" type="number" class="form-control" value="0" required
                                            autofocus>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="costService"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Costo') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input id="costService" type="number" class="form-control" value="0" required autofocus>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveNewService()"><i class="bi bi-save"></i> Guardar</button>
            </div>
        </div>
    </div>
</div>
