<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class CitationController extends Controller
{

    public function getAllCitations()
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
        ];
        $citations = DB::table('citation')
            ->join('users as uw', 'citation.idWorker', '=', 'uw.id')
            ->join('users as uu', 'citation.idUser', '=', 'uu.id')
            ->select('citation.*', 'uw.name as nameWorker', 'uw.lastName as lastnameWorker', 'uu.name as nameUser', 'uu.lastName as lastnameUser')
            ->get();
        if (isset($citations)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $citations;
        }
        return response()->json($response);
    }

    public function getCitationDetails(Request $request)
    {
        $id = $request->id;
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
            'o' => Date('Y-m-d H:i:s'),
        ];
        $citationDetails = DB::table('citationDetail')
            ->select('idService', 'description')
            ->first();
            
        $services = DB::table('service')
            ->where('id', '=', $citationDetails->idService)
            ->get();
            
        $citationDetails->services = $services;

        if (isset($citationDetails)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $citationDetails;
        }
        return response()->json($response);
    }
}
