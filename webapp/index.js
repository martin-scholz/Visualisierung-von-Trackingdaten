//TileLayer für Satellitenkarte
var googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
//TileLayer für Straßenkarte
var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
//Karteninitialisierung
var map = L.map('map', {
  layers: [googleLayer],
  maxZoom: 20
}).setView([52.521079, 13.378048], 13);
var baseMaps = {
  "Satellitenkarte": googleLayer,
  "Strassenkarte": osmLayer
};

//Overlay für Bezirksgrenzen
var overLay = {
  "Bezirke": geoJsonLayer
}

//Marker Icons
var blueIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-blue.png',
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var redIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-red.png',
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var yellowIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-yellow.png',
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var blackIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-black.png',
  iconSize: [20, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


//Initialisierung der Layer bzw. Layergroups
var startMarkerLayer = new L.LayerGroup();
var endMarkerLayer = new L.LayerGroup();
var singleTrackMarker = new L.LayerGroup();
var startClusterGroup = new L.MarkerClusterGroup();
var endClusterGroup = new L.MarkerClusterGroup();
var startMarkerHeat = new L.LayerGroup();
var endMarkerHeat = new L.LayerGroup();
var startMarkerCluster = new L.LayerGroup();
var endMarkerCluster = new L.LayerGroup();

// initiale slidervalues
var sliderHoursVal_s = 0;
var sliderHoursVal_e = 23;
var sliderDaysVal_s = 1;
var sliderDaysVal_e = 7;

//collection die für weitere Iterationen für die Tages- und Wochenabschnittswahl übergeben wird.
var dataForSliders = [];

//threshold for 7-Tages Warnhinweis
var threshold;

// collection mit allen auszuwertenden Trackingdaten
var data = [];

// Layergruppierung für Layer, die gemeinsam entfernt werden
var layerGroupRemove = L.layerGroup([startMarkerLayer, endMarkerLayer, startMarkerHeat, endMarkerHeat, startMarkerCluster, endMarkerCluster]);
// Layergruppierung für Layer, die gemeinsam geleert werden
var layerGroupClear = L.layerGroup([startMarkerLayer, endMarkerLayer, startMarkerHeat, endMarkerHeat, startClusterGroup, endClusterGroup]);

//optionen für polylines
var polylineOptions = {
  color: 'blue',
  weight: 6,
  opacity: 0.9
};

// boolean to pass for different mouse-events on marker in "Ansicht Route" or "Ansicht Marker, Heatmap, Cluster-Marker"
var singletrack = false;


//Layers/Overlays Marker, Heatmap, Cluster-Marker
overLays = {
  "Marker (Start)": startMarkerLayer,
  "Heatmap (Start)": startMarkerHeat,
  "MarkerCluster (Start)": startMarkerCluster,
  "Marker (End)": endMarkerLayer,
  "Heatmap (End)": endMarkerHeat,
  "MarkerCluster (End)": endMarkerCluster,
  "Bezirke": geoJsonLayer
}

// Radiobuttons + Checkbox für die Auswahl der Basiskarten und Ebenen
var overLayCon = L.control.layers(baseMaps, overLays);
overLayCon.addTo(map);

//AJAX Request threshold
$.getJSON('/getThreshold', function(result) {
  thresholdId = result._id;
  console.log(parseFloat(result.threshold));
  threshold = parseFloat(result.threshold);
  $(document).ready(function() {
    $('#threshold.form-control').val(threshold);
    $("#spanOutputThreshold").text(threshold);
  });

  //AJAX Request fragt alle auszuwertenden tracking-daten an
  $.getJSON('/getTrackdata', function(result) {
    console.log(result);
    data = result;
    var points = [];
    var sevenDays = 0;
    data.forEach(function(doc, err) {
      if (doc.started <= new Date().getTime() / 1000 && doc.started >= (new Date().getTime() / 1000) - 23670000) {
        sevenDays++;
        console.log(sevenDays);
      }
    });

    //Anweisungen bei Überschreitung der Schwellenwertes
    if (threshold < sevenDays) {
      $('input[name="daterange"]').data('daterangepicker').setStartDate(moment().subtract('days', 7));
      console.log(threshold);
      //für die Extraction der zeitraumspezifischen Daten (die letzten 7  Tage) wird ein Zeitraum übergeben
      extractranges.range(Date.parse(Date()) - 23670000000, Date.parse(Date()));
      alert("In der letzten Woche wurden  " + " " + sevenDays + " " + " Fahrräder gestohlen gemeldet! ");
      threshold = 0;

    } else {
      //es wird der gesamte Zeitraum übergeben
      extractranges.range(1483264800000, Date.parse(Date()));
    }
  });
});
