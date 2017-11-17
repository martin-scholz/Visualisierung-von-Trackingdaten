$(function() {
//  moment.locale('de');
  $('input[name="daterange"]').daterangepicker({
    startDate: '1. Jan \'17  00:00',
    timePicker: true,
    timePicker24Hour: true,
    //timePickerIncrement: 30,
    showCustomRangeLabel:false,
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
    //alert("A new date range was chosen: " + start.format('YYYY/MM/DD/h') + ' to ' + end.format('YYYY/MM/DD/h'));
    showDate(start.format('YYYY/MM/DD/HH/mm'), end.format('YYYY/MM/DD/HH/mm'));
    $(document).ready(function() {
      var outputSpan = $("#spanOutputDays");
      $("#sliderDays").slider({
        values: [1, 7]
      })
    });
    $(document).ready(function() {
      var outputSpan = $("#spanOutputHours");
      $("#sliderHours").slider({
        values: [0, 24]
      })
    });
  });
});
