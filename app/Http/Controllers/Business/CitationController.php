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

    public function getScheduleByRangeDates(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
        ];
        $startDate = $request->startDate;
        $endDate = $request->endDate;
        $schedules = DB::table('schedule')
            ->whereBetween('schedule.date', [$startDate, $endDate])
            ->get();
        foreach ($schedules as $schedule) {
            $schedule->rangeSchedules = DB::table('rangeSchedule')
                ->where('id', '=', $schedule->idRangeSchedule)
                ->get();
        }
        if (isset($schedules)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $schedules;
        }
        return response()->json($response);
    }

    public function searchPeopleByName(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
        ];
        $name = $request->name;
        $people = DB::table('users')
            ->join('role', 'users.idRole', '=', 'role.id')
            ->where('role.status', '=', 'active')
            ->where('users.name', 'like', '%' . $name . '%')
            ->orWhere('users.lastName', 'like', '%' . $name . '%')
            ->select('users.*', 'role.name as roleName', 'role.id as role')
            ->get();
        if (isset($people)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $people;
        }
        return response()->json($response);
    }

    public function getServicesAvailables()
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo obtener los datos',
            'responseData' => [],
        ];
        $services = DB::table('service')
            ->get();
        if (isset($services)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos obtenidos';
            $response['responseData'] = $services;
        }
        return response()->json($response);
    }

    public function saveCitation(Request $request)
    {
        $response = [
            'status' => false,
            'title' => '¡Error!',
            'message' => 'No se pudo guardar los datos',
            'responseData' => [],
        ];
        $description = $request->description;
        $idUser = $request->idUser;
        $idWorker = $request->idWorker;
        $idService = $request->idService;
        $idRangeSchedule = $request->idRangeSchedule;
        $date = $request->date;
        $hour = $request->hour;
        $idCitation = DB::table('citation')->insertGetId(
            [
                'creationDate' => date("Y-m-d H:i:s"),
                'description' => $description,
                'status' => 'active',
                'idWorker' => $idWorker,
                'idUser' => $idUser,
            ]
        );
        if (isset($idCitation)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos guardados';
            $response['responseData'] = $idCitation;
        }
        return response()->json($response);
    }
}
