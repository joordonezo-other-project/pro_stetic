<div class="row justify-content-center">
            <button data-bs-toggle="modal" data-bs-target="#modalAddParameter" class="btn btn-primary mb-2 col-4"
                title="Nuevo servicio"><i class="bi bi-plus"></i>Nuevo Parametro</button>
    <div class="col-lg-12">
        <div class="card">
            <div class="card-header">{{ __('Parametros Del Sistema') }}</div>
            <table class="table" id="systemParameterTable">

                <caption>Tabla de Parametros</caption>
                <thead class="table-light">
                    <tr>
                        <th scope="col" class="text-center">#</th>
                        <th scope="col" class="text-center">Nombre</th>
                        <th scope="col" class="text-center">valor</th>
                        <th scope="col" class="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <!--to-do from javaScript controller-->
                </tbody>
            </table>
            @include('configTemplates.modals.modalAddParameter')
        </div>
    </div>
</div>
