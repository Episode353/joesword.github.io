$(function () {
    var files = [
       'pages/html-shuffle/gunt-fish.html',
       'pages/html-shuffle/builder-dog.html',
       'pages/html-shuffle/blender-fish.html',
       'pages/html-shuffle/rat-night.html',
       'pages/html-shuffle/4chan_idiot.html',
       'pages/html-shuffle/wizard-ask.html',
       'pages/html-shuffle/seep-rule.html',
       'pages/html-shuffle/franken-doodle-episode.html',
       'pages/html-shuffle/guiseppe.html',
       'pages/html-shuffle/gallery-shuffle.html',
       'pages/html-shuffle/feesh-brain.html',
       'pages/html-shuffle/joes-basement-countdown.html'
    ];

    // Use the current time in milliseconds as a seed for the random number generator
    var seed = new Date().getTime();
    var random = function () {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    // Use the current time in milliseconds as a seed for the random number generator
    var seed = new Date().getTime();
    var random = function () {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    var randomFile = files[Math.floor(random() * files.length)]; // Pick a random file
    $("#htmlshufflebox").load(randomFile); // Load the random file into the div
});