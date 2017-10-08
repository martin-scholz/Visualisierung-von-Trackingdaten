(function () {
  $(document).ready(function () {
    //var outputSpan = $("#spanOutputHours"); //not longer needed
    var mySlider = $("#sliderDays").bootstrapSlider({
      range: true,
      min: 1,
      max: 7,
      tooltip: 'always',
      handle: 'round'

    });
    var value = mySlider.bootstrapSlider('getValue');
    mySlider.bootstrapSlider('setValue', [1, 5]);
    //console.log(value);
    $("#sliderDays").on('slide', function (ev) {
        console.log(ev.value[1]);
        startMarkerLayer.clearLayers();
        endMarkerLayer.clearLayers();
        startMarkerHeat.clearLayers();
        endMarkerHeat.clearLayers();
        startClusterGroup.clearLayers();
        endClusterGroup.clearLayers();
        var pointsDay = [];
        sliderStartsDays = [];
        sliderDaysVal_s = ui.values[0] - 1;
        sliderDaysVal_e = ui.values[1] - 1;
        console.log("hour_s: " + sliderHoursVal_s);
        console.log("hour_e: " + sliderHoursVal_e);

        //console.log(startMarkerTwentyFourHours);
        //if(data.started <= new Datee().getTime()/1000 && data.started >= (new Date().getTime()/1000)-604800){
        //data.forEach(function(doc, err) {
        dataForSliders.forEach(function(doc, err) {
          point = [];
          if ((new Date(doc.started * 1000).getDay() >= ui.values[0] - 1 && new Date(doc.started * 1000).getDay() <= ui.values[1] - 1) &&
            //sliderStartsDays.push(doc.started);
            (new Date(doc.started * 1000).getHours() >= sliderHoursVal_s && new Date(doc.started * 1000).getHours() <= sliderHoursVal_e)) {
            console.log("Bedingung erfüllt");
            if (doc.route[0] == null) {
              lat = 52.521079;
              lng = 13.378048;
            } else {
              var lat = parseFloat(doc.route[0].latitude);
              var lng = parseFloat(doc.route[0].longitude);
              console.log("lat: ")
              point.push(lat);
              point.push(lng);
              pointsDay.push(point);
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              //console.log(pointsTwentyFour.length);
              marker = L.marker(point, {
                icon: yellowIcon
              });
              //marker = getPopup(marker, lat, lng, bicycle_uuid,"start", started);
              marker.addTo(startMarkerLayer);
              marker = getPopup(marker, lat, lng, bicycle_uuid, "start", started, speed, 0.9);
              startClusterGroup.addLayer(marker);
              startMarkerCluster.addLayer(startClusterGroup);
            }



          } else {
            console.log("no data available");
          }
        });
        //map.addLayer(markerAverageDays);
        startHeatmap = showHeatMap(pointsDay);
        startMarkerHeat.addLayer(startHeatmap);






    });
  });
}());
