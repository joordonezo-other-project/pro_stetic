<div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
        Home proximamente...
    </div>

    <div class="tab-pane fade" id="pills-production" role="tabpanel" aria-labelledby="pills-production-tab">
        @include('citationTemplates.citationPanel')
    </div>

    <div class="tab-pane fade" id="pills-services" role="tabpanel" aria-labelledby="pills-services-tab">
        @include('servicesTemplates.servicesPanel')
    </div>

    <div class="tab-pane fade" id="pills-box" role="tabpanel" aria-labelledby="pills-box-tab">
        @include('servicesTemplates.servicesBox')
    </div>
    <div class="tab-pane fade" id="pills-stock" role="tabpanel" aria-labelledby="pills-stock-tab">
        Inventario proximamente...
    </div>

    <div class="tab-pane fade" id="pills-providers" role="tabpanel" aria-labelledby="pills-providers-tab">
        Proveedores proximamente...
    </div>

    <div class="tab-pane fade" id="pills-liquidation" role="tabpanel" aria-labelledby="pills-liquidation-tab">
        Liquidación proximamente...
    </div>

    <div class="tab-pane fade" id="pills-users" role="tabpanel" aria-labelledby="pills-users-tab">

        @if (Route::has('register'))
            <a href="{{ route('register') }}" class="btn btn-primary"><i class="bi bi-person-plus"></i> Nuevo
                Usuario</a>
        @endif

    </div>

    <div class="tab-pane fade" id="pills-reports" role="tabpanel" aria-labelledby="pills-reports-tab">
        Reportes proximamente...
    </div>
</div>
