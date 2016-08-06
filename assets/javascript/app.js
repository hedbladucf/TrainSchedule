/* GLABAL TRAIN COUNTER VARAIBLE */
var trainCounter = 0;
/* FUNCTION TO FIRE WHEN SUBMIT BUTTON IS PUSHED */
$(document).on("click", '#addTrain', function() {

  /* VARIABLES THAT GRABS DATA FROM FIELDS AND TRIMS */
  var nameGiven = $('#trainName').val().trim();
  var placeGiven = $('#place').val().trim();
  var timeGiven = $('#trainTime').val().trim();
  var freqGiven = $('#freq').val().trim();
  freqGiven = parseInt(freqGiven);

  /* TIME VARIABLES AND CALCULATIONS */
  var firstTimeConverted = moment(timeGiven, "HH:mm").subtract(1, "years");  
  var diffTime = moment.duration(moment().diff(moment(timeGiven, "HH:mm")), 'milliseconds').asMinutes();
  var timeRemaining = freqGiven - (Math.floor(diffTime) % freqGiven);
  var nextTrain = diffTime > 0 ? moment().add(timeRemaining, 'minutes' ) : moment(timeGiven, "HH:mm");
  var minTilTrain = Math.ceil(moment.duration(moment(nextTrain).diff(moment()), 'milliseconds').asMinutes());

  /* ROW VARIABLE THAT EACH COLUMN GETS ATTACHED TO */
  var row = $('<tr>');

  /* APPENDS THE INPUTTED TRAIN NAME TO THE TABLE ROW */
  var trainName = $('<td>');
  trainName.text(nameGiven);
  row.append(trainName);

  /* APPENDS THE GIVEN PLACE TO THE TABLE ROW */
  var trainPlace = $('<td>');
  trainPlace.text(placeGiven);
  row.append(trainPlace);

  /* APPENDS THE FORMATTED TRAIN-TIME TO THE TABLE ROW */
  var trainTime = $('<td>');
  trainTime.text(moment(nextTrain).format("HH:mm"));
  row.append(trainTime);

  /* APPENDS THE FREQUENCY IN MINUTES TO THE TABLE ROW */
  var trainFreq = $('<td>');
  trainFreq.text(freqGiven);
  row.append(trainFreq);

  /* APPENDS THE CALCULATED MINUTES-TO-NEXT-TRAIN TO THE TABLE ROW */
  var minutesUntilNext = $('<td>');
  minutesUntilNext.text(minTilTrain);
  row.append(minutesUntilNext);

  /* STORES INFORMATION IN LOCAL STORAGE */
  var trainLocalStorage = row.prop('outerHTML');
  console.log(trainLocalStorage);
  localStorage.setItem("data-train-" + trainCounter, trainLocalStorage);

  /* RESETTS THE INPUT FIELDS TO BE EMPTY */
  nameGiven = $('#trainName').val("");
  placeGiven = $('#place').val("");
  timeGiven = $('#trainTime').val("");
  freqGiven = $('#freq').val("");

  /* APPENDS THE DATA FROM LOCAL STORAGE TO THE TRAIN-TABLE, AND INCREMENTS THE trainCounter VARIABLE */
  $('#trainTable').append(trainLocalStorage);
  trainCounter++;

  return false;

});

/* FUNCTION THAT GETS ALL DATA IN LOCAL STORAGE AND APPENDS IT TO THE TRAIN TABLE AND INCREMENTS THE trainCounter VARIABLE */
$(document).ready(function() {

  for (var i = 0; i < localStorage.length; i++) {
    $('#trainTable').append(localStorage.getItem("data-train-" + trainCounter));
    trainCounter++;
  }
});