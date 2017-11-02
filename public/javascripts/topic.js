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

var geoJsonLayer = L.geoJson(berlin_bezirke, {
  style: function(feature) {
    switch (feature.properties.name) {
      case 'Mitte':
        return {
          color: "#ff0000"
        };
      case 'Friedrichshain-Kreuzberg':
        return {
          color: "#0000ff"
        };
      case 'Pankow':
        return {
          color: "#ff0000"
        };
      case 'Charlottenburg-Wilmersdorf':
        return {
          color: "#0000ff"
        };
      case 'Spandau':
        return {
          color: "#ff0000"
        };
      case 'Steglitz-Zehlendorf':
        return {
          color: "#0000ff"
        };
      case 'Tempelhof-Schöneberg':
        return {
          color: "#ff0000"
        };
      case 'Neukölln':
        return {
          color: "#0000ff"
        };
      case 'Treptow-Köpenick':
        return {
          color: "#ff0000"
        };
      case 'Marzahn-Hellersdorf':
        return {
          color: "#0000ff"
        };
      case 'Reinickendorf':
        return {
          color: "#0000ff"
        };
      case 'Lichtenberg':
        return {
          color: "#ff0000"
        };

    }
  }
});
var overLay = {
  "Bezirke": geoJsonLayer
}


var blueIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var redIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var yellowIcon = new L.Icon({
  iconUrl: './images/marker-icon-2x-yellow.png',
  iconSize: [25, 41],
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
var overLaysStart;

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
  console.log(result);
  thresholdId = result._id;
  console.log(parseFloat(result.threshold));
  threshold = parseFloat(result.threshold);

  //$("#myFilterSelect").val("Alle");
  $.getJSON('/getTrackdata', function(result) {
    //console.log(result);
    data = result;
    var points = [];
    var sevenDays = 0;
    data.forEach(function(doc, err) {
      if (doc.started <= new Date().getTime() / 1000 && doc.started >= (new Date().getTime() / 1000) - 16717994) {
        sevenDays++;
        console.log(sevenDays);
      }
    });
    //threshold = 80;
    if (threshold < sevenDays) {
      console.log(threshold);
      getLayerTimeRange(Date.parse(Date()) - 16717994000, Date.parse(Date()));
      alert("In der letzten Woche wurden  " + " " +sevenDays +" "+  " Fahrräder gestohlen gemeldet!");
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

console.log(getPopup.bicycle_uuid);

function getPopup(marker, lat, lng, bicycle_uuid, label, startend, speed, opacity, singletrack) {
  this.bicycle_uuid = bicycle_uuid;

  if (arguments.length != 9) {
    throw new Error("9 arguments expected");
  } else {
    marker.setOpacity(opacity)
      .bindPopup("Lat: " + lat + "\nlng: " + lng + "<br>" + "\nbikeId: " + bicycle_uuid + "<br>" + "\n" + label + "ed: " + startend + "\n" + "<br>" + "speed: " + speed + "km/h")
      .on('mouseover', function(e) {
        this.openPopup();
      });
    if (singletrack == false) {
      marker.on('click', function(e) { //window.open(this.url);
        singleTrack(bicycle_uuid);
      });
    }
    marker.on('mouseout', function(e) {
      this.closePopup();
    })
    return marker;
  }
}
//start= {"Alle Starts": starts}

overLaysStart = {
  "Marker (Start)": startMarkerLayer,
  "Heatmap (Start)": startMarkerHeat,
  "MarkerCluster (Start)": startMarkerCluster,
  "Marker (End)": endMarkerLayer,
  "Heatmap (End)": endMarkerHeat,
  "MarkerCluster (End)": endMarkerCluster,
  "Bezirke (Start)": geoJsonLayer
}

var overLayStartCon = L.control.layers(baseMaps, overLaysStart);
overLayStartCon.addTo(map);


$(function() {
  $('input[name="daterange"]').daterangepicker({
    timePicker: true,
    timePicker24Hour: true,
    //timePickerIncrement: 30,
    alwaysShowCalendars: true,
    locale: {
      format: 'DD.MM.YYYY h:mm A',
      monthNames: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ],
      daysOfWeek: [
        "So",
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa"
      ],
      applyLabel: 'Anwenden',
      cancelLabel: 'Abbrechen',
    }
  }, function(start, end, label) {
    //alert("A new date range was chosen: " + start.format('YYYY/MM/DD/h') + ' to ' + end.format('YYYY/MM/DD/h'));
    showDate(start.format('YYYY/MM/DD/h'), end.format('YYYY/MM/DD/h'));
    $(document).ready(function() {
      var outputSpan = $("#spanOutputDays");
      $("#sliderDays").slider({
        values: [1, 7]
      })
    });
    $(document).ready(function() {
      var outputSpan = $("#spanOutputHours");
      $("#sliderHours").slider({
        values: [0, 24]
      })
    });
  });
});

function showDate(eins, zwei) {
  startMarkerLayer.clearLayers();
  endMarkerLayer.clearLayers();
  startMarkerHeat.clearLayers();
  endMarkerHeat.clearLayers();
  startClusterGroup.clearLayers();
  endClusterGroup.clearLayers();
  console.log(eins);
  console.log(zwei);
  var s = getUTC(eins);
  var e = getUTC(zwei);
  console.log(s);
  console.log(e);
  pickerVal_start = Date.UTC(s[0], s[1] - 1, s[2], s[3]);
  pickerVal_end = Date.UTC(e[0], e[1] - 1, e[2], e[3]);
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
$(document).ready(function(){
$("#submit.btn.btn-primary").click(function() {
  var data = {};
        data.threshold = $('#name.form-control').val();
        if($.isNumeric(data.threshold)){
        //alert(data.threshold);
        $.post('/updateThreshold',{
          threshold: data.threshold
        }).then(function(data) {
        window.location = data.redirectUrl;
    });
  }else{

  alert("Sie müssen eine Zahl eingeben!");

    $('#name.form-control').tooltip();
    $('#name.form-control').tooltip("enable", {
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function(position, feedback) {
          $(this).css(position);
          $("<div>")
            .addClass("arrow")
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
        }
      }
    });
  }




// $.ajax({
//   type: 'POST',
//   data: JSON.stringify(data),
//       contentType: 'application/json',
//               url: '/updateThreshold',
//               success: function(data) {
//                   console.log('success');
//                   console.log(JSON.stringify(data));
//               }
//           });

});
});
$("#bikeId.btn.btn-primary").click(function() {
  var patt = /[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}/;
  if (patt.test($('#bikeId.form-control').val())) {
    $('#bikeId.form-control').tooltip();
    singleTrack($("#bikeId.form-control").val());
    $('#bikeId.form-control').tooltip("disable");
  } else {
    alert("Sie haben eine falsche Eingabe gemacht!");
    $(function() {
      $('#bikeId.form-control').tooltip();
      $('#bikeId.form-control').tooltip("enable", {
        position: {
          my: "center bottom-20",
          at: "center top",
          using: function(position, feedback) {
            $(this).css(position);
            $("<div>")
              .addClass("arrow")
              .addClass(feedback.vertical)
              .addClass(feedback.horizontal)
              .appendTo(this);
          }
        }
      });
    });
  }
});


function getLayerTimeRange(pickerVal_start, pickerVal_end) {
  dataForSliders = [];
  var s_pointsArray = [];
  var e_pointsArray = [];
  var s_marker;
  var e_marker;
  //map.removeLayer
  data.forEach(function(doc, err) {
    s_point = [];
    e_point = [];
    //console.log("Anfang: " + pickerVal_start / 1000 + "Ende: " + pickerVal_end / 1000);
    if (doc.started <= (pickerVal_end / 1000) && doc.started >= (pickerVal_start / 1000)) {
      //  console.log("Startzeiten: " + (getDate(doc.started)) + "stamp :" + doc.started);
      dataForSliders.push(doc);

      if (doc.route[0] == null) {
        lat = null;
        lng = null;
      } else {
        var s_lat = parseFloat(doc.route[0].latitude);
        var s_lng = parseFloat(doc.route[0].longitude);
        var e_lat = parseFloat(doc.route[doc.route.length - 1].latitude);
        var e_lng = parseFloat(doc.route[doc.route.length - 1].longitude);
        s_point.push(s_lat);
        s_point.push(s_lng);
        e_point.push(e_lat);
        e_point.push(e_lng);
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

        //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
        s_marker.addTo(startMarkerLayer);
        e_marker.addTo(endMarkerLayer);

        //  console.log(bicycle_uuid);
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
  overLaysStart = {
    "Marker (Start)": startMarkerLayer,
    "Heatmap (Start)": startMarkerHeat,
    "MarkerCluster (Start)": startMarkerCluster,
    "Marker (End)": endMarkerLayer,
    "Heatmap (End)": endMarkerHeat,
    "MarkerCluster (End)": endMarkerCluster,
    "Bezirke (Start)": geoJsonLayer
  }


}
//Input Validation FahrradId
// var errorname = true;
//
// var formid = document.getElementById('bikeId');
// formid.onfocus = function () {
//     this.setAttribute('style','background: white');
// }
// formid.onblur = function () {
//   console.log(this.value);
//   //alert("input field touched");
//     if (this.value.match("93fed1b3-b28f-4ed8-a4c4-4fe450873f85")) {
//       console.log("condition true");
//         this.setAttribute('style','background: white');
//         this.innerHTML = '';
//         //document.querySelector('.msg.formid').setAttribute('style','display:none');
//         errorname = false;
//     } else {
//         this.setAttribute('style','background:seashell');
//         this.innerHTML = 'Bitte geben Sie ihren Namen ein!';
//         //document.querySelector('.msg.formid').setAttribute('style','display:block');
//         errorname = true;
//     }
// }
