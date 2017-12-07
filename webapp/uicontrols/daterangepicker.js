//Eventhandler und Optionen für Kalendersteuerelemet
$(function() {
  //  moment.locale('de');
  $('input[name="daterange"]').daterangepicker({
    startDate: '1. Jan \'17  00:00',
    timePicker: true,
    timePicker24Hour: true,
    //timePickerIncrement: 30,
    showCustomRangeLabel: false,
    alwaysShowCalendars: true,
    ranges: {
      'die letzten 24 Stunden': [moment().subtract('hours', 24), moment()],
      'die letzten 7 Tage': [moment().subtract('days', 7), moment()],
      'die letzten 30 Tage': [moment().subtract('days', 30), moment()],
      'die letzten 12 Monate': [moment().subtract('month', 12), moment()],
    },
    locale: {
      format: 'D. MMM \'YY  HH:mm',
      //  format: 'DD.MM.YYYY  H:mm',
      separator: '      -     ',
      //  language: 'de',
      monthNames: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ],
      daysOfWeek: [
        "So",
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa"
      ],
      applyLabel: 'Anwenden',
      cancelLabel: 'Abbrechen',
    }
  }, function(start, end, label) {
//    console.log("start :" + start + " end: " + end);
// Vorhandene Layergroups müssen "geleert" werden
    clearLayers(layerGroupClear);

    //Übergabe der UI-Werte an range()
    extractranges.range(start, end);

    //Nach Betätigung des Kalendersteuerelemnts müssen die Slider resetet werden
    $(document).ready(function() {
      var outputSpan = $("#spanOutputDays");
      $("#sliderDays").slider({
        values: [1, 7]
      })
      outputSpan.html("So" + "-" + "Sa");
    });
    $(document).ready(function() {
      var outputSpan = $("#spanOutputHours");
      $("#sliderHours").slider({
        values: [0, 23]
      })
      outputSpan.html(0 + "-" + 23);
});

  });
});
