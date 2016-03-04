# A _really_ basic JS timer that self-corrects.

Use this however you wish.

`index.html` provides a simple timer example.
`index.js` is where the meat of the code is.

## How...?

Just create a new instance of **AccuTimer** and pass in options relevant to your html like so:

```javascript
// JS
var opts = {
  seconds: '#input-seconds',
  minutes: '#input-minutes',
  hours: '#input-hours',
  startButton: '#start-timer',
  resetButton: '#reset-timer',
};

var timer = new AccuTimer(opts);
```
```html
<!-- HTML -->
<input id="input-hours" />
<input id="input-minutes" />
<input id="input-seconds" />
<button id="start-timer">Start</button>
<button id="reset-timer">Reset</button>
```

## No dependencies

Nope, not even jQuery.

Although I've included the beautiful **Bulma** framework for the CSS in my html, this is absolutely not required.

## Thanks to...

Heavily inspired by _(just like most other accurate JS timers out there)_ James Edward's post here:

http://www.sitepoint.com/creating-accurate-timers-in-javascript/

Credit to the guy!
