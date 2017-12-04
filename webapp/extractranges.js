var  extractranges = {
  range: function(pickerVal_start, pickerVal_end) {
    dataForSliders = [];
    data.forEach(function(doc, err) {

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
          var bicycle_uuid = (doc.bicycle_uuid);
          var started = getDate(doc.started);
          var ended = getDate(doc.ended);
          var speed = getSpeed(doc.duration_sec, doc.distance_m);
          createlayers.createLayers(s_lat, s_lng, e_lat, e_lng, bicycle_uuid, started, ended, speed)
        }

      } else {
        console.log("no data available");
      }
    });
    createlayers.createHeatLayer();
    map.addLayer(startMarkerLayer);
  },

  hours: function(sliderHoursVal_s, sliderHoursVal_e){
    dataForSliders.forEach(function(doc, err) {

      if ((new Date(doc.started * 1000).getHours() >= sliderHoursVal_s && new Date(doc.started * 1000).getHours() <= sliderHoursVal_e) &&
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

  },
    days: function(sliderDaysVal_s, sliderDaysVal_e){
      dataForSliders.forEach(function(doc, err) {
        s_point = [];
        e_point = [];
        if ((new Date(doc.started * 1000).getDay() >= sliderDaysVal_s && new Date(doc.started * 1000).getDay() <= sliderDaysVal_e) &&
          (new Date(doc.started * 1000).getHours() >= sliderHoursVal_s && new Date(doc.started * 1000).getHours() <= sliderHoursVal_e)) {
          console.log("StartzeitenDays: " + (getDate(doc.started)));
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
            createlayers.createLayers(s_lat, s_lng,e_lat, e_lng,bicycle_uuid, started,ended, speed, );
          }
        } else {
          console.log("no data available");
        }
      });

    }

};
