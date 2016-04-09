
var countCalls = {
  "on-key-up" : 0,
  "with-debounce" : 0,
  "with-throttle" : 0
};

function getCities() {
  doAjaxCall("on-key-up");
  _.debounce(doAjaxCall, 1000)("with-debounce");
  _.throttle(doAjaxCall, 1000)("with-throttle");
}

function doAjaxCall(typeOfCall) {
  jQuery.getJSON(
    "http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+$("#city-input").val(),
    function (data) {
      showCities(data, typeOfCall);
      countCalls[typeOfCall] += 1;
    }
  );
}

function showCities(cityAry, typeOfCall) {
  $(".count-" + typeOfCall).text("Number of calls: " + countCalls[typeOfCall]);
  var ulByClass = $(".ul-" + typeOfCall);
  ulByClass.empty();
  cityAry.forEach(
    function (city) {
      if ($("#city-input").val() === "") {
        $("li").remove();
      } else if (city === "%s") {
        ulByClass.append("<li>Keep typing ...</li>")
      } else if (city === "") {
        ulByClass.append("<li>No cities found.</li>")
      } else {
        ulByClass.append("<li>" + city + "</li>");
      }
    }
  );
}
