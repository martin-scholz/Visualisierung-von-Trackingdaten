(function() {
  $(document).ready(function() {
    $("#thresholdBtn.btn.btn-primary").click(function() {
      var data = {};
      data.threshold = $('#threshold.form-control').val();
      if ($.isNumeric(data.threshold) && data.threshold >= 0) {
        //alert(data.threshold);
        $.post('/updateThreshold', {
          threshold: data.threshold
        }).then(function(data) {
          window.location = data.redirectUrl;
          //$(document).ready(function() {

          console.log(data.item.threshold);
          //  });
        });
      } else {
        alert("Sie müssen eine Zahl eingeben, die größer als 0 ist!");
      }
    });
  });
}());
