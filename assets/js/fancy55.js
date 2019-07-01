$(document).ready(function() {
  function turnOffDisplay() {
    $('.fancy--tube--element--active').removeClass('--tube--element--active');
    $('.fancy--digit--element--active').removeClass('fancy--digit--element--active');
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


  const render = function renderDisplay(string) {
    turnOffDisplay();
    const tubes = document.getElementsByClassName("fancy--tube");
    for (let i = 0; i < string.length; i += 1) {
      const code = isAlphabet(string.charCodeAt(i));
      const children = tubes[i].children;
      children[code].classList.add("fancy--tube--element--active");
    }
  };

  const input = "fancy";

  window.addEventListener("load", render(input));

  const fancy55 = function renderDigits(string) {
    turnOffDigits();
    const tubes = document.getElementsByClassName("fancy--digit");
    for (let i = 0; i < string.length; i += 1) {
      const int = parseInt(string[i]);
      const children = tubes[i].children;
      children[int].classList.add("fancy--digit--element--active");
    }
  }
  const twodigits = "55";
  window.addEventListener("load", fancy55(twodigits));
});

$(document).ready(function() {
  $('#inspire').on('submit', function(e){
    if(!valid) {
      e.preventDefault();
      alert('test function1');
    }
  });
  $('#inspire').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      alert('test enter code');
      event.preventDefault();
    }
  });
});
$("#inspire").submit(function(e){
  e.preventDefault();
  alert('test function3');
});
