/*
inputthreshold.js
Clickhandler zum Abschicken der Eingabe zur Schwellenwertänderung
version : 1.0.0
datum: 8.12.2017
author : Martin Scholz
*/

(function() {
  $(document).ready(function() {
    tooltipThreshold("#threshold.form-control");
    tooltipThreshold("#tooltip");

    $("#thresholdBtn.btn.btn-primary").click(function() {
      var data = {};
      data.threshold = $('#threshold.form-control').val();
      if ($.isNumeric(data.threshold) && data.threshold >= 0) {

      // POST-Request
        $.post('/updateThreshold', {
          threshold: data.threshold
        }).then(function(data) {
          window.location = data.redirectUrl;
          console.log(data.item.threshold);
        });
      } else {
        alert("Sie müssen eine Zahl eingeben, die größer als 0 ist!");
      }
    });
  });
}());
