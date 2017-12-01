(function() {
  $(document).ready(function() {
    var outputSpan = $("#spanOutputHours");
    $("#sliderHours").slider({
      range: true,
      min: 0,
      max: 24,
      values: [0, 24],
      slide: function(event, ui) {
        outputSpan.html(ui.values[0] + "-" + ui.values[1]);
        clearLayers(layerGroupClear);
        sliderHoursVal_s = ui.values[0];
        sliderHoursVal_e = ui.values[1];

        dataForSliders.forEach(function(doc, err) {

          if ((new Date(doc.started * 1000).getHours() >= ui.values[0] && new Date(doc.started * 1000).getHours() <= ui.values[1]) &&
            (new Date(doc.started * 1000).getDay() >= sliderDaysVal_s && new Date(doc.started * 1000).getDay() <= sliderDaysVal_e)) {
            if (doc.route[0] == null) {
              lat = null;
              lng = null;
            } else {
              var s_lat = parseFloat(doc.route[0].latitude);
              var s_lng = parseFloat(doc.route[0].longitude);
              var e_lat = parseFloat(doc.route[doc.route.length - 1].latitude);
              var e_lng = parseFloat(doc.route[doc.route.length - 1].longitude);
              var bicycle_uuid = (doc.bicycle_uuid);
              var started = getDate(doc.started);
              var ended = getDate(doc.ended);
              var speed = getSpeed(doc.duration_sec, doc.distance_m);
              createlayers.createLayers(s_lat, s_lng, e_lat, e_lng, bicycle_uuid, started, ended, speed);
            }

          } else {
            console.log("no data available");
          }
        });
        createlayers.createHeatLayer();
      }
    });
  });
}());
