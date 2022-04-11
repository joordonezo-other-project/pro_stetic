<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Bellas Estudio</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

    <!--icono-->
    <link rel="icon" href="./img/bellas2.png">

    <style>
        body {
            font-family: 'Nunito', sans-serif;
            padding: 0;
            margin: 0;
        }

        .textWelcome {
            font-size: 1.5em;
            font-weight: 700;
            color: #d33b77;
            position: absolute;
            top: 5%;
            left: 30%;
            width: max-content;
        }

        .linksWelcome {
            position: absolute;
            width: 100%;
            left: 90%;
            float: Right;
            padding: 2%;
        }
        .overflow-hidden{
            overflow: hidden !important;
        }

    </style>
</head>

<body class="overflow-hidden">
    <div class="row">
        @if (Route::has('login'))
            <div class="linksWelcome">
                @auth
                    <a href="{{ url('/home') }}" class="btn">Home</a>
                @else
                    <a href="{{ route('login') }}" class="btn">Iniciar Sesión</a>

                @endauth
            </div>
        @endif
        <div class="container">
            <div class="flex flex-col justify-center">
                <div class="container">
                    <img src="{{ url('img/bellas1.png') }}" alt="Imagen bellas estudio" width="100%" heigth="100%">
                </div>
                <p>
                <h1>
                    <span class="bellas-bold textWelcome">
                        ¡Bienvenido a Bellas Estudio!
                    </span>
                </h1>
                </p>
            </div>
        </div>

</body>

</html>
