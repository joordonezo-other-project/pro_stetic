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
            ->join('schedule as sh', 'citation.idSchedule', '=', 'sh.id')
            ->join('rangeSchedule as rsh', 'sh.idRangeSchedule', '=', 'rsh.id')
            ->select(
                'citation.*',
                'uw.name as nameWorker',
                'uw.lastName as lastnameWorker',
                'uu.name as nameUser',
                'uu.lastName as lastnameUser',
                'sh.date',
                'rsh.startHour',
                'rsh.endHour')
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
            ->join('service', 'citationDetail.idService', '=', 'service.id')
            ->select('service.*', 'citationDetail.description as observation')
            ->where('citationDetail.idCitation', '=', $id)
            ->get();

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
        $dataShedule = $request->dataShedule;

        $idRangeShedule = DB::table('rangeSchedule')->insertGetId(
            [
                'startHour' => $dataShedule['startHour'],
                'endHour' => $dataShedule['endHour'],
                'status' => 'reserved',
            ]
        );
       $idSchedule = DB::table('schedule')->insertGetId(
            [
                'date' => $dataShedule['date'],
                'idRangeSchedule' => $idRangeShedule,
            ]
        );
        $description = $request->description;
        $idUser = $request->idUser;
        $idWorker = $request->idWorker;

        $idCitation = DB::table('citation')->insertGetId(
            [
                'creationDate' => date("Y-m-d H:i:s"),
                'description' => $description,
                'status' => 'active',
                'idWorker' => $idWorker,
                'idUser' => $idUser,
                'idSchedule' => $idSchedule,
            ]
        );
        $services = $request->services;
        foreach ($services as $service) {
            DB::table('citationDetail')->insert(
                [
                    'idCitation' => $idCitation,
                    'idService' => $service['id'],
                    'description' => $service['description'],
                ]
            );
        }

        if (isset($idCitation)) {
            $response['status'] = true;
            $response['title'] = '¡Éxito!';
            $response['message'] = 'Datos guardados';
            $response['responseData'] = $idCitation;
        }
        return response()->json($response);
    }
}
