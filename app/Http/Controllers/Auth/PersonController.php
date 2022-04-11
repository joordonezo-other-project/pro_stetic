<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class PersonController extends Controller
{
    public function getAllRole()
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo recuperar los datos',
            'responseData' => [],
        ];
        $role = DB::table('role')->get();
       
        if (isset($role)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos Obtenidos';
            $response['responseData'] = $role;
        }
        return response()->json($response);
    }

    public function searchAddressByContent(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo recuperar los datos',
            'responseData' => [],
        ];
        $content = $request->address;
        $address = DB::table('address')
            ->where('description', 'like', '%' . $content . '%')
            ->where('status', '=', 'active')
            ->get();
        if (isset($address)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos Obtenidos';
            $response['responseData'] = $address;
        }
        return response()->json($response);
    }
}
