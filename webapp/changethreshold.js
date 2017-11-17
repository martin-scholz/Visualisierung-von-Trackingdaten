$(document).ready(function() {
  $("#thresholdBtn.btn.btn-primary").click(function() {
    var data = {};
    data.threshold = $('#threshold.form-control').val();
    if ($.isNumeric(data.threshold)) {
      //alert(data.threshold);
      $.post('/updateThreshold', {
        threshold: data.threshold
      }).then(function(data) {
        window.location = data.redirectUrl;
        console.log(data.item.threshold);
      });
    } else {
      alert("Sie müssen eine Zahl eingeben!");
    }
  });
});
