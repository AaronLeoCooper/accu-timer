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

## No, I mean.. How does this work??

Oh.

For starters I'd _highly_ recommend having a look at [**James Edward's**](http://www.sitepoint.com/creating-accurate-timers-in-javascript/) fantastic article on the matter. He inspired me to create this micro-project, and many other web devs out there.

But the short version is: it uses Javascript's native ``setTimeout`` to perpetuate the timer, paired with some simple code to compare against Javascript's ``Date`` object and correct itself.

## No dependencies

Nope, not even jQuery.

Although I've included the beautiful **Bulma** framework for the CSS in my html, this is absolutely not required.

## Thanks to...

Heavily inspired by _(just like most other accurate JS timers out there)_ **James Edward's** post here:

http://www.sitepoint.com/creating-accurate-timers-in-javascript/

It's been around for a few years already, but still very useful. Credit to the guy!
