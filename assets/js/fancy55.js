---
---
$(document).ready(function() {
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === underfined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  };
  function turnOffDisplay() {
    $('.fancy--tube--element--active').removeClass('fancy--tube--element--active');
  }
  function isBetween(n, a, b) {
    return (n - a) * (n - b) <= 0;
  }



  function isAlphabet(code, index) {
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
      const code = isAlphabet(string.charCodeAt(i), i);
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
  function homeFormHandler(event){
    event.preventDefault();
    const data = getFormData('#inspire');
    const get_messages = data.message.split(' ');
    const message_length = get_messages.length
    // Sets the reset timer for the logo
    setTimeout(function(){
      turnOffDisplay();
      turnOffDigits();
      renderDisplay("fancy");
      renderDigits("55");
    }, ((message_length * 500) + 1000));
    // Sets the increment timers for each word in the poem.
    $(get_messages).each(function(index, word) {
      var delay = ((index * 500)+250);
      var first5 = word.substring(0,5);
      var fiftyfive = word.substring(5,7);
      setTimeout(function(){
        turnOffDisplay();
        turnOffDigits();
        renderDisplay(first5);
        renderDigits(fiftyfive);
      }, ((index * 500) + 250));
    });
    // Resets the form to blank
    $('#inspire').find("input[type=text], textarea").val("");
  };

  $('#inspire').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      homeFormHandler(event);
    };
  });
  $('#inspire').submit(function(event){
    homeFormHandler(event);
  });
  function tubeRange(index) {
    // Provided with an index number for tube elements on page
    // IT will return an array containing all text elements they contain
    output = [];
    tubes = $('.fancy--tube');
    tube = tubes[index];
    tube_elements = $(tube).children()
    $(tube_elements).each(function(index, element) {
      output.push($(element).text().charCodeAt(0));
    });
  };
  tubeRange(0);
  tubeRange(5);
  tubeRange(1);
});
// Javascripts for the Advanced menu live here.

// Toggles the advanced mode display on, for changing site colour scheme
$(document).ready(function() {
  $('#colour-toggle').val(this.checked);
  $('#colour-toggle').change(function() {
    $('.colour').each(function(index, element) {
      $(element).toggleClass('hidden');
    });
    $('.invert').toggleClass('hidden');
    $('.reset').toggleClass('hidden');
  });

  function varGetterCSS(variable) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
  }
  function varSetterCSS(variable, value) {
    document.documentElement.style.setProperty(variable, value);
  }
  var colorInputs = $('input[type=color]');

  $(colorInputs).on('input propertychange', function() {
    var vCSS = "--" + $(this).attr('id');
    document.body.style.setProperty(vCSS, this.value);
  });

  // Invert Primary and Secondary Colours.
  var varPrimary = "--color-primary";
  var varPrimaryGlow = "--color-primary-glow";
  var varSecondary = "--color-secondary";
  var varSecondaryGlow = "--color-secondary-glow";
  var varAccent = "--color-accent";

  var primaryD = "{{site.color[0].hex}}";
  var primaryGlowD = "{{site.color[0].glow}}";
  var secondaryD = "{{site.color[1].hex}}";
  var secondaryGlowD = "{{site.color[1].glow}}";
  var accentD = "{{site.color[2].hex}}";

  const defaultStyle = {
    primary: {
      name: "{{site.color[0].title}}",
      hex: "{{site.color[0].hex}}",
      var: function() {
        return ("--color-" + this.name)}
    },
    glowprimary: {
      name: ("{{site.color[0].title}}" + "-glow"),
      hex: "{{site.color[0].glow}}",
      var: function() {
        return ("--color-" + this.name)}
    },
    secondary: {
      name: "{{site.color[1].title}}",
      hex: "{{site.color[1].hex}}",
      var: function() {
        return ("--color-" + this.name)}
    },
    glowsecondary: {
      name: ("{{site.color[1].title}}"+ "-glow"),
      hex: "{{site.color[1].glow}}",
      var: function() {
        return ("--color-" + this.name)}
    },
    accent: {
      name: "{{site.color[2].title}}",
      hex: "{{site.color[2].hex}}",
      var: function() {
        return ("--color-" + this.name)}
    }
  }
  function invert() {
    primary = varGetterCSS(defaultStyles.primary.var());
    console.log(primary);
    secondary = varGetterCSS(defaultStyles.secondary.var());
    console.log(secondary);
    varSetterCSS(defaultStyles.primary.var(), defaultStyles.secondary.hex);
    varSetterCSS(defaultStyles.secondary.var(), defaultStyles.primary.hex);

    gPrimary = varGetterCSS(defaultStyles.glowprimary.var());
    gSecondary = varGetterCSS(defaultStyles.glowsecondary.var());
    varSetterCSS(defaultStyles.glowprimary.var(), gSecondary);
    varSetterCSS(defaultStyles.glowsecondary.var(), gPrimary);
  };

  $('#invert').change(function() {
    const defaultStyles = {
      primary: {
        name: "{{site.color[0].title}}",
        hex: "{{site.color[0].hex}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      glowprimary: {
        name: ("{{site.color[0].title}}" + "-glow"),
        hex: "{{site.color[0].glow}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      secondary: {
        name: "{{site.color[1].title}}",
        hex: "{{site.color[1].hex}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      glowsecondary: {
        name: ("{{site.color[1].title}}"+ "-glow"),
        hex: "{{site.color[1].glow}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      accent: {
        name: "{{site.color[2].title}}",
        hex: "{{site.color[2].hex}}",
        var: function() {
          return ("--color-" + this.name)}
      }
    }
    primary = varGetterCSS(defaultStyles.primary.var());
    secondary = varGetterCSS(defaultStyles.secondary.var());
    varSetterCSS(defaultStyles.primary.var(), secondary);
    varSetterCSS(defaultStyles.secondary.var(), primary);

    gPrimary = varGetterCSS(defaultStyles.glowprimary.var());
    gSecondary = varGetterCSS(defaultStyles.glowsecondary.var());
    varSetterCSS(defaultStyles.glowprimary.var(), gSecondary);
    varSetterCSS(defaultStyles.glowsecondary.var(), gPrimary);
  });

  $('#reset').click(function(event) {
    const defaultStyles = {
      primary: {
        name: "{{site.color[0].title}}",
        hex: "{{site.color[0].hex}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      glowprimary: {
        name: ("{{site.color[0].title}}" + "-glow"),
        hex: "{{site.color[0].glow}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      secondary: {
        name: "{{site.color[1].title}}",
        hex: "{{site.color[1].hex}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      glowsecondary: {
        name: ("{{site.color[1].title}}"+ "-glow"),
        hex: "{{site.color[1].glow}}",
        var: function() {
          return ("--color-" + this.name)}
      },
      accent: {
        name: "{{site.color[2].title}}",
        hex: "{{site.color[2].hex}}",
        var: function() {
          return ("--color-" + this.name)}
      }
    };
    event.preventDefault();
    console.log(event);
    varSetterCSS(defaultStyles.primary.var(), defaultStyles.primary.hex);
    varSetterCSS(defaultStyles.secondary.var(), defaultStyles.secondary.hex);
    varSetterCSS(defaultStyles.glowsecondary.var(), defaultStyles.glowsecondary.hex);
    varSetterCSS(defaultStyles.glowprimary.var(), defaultStyles.glowprimary.hex);
    varSetterCSS(defaultStyles.accent.var(), defaultStyles.accent.hex);
  });
});
