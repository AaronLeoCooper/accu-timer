
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
		fullTime: '',
		startedAt: '',
	};

	var options = extendObj(defaults, opts);

	var seconds = 0,
			minutes = 0,
			hours = 0;

	var timeout;

	var validElStr = function(el) {
		return typeof el === "string" && el.length > 0;
	};

	var delimiters = [' ', ':', ',', '.']

	var format = function(format) {
		var formattedTime = hours+":"+minutes+":"+seconds;
		// TODO: implement masking feature to format the time correctly
		// consider using moment library for this??
		// if ( typeof format === "string" ) {
		// 	var mask = format.split(' ');
		// }
		return formattedTime;
	}

	var el = {};
	el.S = validElStr(options.seconds) ? document.querySelector(options.seconds) : null;
	el.M = validElStr(options.minutes) ? document.querySelector(options.minutes) : null;
	el.H = validElStr(options.hours) ? document.querySelector(options.hours) : null;
	el.fullTime = validElStr(options.fullTime) ? document.querySelector(options.fullTime) : null;
	el.startedAt = validElStr(options.startedAt) ? document.querySelector(options.startedAt) : null;

	//timer demo function with normal/self-adjusting argument
	var timer = function (morework) {

		//create the timer speed, a counter and a starting timestamp
		var speed = 50,
				counter = 0,
				start = new Date().getTime();

		el.startedAt.innerHTML = "Started at: " + start;

		// This is the main loop where the bulk of the logic takes place
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

			seconds = totSeconds % 60;
			minutes = Math.floor(totSeconds / 60) % 60;
			hours = Math.floor(totSeconds / 3600);

			if ( el.S ) el.S.value = seconds;
			if ( el.M ) el.M.value = minutes;
			if ( el.H ) el.H.value = hours;
			if ( el.fullTime ) el.fullTime.value = format('h:m:s');

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

	self.getTime = function(opts) {
		return hours + "h " + minutes + "m " + seconds + "s";
	};

	self.setTime = function(opts) {
		hours = opts.h;
		minutes = opts.h;
		seconds = opts.h;
	};

};

window.onload = function() {

	var opts = {
		seconds: '#input-seconds',
		minutes: '#input-minutes',
		hours: '#input-hours',
		startButton: '#start-timer',
		resetButton: '#reset-timer',
		fullTime: '#input-fulltime',
		startedAt: '#started-at',
	};

	var timer = new AccuTimer(opts);

};
