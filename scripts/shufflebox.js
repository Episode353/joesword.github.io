$(function () {

    // Check if the shuffle parameter is present in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const shufflePage = urlParams.get('shuffle');

    if (shufflePage) {
        const filePath = `pages/html-shuffle/${shufflePage}`;
        // Load the specified page indicated by the shuffle parameter
        $("#htmlshufflebox").load(filePath);
    } else {
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
        'pages/html-shuffle/joe_biden_flying.html',
        'pages/html-shuffle/wojack_overgrown.html',
        'pages/html-shuffle/sep_language.html',
        'pages/html-shuffle/fldsmdfr.html',
        'pages/html-shuffle/shitsnotgoingsowell.html',
        'pages/html-shuffle/spongebob_amongus_bottle.html',
        'pages/html-shuffle/your_formula_sir.html',
        'pages/html-shuffle/cole-slaw.html',
        'pages/html-shuffle/simple_dog.html',
        'pages/html-shuffle/kill_seppe.html',
        'pages/html-shuffle/ash_ketchup.html',
        'pages/html-shuffle/claw_hands.html',
        'pages/html-shuffle/heavy-mcqueen.html',
        'pages/html-shuffle/listenman.html',
        'pages/html-shuffle/eepys.html',
        'pages/html-shuffle/package_death.html',
        'pages/html-shuffle/dog_dance.html',
        'pages/html-shuffle/among_chicken.html',
        'pages/html-shuffle/apple-store-mong.html',
        'pages/html-shuffle/berryboy.html',
        'pages/html-shuffle/red-door.html',
        'pages/html-shuffle/ramen_crazy.html',
        'pages/html-shuffle/door_monster.html',
        'pages/html-shuffle/defeat.html',
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



        var seed = new Date().getTime();
        var random = function () {
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        var randomFile = files[Math.floor(random() * files.length)];
        $("#htmlshufflebox").load(randomFile);
    }
});