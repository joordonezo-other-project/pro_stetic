<!-- Modal -->
<div class="modal fade" id="modalPayCitation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Generar Pago</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="modalPayCitationsDetailsContent" class="row mb-3 ">
                    <div class="input-group justify-content-center">
                        <div class="input-group justify-content-center mb-2" id="payDetailsService">
                            <!--to-do from javaScript controller-->
                        </div>
                        <table class="table" id="modalPayCitationsDetailsTable">
                            <caption>Tabla Detalle de Cita</caption>
                            <thead class="table-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Duración</th>
                                    <th scope="col">Costo</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!--to-do from javaScript controller-->
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="modalPayCitationsDetailsTotals" class="row mb-3 ">
                                <!--to-do from javaScript controller-->
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="payService()"><i
                            class="bi bi-currency-dollar"></i> Cobrar</button>
                </div>
            </div>
        </div>
    </div>
</div>
