$(document).ready(function() {
  $("#bikeIdBtn.btn.btn-primary").click(function() {
    //var regex = /[0-9a-z]{8}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{4}\-[0-9a-z]{12}/;
    var regex = /([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i;
    if (regex.test($('#bikeId.form-control').val())) {
      //$('#bikeId.form-control').tooltip();
      single.singleTrack($("#bikeId.form-control").val());
      //$('#bikeId.form-control').tooltip("disable");
    } else {
      alert("Sie haben eine falsche Eingabe gemacht! Ihre Eingabe muss folgendes Format haben:" + "\n93fed1b3-b28f-4ed8-a4c4-4fe450873f85");
    }
  });
});
