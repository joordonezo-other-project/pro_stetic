<ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="pills-home-config-tab" data-bs-toggle="pill"
                data-bs-target="#pills-home-config" type="button" role="tab" 
                aria-controls="pills-home-config" aria-selected="true"><i class="bi house-fill"></i>Home</button>
        </li>
    @if (Auth::user()->idRole == 1 || Auth::user()->idRole == 1)
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="pills-system-parameters-tab" data-bs-toggle="pill"
                data-bs-target="#pills-system-parameters" type="button" role="tab" 
                aria-controls="pills-system-parameters" aria-selected="true" onclick="getAllParameter()"><i class="bi bi-list"></i> Parametros del Sistema</button>
        </li>
    @endif
</ul>
