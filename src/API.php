<?php
header('Content-Type: application/json');

$endpoint = $_REQUEST['endpoint'] ?? '';

switch ($endpoint) {
    case 'profiles':
        // Example: fetch profiles from DB
        echo json_encode([
            ["id" => 1, "name" => "Dr. Alice", "role" => "doctor"],
            ["id" => 2, "name" => "Nurse Bob", "role" => "nurse"]
        ]);
        break;

    case 'drones':
        echo json_encode([
            ["id" => 1, "name" => "Drone Alpha-1", "status" => "available"],
            ["id" => 2, "name" => "Drone Beta-2", "status" => "in_flight"]
        ]);
        break;

    case 'delivery-requests':
        $requester_id = $_POST['requester_id'] ?? '';
        $description = $_POST['description'] ?? '';
        echo json_encode([
            "status" => "success",
            "message" => "Delivery request created",
            "data" => ["requester_id" => $requester_id, "description" => $description]
        ]);
        break;

    case 'consultations':
        $patient_id = $_POST['patient_profile_id'] ?? '';
        $doctor_id = $_POST['doctor_profile_id'] ?? '';
        echo json_encode([
            "status" => "success",
            "message" => "Consultation scheduled",
            "data" => ["patient_profile_id" => $patient_id, "doctor_profile_id" => $doctor_id]
        ]);
        break;

    default:
        echo json_encode(["error" => "Unknown endpoint"]);
}
