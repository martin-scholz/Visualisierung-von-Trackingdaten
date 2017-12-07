//Eventhandler und Optionen für Slider Wochenabschnitt
(function() {
  $(document).ready(function() {
    var outputSpan = $("#spanOutputDays");
    $("#sliderDays").slider({
      range: true,
      min: 1,
      max: 7,
      values: [ 1, 7],
      slide: function(event, ui) {

        switch (ui.values[0]) {
          case 1:
            day1 = "So";
            break;
          case 2:
            day1 = "Mo";
            break;
          case 3:
            day1 = "Di";
            break;
          case 4:
            day1 = "Mi";
            break;
          case 5:
            day1 = "Do";
            break;
          case 6:
            day1 = "Fr";
            break;
          case 7:
            day1 = "Sa";
        }
        switch (ui.values[1]) {
          case 1:
            day2 = "So";
            break;
          case 2:
            day2 = "Mo";
            break;
          case 3:
            day2 = "Di";
            break;
          case 4:
            day2 = "Mi";
            break;
          case 5:
            day2 = "Do";
            break;
          case 6:
            day2 = "Fr";
            break;
          case 7:
            day2 = "Sa";
        }

        outputSpan.html(day1 + "-" + day2);
        clearLayers(layerGroupClear);

        sliderDaysVal_s = ui.values[0] - 1;
        sliderDaysVal_e = ui.values[1] - 1;
        console.log("hour_s: " + sliderHoursVal_s);
        console.log("hour_e: " + sliderHoursVal_e);


      extractranges.days(sliderDaysVal_s,sliderDaysVal_e);
      
      }
    });
  });
}());
