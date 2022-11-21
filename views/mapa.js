let map = L.map('map').setView([19.470800,-70.692039],8)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = new L.marker([19.4792,-70.6931],{
    draggable: true,
    autoPan: true
}).addTo(map);