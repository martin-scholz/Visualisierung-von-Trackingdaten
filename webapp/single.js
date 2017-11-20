var single = {
  singleTrack: function(bicycle_uuid) {
    //console.log("hat den Layer :" + map.hasLayer(startMarkerLayer));
    map.removeControl(overLayCon);
    var overLayCon1 = L.control.layers(baseMaps);
    overLayCon1.addTo(map);
    $('.form-control').attr('disabled', 'disabled');
    $('.btn-sm').attr('disabled', 'disabled');

    $(document).ready(function() {
      $("#sliderHours").slider({
        disabled: true
      });
      $("#sliderDays").slider({
        disabled: true
      });
    });

    if (singleTrackMarker) {
      singleTrackMarker.eachLayer(function(layer) {
        singleTrackMarker.removeLayer(layer);
      });
    }

    map.removeLayer(startMarkerLayer);
    map.removeLayer(startMarkerHeat);
    map.removeLayer(endMarkerLayer);
    map.removeLayer(endMarkerHeat);
    map.removeLayer(startMarkerCluster);
    map.removeLayer(endMarkerCluster);
    map.removeLayer(geoJsonLayer);
    map.removeControl(overLayCon);

    var arrayToSort = [];
    var boundaryPoints = [];
    var oneBike = [];
    data.forEach(function(doc, err) {


      if (doc.bicycle_uuid == bicycle_uuid) {
        // number type of doc.started for sorting purpose
        var startUnsorted = parseFloat(doc.started);
        //create object with startUnsorted
        var o = {
          "started1": startUnsorted
        };
        //merge with doc
        var obj = Object.assign(doc, o); // not internet Explorer
        //var obj = $.extend(doc, obj);
        oneBike.push(obj);
      }
    });
    console.log(oneBike);
    //sort oneBike by started/started1
    oneBike.sort(function(a, b) {
      return a.started1 - b.started1;
    });


    if (oneBike.length == 0) {
      alert("Für diese FahrradId existiert kein Eintrag!");
    } else {
      for (var i = 0; i < oneBike.length - 1; i++) {
        if (oneBike[i].route[0] != null) {
          var startPoint = [];
          var lat = parseFloat(oneBike[i].route[0].latitude);
          var lng = parseFloat(oneBike[i].route[0].longitude);
          var started = getDate(oneBike[i].started);
          var bicycle_uuid = (oneBike[i].bicycle_uuid);
          var ended = getDate(oneBike[i].ended);
          var speed = getSpeed(oneBike[i].duration_sec, oneBike[i].distance_m);
          console.log("lat" + lat + "lng" + lng);
          startPoint.push(lat);
          startPoint.push(lng);
          startMarker = L.marker(startPoint, {
            icon: blueIcon
          });
          startmarker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started, speed, 0.9, true);
          startMarker.addTo(singleTrackMarker);
          break;
        }
      }

      for (var i = oneBike.length - 1; i > 0; i--) {
        console.log("oneBikeLänge :" + oneBike.length);
        if (oneBike[i].route[oneBike[i].route.length - 1] != null) {
          var endPoint = [];
          var lat = parseFloat(oneBike[i].route[oneBike[i].route.length - 1].latitude);
          var lng = parseFloat(oneBike[i].route[oneBike[i].route.length - 1].longitude);
          var ended = getDate(oneBike[i].ended);
          console.log("ended :" + ended + "utc :" + oneBike[i].ended);
          console.log(oneBike);
          endPoint.push(lat);
          endPoint.push(lng);
          endMarker = L.marker(endPoint, {
            icon: redIcon
          });
          endmarker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended, speed, 0.9, true);
          endMarker.addTo(singleTrackMarker);
          break;
        }
      }


      map.addLayer(singleTrackMarker);


      oneBike.forEach(function(doc, err) {
        var startPoint = [];
        if (doc.route[0] == null) {
          lat = null;
          lng = null;
          console.log(doc.route[0]);
        } else {
          var lat = parseFloat(doc.route[0].latitude);
          var lng = parseFloat(doc.route[0].longitude);
          var bicycle_uuid = (doc.bicycle_uuid);
          var started = getDate(doc.started);
          var ended = getDate(doc.ended);
          var speed = getSpeed(doc.duration_sec, doc.distance_m);
          console.log(doc.route[0].longitude);
          startPoint.push(lat);
          startPoint.push(lng);
          startMarker = L.marker(startPoint, {
            icon: blueIcon
          });
          startMarker = getPopup(startMarker, lat, lng, bicycle_uuid, "start", started, speed, 0.0, true);
          startMarker.addTo(singleTrackMarker);
          var endPoint = [];
          var lat = parseFloat(doc.route[doc.route.length - 1].latitude);
          var lng = parseFloat(doc.route[doc.route.length - 1].longitude);
          endPoint.push(lat);
          endPoint.push(lng);
          endMarker = L.marker(endPoint, {
            icon: redIcon
          });
          endMarker = getPopup(endMarker, lat, lng, bicycle_uuid, "end", ended, speed, 0.0, true);
          endMarker.addTo(singleTrackMarker);
        }
        //console.log("bikeID :" + bicycle_uuid);
        var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        var polylinePoints = [];
        polylineOptions.color = hue;
        doc.route.forEach(function(doc, err) {
          var lat = parseFloat(doc.latitude);
          var lng = parseFloat(doc.longitude);
          boundaryPoints.push(new L.LatLng(lat, lng));
          polylinePoints.push(new L.LatLng(lat, lng));

        });
        //console.log(polylinePoints);
        map.addLayer(singleTrackMarker);
        polyline = new L.Polyline(polylinePoints, polylineOptions);
        singleTrackMarker.addLayer(polyline);
      });

      //console.log(boundaryPoints);
      var boundary = new L.Polyline(boundaryPoints, polylineOptions);
      map.fitBounds(boundary.getBounds());
      var button = new L.Control.Button('Remove polyline');
      button.addTo(map);
      button.on('click', function() {
        map.removeControl(overLayCon1);
        map.removeLayer(singleTrackMarker);
        overLayCon.addTo(map);
        map.removeControl(button);
        $('.form-control').attr('disabled', false);
        $('.btn-sm').attr('disabled', false);
        //map.addLayer(startMarkerLayer);
        $(document).ready(function() {
          $("#sliderHours").slider({
            disabled: false
          });
          $("#sliderDays").slider({
            disabled: false
          });
        });

      });
    }
  }
};
