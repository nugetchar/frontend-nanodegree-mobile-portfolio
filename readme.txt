Steps to launch the app: 
launch index.html

Steps for optimization (in views/js/main.js):
- resizePizzas function : simply refactor the code so you just have this : 

 // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
  function determineDx (elem, size) {
    var oldwidth = elem.offsetWidth;
    var windowwidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldsize = oldwidth / windowwidth;

    // TODO: change to 3 sizes? no more xl?
    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newsize = sizeSwitcher(size);
    var dx = (newsize - oldsize) * windowwidth;

    return dx;
  }

  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dx = determineDx(document.querySelectorAll(".randomPizzaContainer")[i], size);
      var newwidth = (document.querySelectorAll(".randomPizzaContainer")[i].offsetWidth + dx) + 'px';
      document.querySelectorAll(".randomPizzaContainer")[i].style.width = newwidth;
    }
  }

become this : 


  // Iterates through pizza elements on the page and changes their widths
  function changePizzaSizes(size) {
    var newwidth;
    switch(size) {
      case '1':
        newwidth = 25;
        break;
      case '2':
        newwidth = 33.3;
        break;
      case '3':
        newwidth = 50;
        break;
      default:
        console.log('bug in sizeSwitcher');
    }

    
    var pizzasContained = document.getElementsByClassName('randomPizzaContainer');
    
    for (var i = 0; i < pizzasContained.length; i++) {
      pizzasContained[i].style.width = newwidth + '%';
    }
  }




- Then this : 

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark('mark_start_frame');

  var items = document.getElementsByClassName('mover');

  /**
  NOTE FOR REVIEWER : you gave me a nicktip which was very efficient, but I
  do not understand how your code does the same thing ? Where is the '1250' value ?
  Why '* 100' for the first loop ?
  Also, how could you find this ? I mean, I don't understand 95% of the entire code, so how would I
  be able to do the same ?
  */
  /*for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }*/

  //Here's your niptick
  var phases = [];
  var scrollTop = document.body.scrollTop;

  for(var i=0; i<5; ++i){
    phases.push(Math.sin(scrollTop + i) * 100);
  }

  for (var i = 0, max = items.length; i < max; i++) {
    items[i].style.left = items[i].basicLeft + phases[i%5] + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark('mark_end_frame');
  window.performance.measure('measure_frame_duration', 'mark_start_frame', 'mark_end_frame');
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName('measure_frame_duration');
    logAverageFrame(timesToUpdatePosition);
  }
}


- And finally this, where we use innerHeight to dynamically load the right number of pizzas : 
// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
  var nbPizzas = (window.innerHeight/250) * 8;
  var cols = 8;
  var s = 256;
  for (var i = 0; i < nbPizzas; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = 'images/pizza.png';
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.getElementById('movingPizzas1').appendChild(elem);
  }
  updatePositions();
});
