function extendObj(target, other) {
	if ( typeof target === "object" && typeof other === "object" ) {
		for ( var k in other ) {
			target[k] = other[k];
		}
	}
	return target;
}

var AccuTimer = function(opts) {

	var self = this;

	var defaults = {
		seconds: '',
		minutes: '',
		hours: '',
		startButton: '',
		resetButton: '',
	};

	var options = extendObj(defaults, opts);

	var el = {};
	el.S = document.querySelector(options.seconds);
	el.M = document.querySelector(options.minutes);
	el.H = document.querySelector(options.hours);

	//global timeout references we can use to stop them
	var timeout;

	//timer demo function with normal/self-adjusting argument
	var timer = function (morework) {

		//create the timer speed, a counter and a starting timestamp
		var speed = 50,
				counter = 0,
				start = new Date().getTime();

		//timer instance function
		var instance = function () {

			//if the morework flag is true
			//do some calculations to create more work
			if (morework) {
				for(var x=1, i=0; i<1000000; i++) { x *= (i + 1); }
			}

			//work out the real and ideal elapsed time
			var real = (counter * speed),
			ideal = (new Date().getTime() - start);

			//increment the counter
			counter++;

			//display the values
			// form.ideal.value = real;

			var totSeconds = Math.floor(ideal / 1000);

			var seconds = totSeconds % 60,
					minutes = Math.floor(totSeconds / 60) % 60;
					hours = Math.floor(totSeconds / 3600);

			el.S.value = seconds;
			el.M.value = minutes;
			el.H.value = hours;

			//calculate and display the difference
			var diff = (ideal - real);
			// form.diff.value = diff;

			// call next instance with 'correction'
			timeout = window.setTimeout(function() { instance(); }, (speed - diff));

		};

		//now kick everything off with the first timer instance
		timeout = window.setTimeout(function() { instance(); }, speed);

	}

	var actions = {
		start: function() {
			console.log('started');

			//call the timerdemo function with both flags true
			timer(true, true, '#input-current-time');

			//cancel the normal submit
			return false;
		},
		reset: function() {
			console.log('reseted');

			//stop the form's timer
			window.clearTimeout(timeout);

			//cancel the normal reset
			return false;
		},
	};

	document.querySelector(options.startButton).addEventListener('click', function() {
		actions.start();
	});

	document.querySelector(options.resetButton).addEventListener('click', function() {
		actions.reset();
	});

};


window.onload = function() {

	var opts = {
		seconds: '#input-seconds',
		minutes: '#input-minutes',
		hours: '#input-hours',
		startButton: '#start-timer',
		resetButton: '#reset-timer',
	};

	var timer = new AccuTimer(opts);

};
