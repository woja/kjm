document.getElementById("name_test").innerText = "keep going...";

var options = {

		// Transition speed (in ms)
		// For timing purposes only. It *must* match the transition speed of ".slider > article".
			speed: 1500,

		// Transition delay (in ms)
			delay: 4000

};

var	$window = $(window),
$this = $(this);


// Vars.
var	current = 0, pos = 0, lastPos = 0,
    slides = [],
    $slides = $this.children('article'),
    intervalId,
    isLocked = false,
    i = 0;

// Functions.
var preload = function (n) { 
    try {
        if(slides.length >= n && slides[n].hasClass('lazy_slider')) {
            var sliderImage = slides[n].find('img')[0];
            console.log(sliderImage);
            // We just do not want it to break the spinner...
            sliderImage.setAttribute('src', sliderImage.dataset.src);
            slides[n].removeClass('lazy_slider');
        }
    } catch(ex) {
        alert(ex);
    }
};

$this._switchTo = function(x, stop) {

    // Handle lock.
        if (isLocked || pos == x)
            return;

        isLocked = true;

    // Stop?
        if (stop)
            window.clearInterval(intervalId);

    // Update positions.
        lastPos = pos;
        pos = x;

    // Hide last slide.
        slides[lastPos].removeClass('top');

    // Show new slide.
        slides[pos].addClass('visible').addClass('top');

    // Pre-load the next slide
        preload(pos+1);

    // Finish hiding last slide after a short delay.
        window.setTimeout(function() {

            slides[lastPos].addClass('instant').removeClass('visible');

            window.setTimeout(function() {

                slides[lastPos].removeClass('instant');
                isLocked = false;

            }, 100);

        }, options.speed);

};

// Slides.
$slides
    .each(function() {

        var $slide = $(this);

        // Add to slides.
            slides.push($slide);

        i++;

    });

// Shuffle the slides so every visit is different!
for(let i = slides.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = slides[i]
        slides[i] = slides[j]
        slides[j] = temp
    }

// Pre-load the initial slide
preload(pos);

// Initial slide.
slides[pos]
    .addClass('visible')
    .addClass('top');
    
// If we will continue, pre-load the next slide!
preload(pos+1);

// Main loop.
intervalId = window.setInterval(function() {

    // Increment.
        current++;

        if (current >= slides.length)
            current = 0;

    // Switch.
        $this._switchTo(current);

}, options.delay);
