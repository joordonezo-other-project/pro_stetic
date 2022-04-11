<?php

namespace App\Http\Controllers\Business;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{

    public function getAllServices()
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
        ];
        $services = DB::table('service')->get();
        if (isset($services)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $services;
        }
        return response()->json($response);
    }

    public function saveNewService(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo guardar el servicio',
            'responseData' => [],
        ];
        $service = DB::table('service')->insert([
            'name' => $request->name,
            'description' => $request->description,
            'duration' => $request->duration,
            'cost' => $request->cost,
        ]);
        if (isset($service)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Servicio guardado';
            $response['responseData'] = $service;
        }
        return response()->json($response);
    }

    public function deleteService(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo eliminar el servicio',
            'responseData' => [],
        ];
        $service = DB::table('service')->where('id', $request->id)->delete();
        if (isset($service)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Servicio eliminado';
            $response['responseData'] = $service;
        }
        return response()->json($response);
    }

    public function editService(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo editar el servicio',
            'responseData' => [],
        ];
        $service = DB::table('service')->where('id', $request->id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'duration' => $request->duration,
            'cost' => $request->cost,
        ]);
        if (isset($service)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Servicio editado';
            $response['responseData'] = $service;
        }
        return response()->json($response);
    }

    public function payService(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo pagar el servicio',
            'responseData' => [],
        ];
        $id = $request->payCitationId;
        $type = $request->type;
        $payment =  $this->buildPayment($id, $type);
        $service = DB::table('citation')->where('id', $id)->update([
            'status' => 'payment',
        ]);

        DB::table('payment')->insert($payment);

        DB::table('box')->insert([
            'description' => 'Pago de servicio',
            'type' => 'income',
            'quantity' => $payment['total'],
        ]);

        if (isset($service)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Servicio pagado';
            $response['responseData'] = $service;
        }
        return response()->json($response);
    }
    public function buildPayment($id, $type)
    {
        $citationDetails = DB::table('citationDetail')
        ->select('idService')
        ->where('idCitation', $id)->get();

        $iva = 0;
        $parameterIva = DB::table('variable')
        ->select('value')
        ->where('name', 'iva')->first();
        if (isset($parameterIva)) {
            $iva = $parameterIva;
        }

        $total = 0;
        $totalIva = 0;
        $idsServices = [];
        foreach ($citationDetails as $citationDetail) {
            array_push($idsServices, $citationDetail->idService);
        }
        $services = DB::table('service')
        ->select('cost')
        ->whereIn('id', $idsServices)->get();
        foreach ($services as $service) {
            $total += $service->cost;
            $totalIva += $service->cost * ($iva / 100);
        }
        $total = $total + $totalIva;
        return [
            'idCitation' => $id,
            'concept' => 'Pago de servicio',
            'date' => Date('Y-m-d H:i:s'),
            'type' => $type,
            'total' => $total,
        ];
    }

public function getAllBox(){
    $response = [
        'status' => false,
        'title' => '¡Error!',
        'message' => 'No se pudo obtener los datos',
        'responseData' => [],
    ];
    $box = DB::table('box')->get();
    if (isset($box)) {
        $response['status'] = true;
        $response['title'] = '¡Éxito!';
        $response['message'] = 'Datos obtenidos';
        $response['responseData'] = $box;
    }
    return response()->json($response);
}

    public function saveNewBoxTransaction(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo guardar la transacción',
            'responseData' => [],
        ];
        $box = DB::table('box')->insert([
            'description' => $request->description,
            'type' => $request->type,
            'quantity' => $request->quantity,
        ]);
        if (isset($box)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Transacción guardada';
            $response['responseData'] = $box;
        }
        return response()->json($response);
    }

    public function getCountersOfBox(){
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
        ];
        $income = DB::table('box')
        ->select(DB::raw('sum(quantity) as income'))
        ->where('type', 'income')
        ->first();
        $egress = DB::table('box')
        ->select(DB::raw('sum(quantity) as egress'))
        ->where('type', 'egress')
        ->first();

        $counters = new \stdClass();
        $counters->income = $income->income;
        $counters->egress = $egress->egress;
        $counters->balance = $income->income - $egress->egress;
        

        if (isset($income) && isset($egress)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $counters;
        }
        return response()->json($response);
    }
}
