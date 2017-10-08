
     var googleLayer = new L.Google('SATELLITE');

     var map = L.map('map', {layers: [googleLayer], maxZoom:20}).setView([52.521079,13.378048], 13);

     var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
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
        iconUrl: 'http://localhost:3000/images/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
      var redIcon = new L.Icon({
        iconUrl: 'http://localhost:3000/images/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
      var yellowIcon = new L.Icon({
        iconUrl: 'http://localhost:3000/images/marker-icon-2x-yellow.png',
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

        var startMarkerTimeRange = new L.LayerGroup();
        var startMarkerTimeRange = new L.LayerGroup();
        var startMarkerTimeRangeHeat= new L.LayerGroup();
        var startMarkerTimeRangeCluster = new L.LayerGroup();
        var endMarkerTimeRangeLayer = new L.LayerGroup();
        var endMarkerTimeRangeHeat = new L.LayerGroup();
        var endMarkerTimeRangeCluster = new L.LayerGroup();

        var mainLayerGroup = new L.LayerGroup();
        var startClusterGroup = new L.MarkerClusterGroup();
        var endClusterGroup = new L.MarkerClusterGroup();
        var startMarkerHeat = new L.LayerGroup();//HeatmapLayer
        var endMarkerHeat = new L.LayerGroup();//HeatmapLayer
        var startHeatmap;
        var startMarkerCluster = new L.LayerGroup();
        var endMarkerCluster = new L.LayerGroup();
        var endHeatmap = true;
        var overLaysStart;
        var overLaysTimeRange;
        var overLayTimeRangeCon;
        var data = [];
        var pointsArray =[];
        var polylineOptions = {
               color: 'blue',
               weight: 6,
               opacity: 0.9
             };
        var pickerVal_start;
        var pickerVal_end;

        $("#myFilterSelect").val("Alle");
        $.getJSON('/trackdata',function(result){

          data = result;
          var points =[];

          var boundaryPoints = [];
          //console.log(data);
        data.forEach(function(doc,err){
        var point=[];
        console.log("reached");
        console.log(doc);

        if(doc.route[0]==null){
              lat=52.521079;
              lng=13.378048;
            }else{
        var lat = parseFloat(doc.route[0].latitude);
        var lng = parseFloat(doc.route[0].longitude);
                  point.push(lat);
                  point.push(lng);

        var bicycle_uuid = (doc.bicycle_uuid);
        var started = getDate(doc.started);
        console.log(bicycle_uuid);
        points.push(point);
        marker = L.marker(point,{icon: blueIcon});

        marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
        marker.addTo(startMarkerLayer);
        startClusterGroup.addLayer(marker);



        }
        });
        startHeatmap = showHeatMap(points);
        startMarkerHeat.addLayer(startHeatmap);
        startMarkerCluster.addLayer(startClusterGroup);
        ends(data);
});
        function getStarts(data){
          return marker;
        }

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
              //marker.url = 'single';

              marker.setOpacity(0.9)
                    .bindPopup("Lat: " + lat +"\nlng: " + lng +"\nbikeId: "  + bicycle_uuid + "\n" + label + "ed: " + startend)
                    .on('mouseover', function (e) { this.openPopup();})
                    .on('click', function (e) { //window.open(this.url);

                                                singleTrack(bicycle_uuid);
                                                console.log("eins");
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


            $( "#myFilterSelect" ).change(function() {
          //map.removeLayer(startMarkerTwentyFourHours);
          var option = $('#myFilterSelect option:selected').val();
          if(option == "Alle"){
            map.removeLayer(startMarkerTimeRange);
            if(overLayTimeRangeCon){
              map.removeControl(overLayTimeRangeCon);
              $('#divcal').hide();
              $('#divslider1').hide();
              overLayStartCon.addTo(map);
            }
            if(overLayStartCon){
              map.removeControl(overLayStartCon);
              $('#divcal').hide();
              $('#divslider1').hide();
              overLayStartCon.addTo(map);


            }
            else{
              $('#divfilter').show();
              $('#divslider1').hide();
              $('#divcal').hide();
            overLayStartCon.addTo(map);
            }
          }

          if(option == "Zeitraumsuche"){
            map.removeLayer(startMarkerLayer);
            map.removeLayer(startMarkerTwentyFourHours);
            map.removeLayer(startMarkerHeat);
            map.removeLayer(endMarkerLayer);
            map.removeLayer(endMarkerHeat);
            map.removeLayer(startMarkerCluster);
            map.removeLayer(endMarkerCluster);
            map.removeLayer(geoJsonLayer);
          map.removeControl(overLayStartCon);
          overLayStartCon.addTo(map);
            $('#divfilter').show();
            $('#divslider1').hide();
            $('#divcal').show();
          }


          if(option == "Tageszeiten/Wochentag"){
            map.removeControl(overLayStartCon);
            $('#divfilter').show();
            $('#divslider1').show();
            $('#divcal').hide();

          }
          if(option == "Tracksuche über FahrradId"){
            map.removeControl(overLayStartCon);
            overLayStartCon.addTo(map);

            $('#divfilter').show();
            $('#divslider1').hide();
            $('#divcal').hide();
          }



  });

jQuery.datetimepicker.setLocale('de')

jQuery('#some_class_1').datetimepicker({

 timepicker:true,
 format:'Y-m-d/H',
 onChangeDateTime:function(dp,$input){
   var str =$input.val();
   //var res = str.split(" ");
    //var d = Date.UTC(str.split(',').map(function(i){
    var c = str.split('-').map(function(i){
    return parseInt(i, 10);
  });
    var d = str.split('/').map(function(i){
    return parseInt(i, 10);
    //var d = new Date($input.val());

  });
  pickerVal_start =  Date.UTC(c[0],c[1]-1,c[2],d[1]-2);
  console.log(str);
  console.log(pickerVal_start);
   }
  });
jQuery('#some_class_2').datetimepicker({

 timepicker:true,
 format:'Y-m-d/H',
 onChangeDateTime:function(dp,$input){
   var str =$input.val();
   var c = str.split('-').map(function(i){
   return parseInt(i, 10);
 });
   var d = str.split('/').map(function(i){
   return parseInt(i, 10);
   //var d = new Date($input.val());

 });
  pickerVal_end =  Date.UTC(c[0],c[1]-1,c[2],d[1]-2);
  console.log(str);
  console.log(pickerVal_end);
   }
  });
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
$("#timesearch").click(function(){
  if(startMarkerTimeRange){
    console.log("has Layer");
    startMarkerTimeRange.clearLayers();
    map.removeLayer(startMarkerTimeRange);
    getLayerTimeRange();
  }else{
    getLayerTimeRange();
    console.log("has no Layer");
  }

});
function getLayerTimeRange() {
//map.removeLayer
data.forEach(function(doc,err){
  point = [];
  console.log("Anfang: " +pickerVal_start/1000 + "Ende: "+ pickerVal_end/1000);
  if(doc.started <= (pickerVal_end/1000) && doc.started >= (pickerVal_start/1000)){
    console.log(getDate(doc.started));
    if(doc.route[0]==null){
          lat=52.521079;
          lng=13.378048;
        }else{
    var lat = parseFloat(doc.route[0].latitude);
    var lng = parseFloat(doc.route[0].longitude);
              point.push(lat);
              point.push(lng);
  pointsArray.push(point);
  //console.log(pointsTwentyFour.length);
  marker = L.marker(point,{icon: yellowIcon});
  //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
  marker.addTo(startMarkerTimeRange);

}

}else{
  console.log("no data available");
}
});
map.addLayer(startMarkerTimeRange);
var overLaysTimeRange = {
                  "Marker (Start)" : startMarkerTimeRange,
                  "Heatmap (Start)" : startMarkerTimeRangeHeat,
                  "MarkerCluster (Start)" : startMarkerTimeRangeCluster,
                  "Marker (End)" : endMarkerTimeRangeLayer,
                  "Heatmap (End)" : endMarkerTimeRangeHeat,
                  "MarkerCluster (End)" : endMarkerTimeRangeCluster,
                  "Bezirke (Start)": geoJsonLayer
                }
map.removeControl(overLayStartCon);
overLayTimeRangeCon = L.control.layers(baseMaps,overLaysTimeRange);
overLayTimeRangeCon.addTo(map);
}




// jQuery('#some_class_2').datetimepicker({
//   timepicker:true,
//   onChangeDateTime:function(dp,$input){
//    var pickerVal_end = $input.val();
//    var d = Date.UTC($input.val());
//    console.log(pickerVal_end);
//   }
// })
