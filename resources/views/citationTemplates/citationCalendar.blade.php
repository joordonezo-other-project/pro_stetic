<div class="row">
    <div class="col-lg-4 col-md-4">
        <div class="container mb-2 centerContent">
            <div class="row">
                <div class="col-lg-12 col-md-12">
                    <div class="input-group">
                        <button class="btn btn-primary" onclick="navigateCalendar('previous')"><i
                                class="bi bi-arrow-left-short"></i></button>
                        <label id="labelMonth" class="form-control text-center fw-bold">
                            <!--by controller-->
                        </label>
                        <button class="btn btn-primary" onclick="navigateCalendar('next')"><i
                                class="bi bi-arrow-right-short"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mb-2">
            <table class="table" id="calendarTable">
                <caption>Calendario</caption>
                <thead class="table-light">
                    <tr>
                        <th scope="col" class="text-center">DO</th>
                        <th scope="col" class="text-center">LU</th>
                        <th scope="col" class="text-center">MA</th>
                        <th scope="col" class="text-center">MI</th>
                        <th scope="col" class="text-center">JU</th>
                        <th scope="col" class="text-center">VI</th>
                        <th scope="col" class="text-center">SA</th>
                    </tr>
                </thead>
                <tbody>
                    <!--By js controller-->
                </tbody>
            </table>
        </div>
    </div>
    <div class="col-lg-8 col-md-8">
        <div id="thisDayContainer" class="container mb-2">
        </div>
    </div>
</div>
