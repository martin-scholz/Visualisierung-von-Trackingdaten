
     var googleLayer = new L.Google('SATELLITE');



     var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        var map = L.map('map', {layers: [googleLayer], maxZoom:20}).setView([52.521079,13.378048], 13);
     var baseMaps = {
     "Satellitenkarte": googleLayer,
     "Strassenkarte": osmLayer
     };

     var geoJsonLayer = L.geoJson(berlin_bezirke,
      {
       style: function(feature) {
           switch (feature.properties.name) {
               case 'Mitte': return {color: "#ff0000"};
               case 'Friedrichshain-Kreuzberg':   return {color: "#0000ff"};
               case 'Pankow': return {color: "#ff0000"};
                     case 'Charlottenburg-Wilmersdorf':   return {color: "#0000ff"};
               case 'Spandau': return {color: "#ff0000"};
                     case 'Steglitz-Zehlendorf':   return {color: "#0000ff"};
               case 'Tempelhof-Schöneberg': return {color: "#ff0000"};
                     case 'Neukölln':   return {color: "#0000ff"};
               case 'Treptow-Köpenick': return {color: "#ff0000"};
                     case 'Marzahn-Hellersdorf':   return {color: "#0000ff"};
               case 'Reinickendorf':   return {color: "#0000ff"};
               case 'Lichtenberg': return {color: "#ff0000"};

           }
       }
     });
     var overLay = {
       "Bezirke" : geoJsonLayer
     }


      var blueIcon = new L.Icon({
        iconUrl: './images/marker-icon-2x-blue.png',
        //iconUrl: './images/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
      var redIcon = new L.Icon({
        iconUrl: './images/marker-icon-2x-red.png',
        //iconUrl: './images/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
      var yellowIcon = new L.Icon({
        iconUrl: './images/marker-icon-2x-yellow.png',
        //iconUrl: './images/marker-icon-2x-yellow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });


        var starts = new L.LayerGroup();
        var startMarkerLayer = new L.LayerGroup();
        var endMarkerLayer = new L.LayerGroup();
        var singleTrackMarker = new L.LayerGroup();
        var startMarkerLastSevenDays = new L.LayerGroup();
        var startMarkerTwentyFourHours = new L.LayerGroup();
        var mainLayerGroup = new L.layerGroup();
        var startClusterGroup = new L.MarkerClusterGroup();
        var endClusterGroup = new L.MarkerClusterGroup();
        var startMarkerHeat = new L.LayerGroup();//HeatmapLayer
        var endMarkerHeat = new L.LayerGroup();//HeatmapLayer
        var startHeatmap;
        var startMarkerCluster = new L.LayerGroup();
        var endMarkerCluster = new L.LayerGroup();
        var endHeatmap = true;
        var overLaysStart;
        var data = [];
        var pointsTwentyFour =[];
        var polylineOptions = {
               color: 'blue',
               weight: 6,
               opacity: 0.9
             };


        $.getJSON('/trackdata',function(result){

          data = result;
          var spoints =[];

          var boundaryPoints = [];
          //console.log(data);
        result.forEach(function(doc,err){
        var spoint=[];
        console.log("reached");
        console.log(doc);

        if(doc.route[0]==null){
              lat=52.521079;
              lng=13.378048;
            }else{
        var lat = parseFloat(doc.route[0].latitude);
        var lng = parseFloat(doc.route[0].longitude);
                  spoint.push(lat);
                  spoint.push(lng);

        var bicycle_uuid = (doc.bicycle_uuid);
        var started = getDate(doc.started);
        console.log(bicycle_uuid);
        spoints.push(spoint);
        marker = L.marker(spoint,{icon: blueIcon});

        marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
        marker.addTo(startMarkerLayer);
        startClusterGroup.addLayer(marker);



        }
        });
        startHeatmap = showHeatMap(spoints);
        startMarkerHeat.addLayer(startHeatmap);
        startMarkerCluster.addLayer(startClusterGroup);
        ends(data);
});


        /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
            function getDate(utc) {
            var dt = new Date(utc * 1000);
            return dt + '<br>';

            }

            function showHeatMap(points){
              if(heat){
                console.log(heat);
                map.removeLayer(heat);
                console.log(heat);
                console.log("heat removed");
              }
            heatPointArray = points.map(function (p) { return [p[0], p[1]]; });

            var heat = L.heatLayer(heatPointArray);

            return heat;
            }


            function getPopup(marker, lat, lng, bicycle_uuid, label, startend){
              marker.url = 'single';

              marker.setOpacity(0.9)
                    .bindPopup("Lat: " + lat +"\nlng: " + lng +"\nbikeId: "  + bicycle_uuid + "\n" + label + "ed: " + startend)
                    .on('mouseover', function (e) { this.openPopup();})
                    .on('click', function (e) { //window.open(this.url);

                                                singleTrack(bicycle_uuid);
                                                $(document).ready(function(){
                                                  $("#heatmap").hide();
                                                  $(".heat_item").hide();
                                                  $("#markermap").hide();
                                                  $(".marker_item").hide();
                                                });
                                              })
                    .on('mouseout', function (e) {this.closePopup();})
              return marker;
            }
            start= {"Alle Starts": starts}

            overLaysStart = {
                              "Marker (Start)" : startMarkerLayer,
                              "Heatmap (Start)" : startMarkerHeat,
                              "MarkerCluster (Start)" : startMarkerCluster,
                              "Marker (End)" : endMarkerLayer,
                              "Heatmap (End)" : endMarkerHeat,
                              "MarkerCluster (End)" : endMarkerCluster,
                              "Bezirke (Start)": geoJsonLayer
                            }
            var overLayStartCon = L.control.layers(baseMaps,overLaysStart);
            overLayStartCon.addTo(map);


            mainLayerGroup.addLayer(startMarkerLayer)
            .addLayer(startMarkerHeat)
            .addLayer(endMarkerLayer)
            .addLayer(endMarkerHeat)
            .addLayer(startMarkerCluster)
            .addLayer(endMarkerCluster)
            .addLayer(geoJsonLayer);
