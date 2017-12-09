/*
route.js
erstellt eine Route und bringt sie zur Ansicht
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
var route = {
  singleTrack: function(bicycle_uuid) {

    // Steuerelement für die Layerwahl muss für diese Ansicht entfernt werden
    map.removeControl(overLayCon);

    // Radiobuttons für Basiskartenwahl wird neu erstellt und der Karte wieder wieder hinzugefügt
    var overLayCon1 = L.control.layers(baseMaps);
    overLayCon1.addTo(map);

    //Sidebarelemente werden "disabled"
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

    // Falls  Layergroup singleTrackMarker andere Layergroups(Marker) enthält werden sie entfernt
    if (singleTrackMarker) {
      singleTrackMarker.eachLayer(function(layer) {
        singleTrackMarker.removeLayer(layer);
      });
    }

    removeLayers(layerGroupRemove);
    //map.removeControl(overLayCon);


    var boundaryPoints = [];
    var oneBike = [];

    //Auslesen der ersten Koordinate des ersten Tracks und der letzten Koordinate des letzten Tracks für Start- und Endmarker einer Route
    data.forEach(function(doc, err) {


      if (doc.bicycle_uuid == bicycle_uuid) {
        // number Typ doc.started für Sortierzwecke
        var startUnsorted = parseFloat(doc.started);
        console.log("oneBike :" + startUnsorted);
        // object mit startUnsorted
        var o = {
          "started1": startUnsorted
        };
        //Vereinigung mit doc
        //var obj = Object.assign(doc, o); // not internet Explorer
        var obj = $.extend(doc, o);

        oneBike.push(obj);
      }
    });

    console.log("oneBike :" + oneBike);
    oneBike = sortDate(oneBike);

    if (oneBike.length == 0) {

      //Hinweis falls es für diese Fahrrad-Id keinen Eintrag gibt
      alert("Für diese FahrradId existiert kein Eintrag!");
    } else {

      // es wird die erste Koordinate und andere Trackindaten des ersten Element ausgelesen
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

          // Es werden Pop-usp und mouse-Events an die Marker angehängt
          startmarker = markerFunctions(startMarker, lat, lng, bicycle_uuid, "start", started, speed, 0.9, true);

          // Die Marker werden einer Layergroup beigefügt
          startMarker.addTo(singleTrackMarker);
          break;
        }
      }
      // es wird die letzte Koordinate und andere Trackindaten des letzten Element ausgelesen,
      for (var i = oneBike.length - 1; i > 0; i--) {
        console.log("oneBikeLänge :" + oneBike.length);
        if (oneBike[i].route[oneBike[i].route.length - 1] != null) {
          var endPoint = [];
          var lat = parseFloat(oneBike[i].route[oneBike[i].route.length - 1].latitude);
          var lng = parseFloat(oneBike[i].route[oneBike[i].route.length - 1].longitude);
          var started = getDate(oneBike[i].started);
          var ended = getDate(oneBike[i].ended);
          console.log("started :" + started + "utc :" + oneBike[i].started);
          console.log("ended :" + ended + "utc :" + oneBike[i].ended);
          console.log(oneBike);
          endPoint.push(lat);
          endPoint.push(lng);
          endMarker = L.marker(endPoint, {
            icon: redIcon
          });
          endmarker = markerFunctions(endMarker, lat, lng, bicycle_uuid, "end", ended, speed, 0.9, true);
          endMarker.addTo(singleTrackMarker);
          break;
        }
      }

      //Die Layergroup wird der Karte hinzugefügt
      //map.addLayer(singleTrackMarker);

      // Auslesen aller Start- und Endpunkte eines Tracks
      oneBike.forEach(function(doc, err) {
        console.log("startedafter :" + doc.started);
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

          //Die Marker für Zwischenlagerumngsorte sollen unsichtbar sein :Opacity = 0.0
          startMarker = markerFunctions(startMarker, lat, lng, bicycle_uuid, "start", started, speed, 0.0, true);
          startMarker.addTo(singleTrackMarker);
          var endPoint = [];
          var lat = parseFloat(doc.route[doc.route.length - 1].latitude);
          var lng = parseFloat(doc.route[doc.route.length - 1].longitude);
          endPoint.push(lat);
          endPoint.push(lng);
          endMarker = L.marker(endPoint, {
            icon: redIcon
          });
          endMarker = markerFunctions(endMarker, lat, lng, bicycle_uuid, "end", ended, speed, 0.0, true);
          endMarker.addTo(singleTrackMarker);
        }
        // Bei Vorliegen mehrerer Tracks werden die Polylines farblich unterschieden
        var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        var polylinePoints = [];
        polylineOptions.color = hue;

        // alle Koordinaten eines Tracks werden ausgelesen
        doc.route.forEach(function(doc, err) {
          var lat = parseFloat(doc.latitude);
          var lng = parseFloat(doc.longitude);
          boundaryPoints.push(new L.LatLng(lat, lng));
          polylinePoints.push(new L.LatLng(lat, lng));

        });

        //LayerGroup wird der Karte angehängt
        map.addLayer(singleTrackMarker);
        polyline = new L.Polyline(polylinePoints, polylineOptions);
        singleTrackMarker.addLayer(polyline);
      });

      //Skalierungsstufe wird der sofortigen Sichtbarkeit der Routenbrenzen angepasst
      var boundary = new L.Polyline(boundaryPoints, polylineOptions);
      map.fitBounds(boundary.getBounds());
      //Leaflet-Button zum Entfernen der Route wird erstellt
      var button = new L.Control.Button('Route entfernen');
      button.addTo(map);
      button.on('click', function() {
        map.removeControl(overLayCon1);
        map.removeLayer(singleTrackMarker);
        overLayCon.addTo(map);
        map.removeControl(button);

        //Sidebarelemente werden "enabled"
        $('.form-control').attr('disabled', false);
        $('.btn-sm').attr('disabled', false);
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
