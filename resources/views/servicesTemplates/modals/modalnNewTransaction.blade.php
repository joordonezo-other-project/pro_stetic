<!-- Modal -->
<div class="modal fade" id="modalNewTransaction" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <label for="boxDescription"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Descripción') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input id="boxDescription" type="text" class="form-control" required
                                            autofocus>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="boxType"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Tipo') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <select id="boxType" class="form-control">
                                            <option value="income">Ingreso</option>
                                            <option value="egress">Egreso</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="boxQuantity"
                                    class="col-md-4 col-form-label text-md-end">{{ __('Cantidad') }}</label>
                                <div class="col-md-8">
                                    <div class="input-group">
                                        <input id="boxQuantity" type="number" class="form-control" value="0" required autofocus>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="saveNewBoxTransaction()"><i class="bi bi-save"></i> Guardar</button>
            </div>
        </div>
    </div>
</div>
