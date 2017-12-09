/*
sliderhours.js
Eventhandler und Optionen für Slider Tagesabschnitt
version : 1.0.0
datum: 8.12.2017
autor : Martin Scholz
*/
(function() {
  $(document).ready(function() {
    var outputSpan = $("#spanOutputHours");
    outputSpan.html("0" + "-" + "23");
    $("#sliderHours").slider({
      range: true,
      min: 0,
      max: 23,
      values: [0, 23],
      slide: function(event, ui) {
        outputSpan.html(ui.values[0] + "-" + ui.values[1]);
        clearLayers(layerGroupClear);
        sliderHoursVal_s = ui.values[0];
        sliderHoursVal_e = ui.values[1];
        extractranges.hours(sliderHoursVal_s, sliderHoursVal_e);

        //createlayers.createHeatLayer();
      }
    });
  });
}());
