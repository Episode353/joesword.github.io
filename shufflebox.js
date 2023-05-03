$(function () {
    var files = [
        'pages/html-shuffle/gunt-fish.html',
        'pages/html-shuffle/builder-dog.html',
        'pages/html-shuffle/blender-fish.html',
        'pages/html-shuffle/rat-night.html',
        'pages/html-shuffle/4chan_idiot.html',
        'pages/html-shuffle/wizard-ask.html',
        'pages/html-shuffle/seep-rule.html',
        'pages/html-shuffle/guiseppe.html',
        'pages/html-shuffle/joes-basement-countdown.html'
    ];

    var randomFile = files[Math.floor(Math.random() * files.length)]; // Pick a random file
    $("#htmlshufflebox").load(randomFile); // Load the random file into the div
});