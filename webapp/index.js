
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
var startHeatmap;
var startMarkerCluster = new L.LayerGroup();
var endMarkerCluster = new L.LayerGroup();
var endHeatmap = true;


var sliderHoursVal_s = 0;
var sliderHoursVal_e = 24;
var sliderDaysVal_s = 1;
var sliderDaysVal_e = 7;
var dataForSliders = [];
var threshold;
var data = [];


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
      getLayerTimeRange(Date.parse(Date()) - 16717994000, Date.parse(Date()));
      alert("In der letzten Woche wurden  " + " " + sevenDays + " " + " Fahrräder gestohlen gemeldet! ");
      threshold = 0;
    } else {
      getLayerTimeRange(1483264800000, Date.parse(Date()));
    }
    //getLayerTimeRange((Date.parse(Date()-604800000)), Date.parse(Date()));
  });
});
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function getDate(utc) {
  var dt = new Date(utc * 1000);
  return dt;

}

function getSpeed(duration, distance) {
  var speed = Math.round((distance / duration) * 3.6);
  return speed;

}

function showHeatMap(points) {
  if (heat) {
    console.log(heat);
    map.removeLayer(heat);
    console.log(heat);
    console.log("heat removed");
  }
  heatPointArray = points.map(function(p) {
    return [p[0], p[1]];
  });

  var heat = L.heatLayer(heatPointArray);

  return heat;
}

function getPopup(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {
  this.bicycle_uuid = bicycle_uuid;

  if (arguments.length != 9) {
    throw new Error("9 arguments expected");
  } else {
    marker.setOpacity(opacity)
      .bindPopup("Lat: " + lat + "\nlng: " + lng + "<br>" + "\nbikeId: " + bicycle_uuid + "<br>" + "\n" + label + "ed: " + startend + "\n" + "<br>" + "speed: " + speed + "km/h")
      //.bindPopup("Lat: " + lat + "\nlng: " + lng + "<br>" + "\nFahrradId: " + bicycle_uuid + "<br>" + "\n" + label + "zeit: " + startend + "\n" + "<br>" + "speed: " + speed + "km/h")
      .on('mouseover', function(e) {
        this.openPopup();
      });
    if (singletrack == false) {
      marker.on('click', function(e) {
        single.singleTrack(bicycle_uuid);
      });
    }
    marker.on('mouseout', function(e) {
      this.closePopup();
    })
    return marker;
  }
}
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


function showDate(eins, zwei) {
  //console.log("showDate");
  startMarkerLayer.clearLayers();
  endMarkerLayer.clearLayers();
  startMarkerHeat.clearLayers();
  endMarkerHeat.clearLayers();
  startClusterGroup.clearLayers();
  endClusterGroup.clearLayers();
  // console.log("eins :" + eins);
  // console.log("zwei :" + zwei);
  var s = getUTC(eins);
  var e = getUTC(zwei);
  // console.log("s :" + s);
  // console.log("e :" + e);
  pickerVal_start = Date.UTC(s[0], s[1] - 1, s[2], s[3],s[4]);
  pickerVal_end = Date.UTC(e[0], e[1] - 1, e[2], e[3],e[4]);
  // console.log(pickerVal_s = new Date(Date.UTC(s[0], s[1] - 1, s[2], s[3], s[4])));
  // console.log(pickerVal_e = new Date(Date.UTC(e[0], e[1] - 1, e[2], e[3], e[4])));
  // console.log("Pickervaluestart :" + pickerVal_start);
  // console.log("Pickervaluestart :" + pickerVal_end);
  // console.log("Anfangszeit :" + getDate(pickerVal_start / 1000));
  // console.log("Endzeit :" + getDate(pickerVal_end / 1000));
  //alert(pickerVal_start +'' + pickerVal_end);

  getLayerTimeRange(pickerVal_start, pickerVal_end);
  console.log("has no Layer");

}

function getUTC(format) {
  var str = format;
  var c = str.split('/').map(function(i) {
    return parseInt(i, 10);
  });
  return c;
}

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

function getLayerTimeRange(pickerVal_start, pickerVal_end) {
  dataForSliders = [];
  var s_pointsArray = [];
  var e_pointsArray = [];
  var s_marker;
  var e_marker;
  data.forEach(function(doc, err) {
    s_point = [];
    e_point = [];

    if (doc.started <= (pickerVal_end / 1000) && doc.started >= (pickerVal_start / 1000)) {

      dataForSliders.push(doc);

      if (doc.route[0] == null) {
        lat = null;
        lng = null;
      } else {
        var s_lat = parseFloat(doc.route[0].latitude);
        var s_lng = parseFloat(doc.route[0].longitude);
        var e_lat = parseFloat(doc.route[doc.route.length - 1].latitude);
        var e_lng = parseFloat(doc.route[doc.route.length - 1].longitude);
        s_point.push(s_lat, s_lng);
        e_point.push(e_lat, e_lng);
        s_pointsArray.push(s_point);
        e_pointsArray.push(e_point);
        var bicycle_uuid = (doc.bicycle_uuid);
        var started = getDate(doc.started);
        var ended = getDate(doc.ended);
        var speed = getSpeed(doc.duration_sec, doc.distance_m);
        s_marker = L.marker(s_point, {
          icon: blueIcon
        });
        e_marker = L.marker(e_point, {
          icon: redIcon
        });
        s_marker_cluster = L.marker(s_point, {
          icon: blueIcon
        });
        e_marker_cluster = L.marker(e_point, {
          icon: redIcon
        });

        s_marker.addTo(startMarkerLayer);
        e_marker.addTo(endMarkerLayer);

        s_marker = getPopup(s_marker, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
        e_marker = getPopup(e_marker, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);
        s_marker_cluster = getPopup(s_marker_cluster, s_lat, s_lng, bicycle_uuid, "start", started, speed, 0.9, false);
        e_marker_cluster = getPopup(e_marker_cluster, e_lat, e_lng, bicycle_uuid, "end", ended, speed, 0.9, false);


        startClusterGroup.addLayer(s_marker_cluster);
        endClusterGroup.addLayer(e_marker_cluster);
        startMarkerCluster.addLayer(startClusterGroup);
        endMarkerCluster.addLayer(endClusterGroup);
      }

    } else {
      console.log("no data available");
    }
  });

  startHeatmap = showHeatMap(s_pointsArray);
  endHeatmap = showHeatMap(e_pointsArray);
  startMarkerHeat.addLayer(startHeatmap);
  endMarkerHeat.addLayer(endHeatmap);

  map.addLayer(startMarkerLayer);


}
//})();
