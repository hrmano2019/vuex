<?php
function calibrateSensor($rawValue, $offset = -0.5) {
    // Apply offset correction
    return round($rawValue + $offset, 2);
}

// Example: calibrate DS18B20 reading
$temperature = calibrateSensor($rawReading);
$data = [
    "hardware_id" => "FREEZER-01",
    "metric" => "temperature",
    "value" => $temperature,
    "recorded_at" => date("c")
];
echo json_encode($data);
?>
