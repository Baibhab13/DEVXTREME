const locations = {
    "berhampur": [19.3149618, 84.7940904],
    "gopalpur": [19.250231, 84.905026],
    "pmec": [19.35792066291815, 84.87168785265537],
    "jagannathpur": [19.385284, 84.768611],
    "narendrapur": [19.332151282868942, 84.86746421659258],
    "purusottampur": [19.483333, 84.883333],
    "kabisuryanagar": [19.400000, 84.616667],
    "khallikote": [19.6061, 85.0861],
    "chhatrapur": [19.3556, 84.9836],
    "pukudibandha": [19.500000, 84.800000]
};

let map = null;
let routingControl = null;

// Function to initialize or update the map
function initializeMap(start, end) {
    if (!map) {
        map = L.map('map').setView(start, 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView(start, 10);
    }

    // Remove previous route if it exists
    if (routingControl) {
        map.removeControl(routingControl);
    }

    // Initialize routing control
    routingControl = L.Routing.control({
        waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
        routeWhileDragging: true,
        show: false // Hide default instructions
    }).addTo(map);

    // Update distance and time
    routingControl.on('routesfound', function (e) {
        const route = e.routes[0];
        document.getElementById('distance').textContent = `${(route.summary.totalDistance / 1000).toFixed(2)} km`;
        document.getElementById('travelTime').textContent = `${(route.summary.totalTime / 60).toFixed(2)} mins`;
    });
}

// Function to set up autocomplete suggestions
function setupAutocomplete(input) {
    const suggestionsList = Object.keys(locations);
    const container = input.parentElement;
    const list = document.createElement("ul");
    list.classList.add("suggestions-list");
    container.appendChild(list);

    input.addEventListener("input", function () {
        const value = input.value.toLowerCase().trim();
        list.innerHTML = "";

        if (value === "") {
            list.style.display = "none";
            return;
        }

        const filtered = suggestionsList.filter(item => item.toLowerCase().includes(value));

        if (filtered.length === 0) {
            list.style.display = "none";
            return;
        }

        filtered.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", function () {
                input.value = item;
                list.style.display = "none";
            });
            list.appendChild(li);
        });

        list.style.display = "block";
    });

    document.addEventListener("click", function (e) {
        if (!container.contains(e.target)) {
            list.style.display = "none";
        }
    });
}

// Initialize autocomplete for both inputs
setupAutocomplete(document.getElementById("input1"));
setupAutocomplete(document.getElementById("input2"));

// Event listener for the track button
document.getElementById('trackButton').addEventListener('click', function () {
    const fromDestination = document.getElementById('input1').value.trim().toLowerCase();
    const toDestination = document.getElementById('input2').value.trim().toLowerCase();

    if (locations[fromDestination] && locations[toDestination]) {
        const start = locations[fromDestination];
        const end = locations[toDestination];

        // Show the map section (Ensure you have a div with id="map" in your HTML)
        document.getElementById('mapSection').style.display = 'block';

        // Initialize or update the map
        initializeMap(start, end);
    } else {
        alert("Invalid route! Please enter valid destinations.");
    }
});











// Add this bus schedule data
const busSchedule = [
    { id: "bus1", time: "10:00 AM - 11:00 AM", name: "Express 1" },
    { id: "bus2", time: "11:00 AM - 12:00 PM", name: "City Link" },
    { id: "bus3", time: "12:00 PM - 01:00 PM", name: "Rapid Route" },
    { id: "bus4", time: "01:00 PM - 02:00 PM", name: "Express 2" },
    { id: "bus5", time: "02:00 PM - 03:00 PM", name: "Daily Shuttle" }
];

// Function to populate the timetable dropdown
function populateTimetable() {
    const select = document.getElementById('busTimetable');
    busSchedule.forEach(bus => {
        const option = document.createElement('option');
        option.value = bus.id;
        option.textContent = `${bus.time} (${bus.name})`;
        select.appendChild(option);
    });
}

// Function to show available buses for the route
function showAvailableBuses(from, to) {
    const availableBusesDiv = document.getElementById('availableBuses');
    availableBusesDiv.innerHTML = '<h3>Available Buses:</h3>';

    // Simple logic to determine available buses based on route
    const available = [];
    if (from === 'berhampur' && to === 'berhampur') {
        available.push(busSchedule[0], busSchedule[1], busSchedule[2]);
    } else if (from === 'gopalpur' && to === 'gopalpur') {
        available.push(busSchedule[1], busSchedule[3]);
    } else {
        available.push(busSchedule[2], busSchedule[4]);
    }

    const ul = document.createElement('ul');
    available.forEach(bus => {
        const li = document.createElement('li');
        li.textContent = `${bus.name} (${bus.time})`;
        ul.appendChild(li);
    });
    availableBusesDiv.appendChild(ul);
}

// Define locations (fix missing reference issue)


// Modified track button event listener
document.getElementById('trackButton').addEventListener('click', function () {
    const fromDestination = document.getElementById('input1').value.trim().toLowerCase();
    const toDestination = document.getElementById('input2').value.trim().toLowerCase();

    if (locations[fromDestination] && locations[toDestination]) {
        const start = locations[fromDestination];
        const end = locations[toDestination];

        // Show the map and bus sections
        document.getElementById('mapSection').style.display = 'block';
        document.getElementById('busSection').style.display = 'block';

        // Initialize or update the map
        initializeMap(start, end);

        // Show available buses
        showAvailableBuses(fromDestination, toDestination);
    } else {
        alert("Invalid route! Please enter valid destinations.");
    }
});

// Initialize the timetable dropdown when the page loads
document.addEventListener('DOMContentLoaded', function () {
    populateTimetable();
    // Initially hide bus section
    document.getElementById('busSection').style.display = 'none';
});
