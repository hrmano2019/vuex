// Example Node.js/Express endpoint
app.post("/telemetry", async (req, res) => {
  const { hardwareId, metric, value } = req.body;
  await db.query(
    "INSERT INTO telemetry_logs (hardware_id, metric, value, recorded_at) VALUES ($1, $2, $3, now())",
    [hardwareId, metric, value]
  );
  res.json({ status: "ok" });
});
