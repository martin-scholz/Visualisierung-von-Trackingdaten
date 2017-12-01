
//(function () {
var googleLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
var map = L.map('map', {
  layers: [googleLayer],
  maxZoom: 20
}).setView([52.521079, 13.378048], 13);
var baseMaps = {
  "Satellitenkarte": googleLayer,
  "Strassenkarte": osmLayer
};


var overLay = {
  "Bezirke": geoJsonLayer
}


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



var startMarkerLayer = new L.LayerGroup();
var endMarkerLayer = new L.LayerGroup();
var singleTrackMarker = new L.LayerGroup();
var startClusterGroup = new L.MarkerClusterGroup();
var endClusterGroup = new L.MarkerClusterGroup();
var startMarkerHeat = new L.LayerGroup(); //HeatmapLayer
var endMarkerHeat = new L.LayerGroup(); //HeatmapLayer
var startMarkerCluster = new L.LayerGroup();
var endMarkerCluster = new L.LayerGroup();
var endHeatmap = true;
var layerGroup = new L.LayerGroup();


var sliderHoursVal_s = 0;
var sliderHoursVal_e = 24;
var sliderDaysVal_s = 1;
var sliderDaysVal_e = 7;
var dataForSliders = [];
var threshold;
var data = [];
//var layerGroup = L.layerGroup([startMarkerLayer, endMarkerLayer, startMarkerHeat, endMarkerHeat,startMarkerCluster,endMarkerCluster]);


var polylineOptions = {
  color: 'blue',
  weight: 6,
  opacity: 0.9
};
var pickerVal_start;
var pickerVal_end;
var singletrack = false;

$.getJSON('/getThreshold', function(result) {
  //console.log(result);
  thresholdId = result._id;
  console.log(parseFloat(result.threshold));
  threshold = parseFloat(result.threshold);
  $(document).ready(function() {
    $('#threshold.form-control').val(threshold);
    $("#spanOutputThreshold").text(threshold);
  });

  //$("#myFilterSelect").val("Alle");
  $.getJSON('/getTrackdata', function(result) {
    console.log(result);
    data = result;
    var points = [];
    var sevenDays = 0;
    data.forEach(function(doc, err) {
      if (doc.started <= new Date().getTime() / 1000 && doc.started >= (new Date().getTime() / 1000) - 16717994) {
        sevenDays++;
        //console.log(sevenDays);

      }
      //console.log(doc.started);
    });


    if (threshold < sevenDays) {
      console.log(threshold);
      rangelayers.getLayerTimeRange(Date.parse(Date()) - 16717994000, Date.parse(Date()));
      alert("In der letzten Woche wurden  " + " " + sevenDays + " " + " Fahrräder gestohlen gemeldet! ");
      threshold = 0;

      // $('input[name="daterange"]').daterangepicker({
      //   startDate: moment().subtract('days', 7)
      // });
    } else {
      rangelayers.getLayerTimeRange(1483264800000, Date.parse(Date()));
    }
    //rangelayers.getLayerTimeRange((Date.parse(Date()-604800000)), Date.parse(Date()));
  });
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/





//start= {"Alle Starts": starts}

overLays = {
  "Marker (Start)": startMarkerLayer,
  "Heatmap (Start)": startMarkerHeat,
  "MarkerCluster (Start)": startMarkerCluster,
  "Marker (End)": endMarkerLayer,
  "Heatmap (End)": endMarkerHeat,
  "MarkerCluster (End)": endMarkerCluster,
  "Bezirke (Start)": geoJsonLayer
}

var overLayCon = L.control.layers(baseMaps, overLays);
overLayCon.addTo(map);




/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/


//})();
