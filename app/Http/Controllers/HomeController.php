<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        
        return view('home');
        
    }
    public function config()
    {
        
        return view('config');
        
    }

    public function getParameterByName(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener el parametro "'.$request->name.'"',
            'responseData' => [],
        ];

        $name = $request->name;
        $parameter = DB::table('variable')
        ->select('value')
        ->where('name', $name)->first();

        if (isset($parameter)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $parameter;
        }
        return response()->json($response);
    }

    public function getAllParameter(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los parametros',
            'responseData' => [],
        ];

        $parameters = DB::table('variable')
        ->get();

        if (isset($parameters)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $parameters;
        }
        return response()->json($response);
    }

    public function saveNewParameter(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo guardar el parametro "'.$request->name.'"',
            'responseData' => [],
        ];

        $name = $request->name;
        $value = $request->value;

        $parameter = DB::table('variable')
        ->select('name')
        ->where('name', $name)
        ->first();

        if (isset($parameter)) {
            $response['status'] = false;
            $response['title'] = '¡Error!';
            $response['message'] = 'El parametro "'.$name.'" ya existe';
        } else {
            $parameter = DB::table('variable')
            ->insertGetId([
                'name' => $name,
                'value' => $value,
            ]);

            if (isset($parameter)) {
                $response['status'] = true;
                $response['title'] = '¡Éxito!';
                $response['message'] = 'Parametro "'.$name.'" guardado';
            }
        }
        return response()->json($response);
    }

    public function deleteParameter(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo eliminar el parametro "'.$request->id.'"',
            'responseData' => [],
        ];

        $id = $request->id;

        $parameter = DB::table('variable')
        ->where('id', $id)
        ->delete();

            if (isset($parameter)) {
                $response['status'] = true;
                $response['title'] = '¡Éxito!';
                $response['message'] = 'Parametro "'.$id.'" eliminado';
            }
        
        return response()->json($response);
    }
}
