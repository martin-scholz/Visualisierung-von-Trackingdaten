/*
inputbikeid.js
Clickhandler zum Abschicken der Eingabe einer Fahrrad-Id
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/

(function() {
$(document).ready(function() {
  $("#bikeIdBtn.btn.btn-primary").click(function() {
//Regulärer Ausdruck zur Eingabeüberprüfung
    var regex = /([a-f\d]{8}(-[a-f\d]{4}){3}-[a-f\d]{12}?)/i;
    if (regex.test($('#bikeId.form-control').val())) {
      //Übergabe des Eingabewertes an singleTrack()
      route.singleTrack($("#bikeId.form-control").val());

    } else {
      alert("Sie haben eine falsche Eingabe gemacht! Ihre Eingabe muss folgendes Format haben:" + "\n93fed1b3-b28f-4ed8-a4c4-4fe450873f85");
    }
  });
});
}());
