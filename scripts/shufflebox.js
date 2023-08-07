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
        'pages/html-shuffle/feesh-brain.html',
        'pages/html-shuffle/fish-plan.html',
        'pages/html-shuffle/stolen.html',
        'pages/html-shuffle/david_death.html',
        'pages/html-shuffle/fly_edible.html',
        'pages/html-shuffle/dorito-time.html',
        'pages/html-shuffle/loud-ward.html',
        'pages/html-shuffle/twinks.html',
        'pages/html-shuffle/drake-trash.html',
        'pages/html-shuffle/arizona.html',
        'pages/html-shuffle/doyoumissher.html',
        'pages/html-shuffle/snoopy-rave.html',
        'pages/html-shuffle/garfield.html',
        'pages/html-shuffle/crying_on_floor.html',
        'pages/html-shuffle/sigma-grintset.html',
        'pages/html-shuffle/stole-inch.html',
        'pages/html-shuffle/man-eat-fish.html',
        'pages/html-shuffle/brough.html',
        'pages/html-shuffle/tornado_courage.html',
        'pages/html-shuffle/link_burn.html',
        'pages/html-shuffle/sky_error.html',
        'pages/html-shuffle/jig-dirsty.html',
        'pages/html-shuffle/wheatley_power.html',
        'pages/html-shuffle/mort_russia.html',
        'pages/html-shuffle/Ender4Mod_agust7_2013.html',
        'pages/html-shuffle/whats_jiggy_thinking_about.html',
        'pages/html-shuffle/missing_couch.html',
        'pages/html-shuffle/LETMEOUT.html',
        'pages/html-shuffle/me_when_mango.html',
        'pages/html-shuffle/blood_test.html',
        'pages/html-shuffle/sus_nug.html',
        'pages/html-shuffle/mordecai_smooth_head.html',
        'pages/html-shuffle/how_to_say_hi_in_mandarin.html',
        'pages/html-shuffle/chad-geenie.html',
        'pages/html-shuffle/gang_bob.html',
        'pages/html-shuffle/scan_forehead.html',
        'pages/html-shuffle/jig-711-banned.html',
        'pages/html-shuffle/seep-coin.html',
        'pages/html-shuffle/muppets_get_real.html',
        'pages/html-shuffle/pizza_tower_description.html',
        'pages/html-shuffle/funny_turtle.html',
        'pages/html-shuffle/marty_mcfly.html',
        'pages/html-shuffle/annoying_orange_mariokart.html',
        'pages/html-shuffle/sponge_gun.html',
        'pages/html-shuffle/mortified_rugby.html'

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