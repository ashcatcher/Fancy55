$(document).ready(function() {
  function turnOffDisplay() {
    $('.fancy--tube--element--active').removeClass('fancy--tube--element--active');
  }
  function isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0;
  }

  function isAlphabet(code) {
    if (isBetween(code, 65, 90)) {
      return code - 65;
    }
    if (isBetween(code, 97, 122)) {
      return code - 97;
    }
    return 5;
  }
  function turnOffDigits() {
    $('.fancy--digit--element--active').removeClass('fancy--digit--element--active');
  }
  function renderDisplay(string) {
    turnOffDisplay();
    const tubes = document.getElementsByClassName("fancy--tube");
    for (let i = 0; i < string.length; i += 1) {
      const code = isAlphabet(string.charCodeAt(i));
      const children = tubes[i].children;
      children[code].classList.add("fancy--tube--element--active");
    }
  };

  function renderDigits(string) {
    turnOffDigits();
    const tubes = document.getElementsByClassName("fancy--digit");
    for (let i = 0; i < string.length; i += 1) {
      const int = parseInt(string[i]);
      const children = tubes[i].children;
      children[int].classList.add("fancy--digit--element--active");
    }
  }
  window.addEventListener("load", renderDisplay("fancy"));
  window.addEventListener("load", renderDigits("55"));

  function getFormData(dom_query){
    var out = {};
    var s_data = $(dom_query).serializeArray();
    //transform into simple data/value object
    for(var i = 0; i<s_data.length; i++){
      var record = s_data[i];
      out[record.name] = record.value;
    }
    return out;
  }
  $('#inspire').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      event.preventDefault();
      const data = getFormData('#inspire');
      const get_messages = data.message.split(' ');
      console.log(get_messages);
      var delay = 0
      $(get_messages).each(function(index, value) {
        console.log(index);
        var delay = index * 500;
        //window.setTimeout(turnOffDisplay(), delay);
        setTimeout(function(){
          turnOffDisplay();
          renderDisplay(value);
          console.log(value);
        }, delay);
        console.log(delay);
      });
      //turnOffDisplay();
      $(this).find("input[type=text], textarea").val("");
    };
  });
});
