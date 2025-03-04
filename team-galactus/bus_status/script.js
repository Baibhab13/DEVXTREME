const busStops = [
  { stop: "Purushottampur", time: "10:00", status: "On Time" },
  { stop: "Tara Tarini Junction", time: "10:15", status: "On Time" },
  { stop: "Bhatakumarada", time: "10:25", status: "On Time" },
  { stop: "Chandipadar chowk", time: "10:35", status: "Irregular" },
  { stop: "PMEC", time: "10:40", status: "Delayed" },
  { stop: "Narendrapur", time: "10:50", status: "Delayed" },
  { stop: "Berhampur", time: "11:00", status: "Delayed" }
];

const busTimeline = document.getElementById("busTimeline");

busStops.forEach(stop => {
  const stopDiv = document.createElement("div");
  stopDiv.classList.add("stop");
  stopDiv.innerHTML = `<strong>${stop.stop}</strong><br>ETA: ${stop.time} <br> <span class="${stop.status === 'Delayed' ? 'delayed' : stop.status === 'Irregular' ? 'irregular' : 'on-time'}">${stop.status}</span>`;
  busTimeline.appendChild(stopDiv);
});
