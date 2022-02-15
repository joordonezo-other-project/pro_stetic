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
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Nombre') }}</label>
                    <div class="col-md-6">
                        <div class="input-group">
                            <input id="inputNewName" type="text" class="form-control" required autofocus>
                        </div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="cantidad" class="col-md-4 col-form-label text-md-end">{{ __('Referencia') }}</label>
                    <div class="col-md-12">
                        <div class="input-group">
                            <ul id="listProductNameSearchSell" class="list-group  col-md-12 mb-2"></ul>
                        </div>
                        <div class="input-group">
                            <span class="input-group-text"><img src="img/icos/search.svg"></span>
                            <input id="productReferenceSearch" type="text" class="form-control"
                                placeholder="Referencia" onkeypress="searchProductSellByName()">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
