@extends('layouts.app')

@section('content')
    <div class="container">
        <a class="btn btn-outline-primary mb-2" type="button" href="{{ route('home') }}"><i class="bi bi-house"></i></a>
        @include('home.navbarConfig')
        @include('home.panelsConfig')
    </div>
@endsection
