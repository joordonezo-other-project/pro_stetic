<ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
            type="button" role="tab" aria-controls="pills-home" aria-selected="true"><i class="bi bi-house"></i> Inicio</button>
    </li>
    @if (Auth::user()->idRole == 1 || Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-production-tab" data-bs-toggle="pill"
                data-bs-target="#pills-production" type="button" role="tab" aria-controls="pills-production"
                aria-selected="false" onclick="getAllCitations()"><i class="bi bi-person-rolodex"></i> Citas</button>
        </li>
    @endif
    @if (Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-services-tab" data-bs-toggle="pill"
                data-bs-target="#pills-services" type="button" role="tab" aria-controls="pills-services"
                aria-selected="false" onclick="getAllServices()"><i class="bi bi-journal-text"></i> Servicios</button>
        </li>
    @endif
     @if (Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-box-tab" data-bs-toggle="pill" data-bs-target="#pills-box"
                type="button" role="tab" aria-controls="pills-box" aria-selected="false"
                onclick="getAllBox()"><i class="bi bi-currency-dollar"></i> Caja</button>
        </li>
    @endif
    @if (Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-stock-tab" data-bs-toggle="pill" data-bs-target="#pills-stock"
                type="button" role="tab" aria-controls="pills-stock" aria-selected="false"
                onclick=""><i class="bi bi-boxes"></i> Inventario</button>
        </li>
    @endif
    @if (Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-providers-tab" data-bs-toggle="pill"
                data-bs-target="#pills-providers" type="button" role="tab" aria-controls="pills-providers"
                aria-selected="false" onclick=""><i class="bi bi-globe"></i> Proveedores</button>
        </li>
    @endif
    @if (Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-liquidation-tab" data-bs-toggle="pill"
                data-bs-target="#pills-liquidation" type="button" role="tab" aria-controls="pills-liquidation"
                aria-selected="false" onclick=""><i class="bi bi-currency-exchange"></i> Liquidación</button>
        </li>
    @endif
    @if (Auth::user()->idRole == 1 || Auth::user()->idRole == 1 || Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-users-tab" data-bs-toggle="pill" data-bs-target="#pills-users"
                type="button" role="tab" aria-controls="pills-users" aria-selected="false"><i class="bi bi-people"></i> Usuarios</button>
        </li>
    @endif
    @if (Auth::user()->idRole == 1 || Auth::user()->idRole == 1 || Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-reports-tab" data-bs-toggle="pill" data-bs-target="#pills-reports"
                type="button" role="tab" aria-controls="pills-reports" aria-selected="false"><i class="bi bi-bar-chart-line"></i> Reportes y Estadísticas</button>
        </li>
    @endif
</ul>
