Steps to launch the app: 
go to the "dist" folder
launch index.html

Steps to dev the app:
in a terminal, type the following:

go to the "dev" folder and edit any file you want.

  ``` bash
  $> cd /path/to/your-project-folder
  $> npm install --save-dev
  $> gulp
  ```

To see the steps for optimization, go at the end of the file.


## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!





####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>

### Optimization steps

Optimizations performed for index.html :
- inlined css
- media clause in the \<linK\> tag
- inlined CSS Fonts (in CSS)
- defered analytics.js
- asynced perfmatters.js

Optimizations for both index.html and pizza.html :
- images have been optimized with compressor.io since no gulp package seemed to do a correct work
- minification of css and js with gulp. You need ton install some packages : 

  ``` bash
  $> cd /path/to/your-project-folder
  $> npm install //or npm install --save-dev
  $> gulp
  ```

Production application will go to the "dist" folder.

Optimizations for pizza.html :
In style.css : 
 ``` css
 .mover {
  position: fixed;
  z-index: -1;
  height: 100px;
  width: 73.333px;
  /*Three lines added to increase performances
  with hardware accelerated CSS*/
  -webkit-backface-visibility: hidden; /* Chrome, Safari, Opera */
  backface-visibility: hidden;
  transform: translateZ(0); 
 }
 ```
 In main.js :

``` javascript
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
    
    for (var i = 0, len = pizzasContained.length; i < len; i++) {
      pizzasContained[i].style.width = newwidth + '%';
    }
  }




- Then this : 

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark('mark_start_frame');

  var items = document.getElementsByClassName('mover');


  /*for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }*/

  //Here's the optimization
  var phases = [];
  var scrollTop = document.body.scrollTop / 1250;

  for(var i=0; i<5; ++i){
    phases.push(Math.sin(scrollTop + i) * 100);
  }

  for (var i = 0, max = items.length; i < max; i++) {
    // items[i].style['transform'] = 'translateX(' + (items[i].basicLeft + phases[i%5]) + 'px)';
    //changed to : 
    items[i].style['transform'] = 'translateX(' +  phases[i%5] + 'px)';
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

  //elem var declaration outside the loop
  var  elem;
  //movingPizzas created to avoid redundant call
  var movingPizzas = document.getElementById('movingPizzas1');
  for (var i = 0; i < nbPizzas; i++) {
    elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = 'images/pizza.png';
    //elem.basicLeft = (i % cols) * s; changed to :
    elem.style.left = i % cols * s + 'px';
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    //document.getElementById('movingPizzas1').appendChild(elem);
    movingPizzas.appendChild(elem);
  }
  updatePositions();
});


```

