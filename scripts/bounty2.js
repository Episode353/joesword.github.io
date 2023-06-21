// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCqgWyZOOfVZddqVjV-ZsDpMo6b0F1UJxs",
    authDomain: "joesworldonline-967be.firebaseapp.com",
    databaseURL: "https://joesworldonline-967be-default-rtdb.firebaseio.com",
    projectId: "joesworldonline-967be",
    storageBucket: "joesworldonline-967be.appspot.com",
    messagingSenderId: "817241549916",
    appId: "1:817241549916:web:787af20d01f9172efaca99"
};

firebase.initializeApp(firebaseConfig);

// Get references to the bounty database for each tier
var tier1Ref = firebase.database().ref('Bounty/Tier1');
var tier2Ref = firebase.database().ref('Bounty/Tier2');
var tier3Ref = firebase.database().ref('Bounty/Tier3');
var tier4Ref = firebase.database().ref('Bounty/Tier4');
var tier5Ref = firebase.database().ref('Bounty/Tier5');

// Retrieve the rewards from the database for each tier
retrieveRewards(tier1Ref, 'reward-dropdown-tier1', 'start-bounty-tier1', 'tier_one_task_box', 'tier_one_time');
retrieveRewards(tier2Ref, 'reward-dropdown-tier2', 'start-bounty-tier2', 'tier_two_task_box', 'tier_two_time');
retrieveRewards(tier3Ref, 'reward-dropdown-tier3', 'start-bounty-tier3', 'tier_three_task_box', 'tier_three_time');
retrieveRewards(tier4Ref, 'reward-dropdown-tier4', 'start-bounty-tier4', 'tier_four_task_box', 'tier_four_time');
retrieveRewards(tier5Ref, 'reward-dropdown-tier5', 'start-bounty-tier5', 'tier_five_task_box', 'tier_five_time');

// Check for ended bounties on startup
checkEndedBounties(tier1Ref);
checkEndedBounties(tier2Ref);
checkEndedBounties(tier3Ref);
checkEndedBounties(tier4Ref);
checkEndedBounties(tier5Ref);

function retrieveRewards(ref, dropdownId, startButtonId, taskBoxId, timeBoxId) {
    ref.once('value', function (snapshot) {
        var rewards = snapshot.val();
        var dropdown = document.getElementById(dropdownId);
        var startButton = document.getElementById(startButtonId);
        var taskBox = document.getElementById(taskBoxId);
        var timeBox = document.getElementById(timeBoxId);

        // Check if there is an active bounty for the tier
        var activeBounty = null;
        var activeBountyKey = null;
        for (var key in rewards) {
            if (rewards.hasOwnProperty(key)) {
                var bounty = rewards[key];
                var currentTime = Date.now();

                // Check if the bounty is active
                if (bounty.StartTime <= currentTime && currentTime <= bounty.EndTime) {
                    activeBounty = bounty;
                    activeBountyKey = key;
                    break;
                }
            }
        }
        if (activeBounty) {
            // Disable the dropdown and show active bounty details
            dropdown.disabled = true;
            dropdown.value = activeBounty.Reward;
            taskBox.value = activeBounty.Task;

            // Update the time left every second
            var intervalId = setInterval(function () {
                var timeLeft = activeBounty.EndTime - Date.now();

                // Check if the bounty has ended
                if (timeLeft <= 0) {
                    clearInterval(intervalId);
                    deleteBounty(ref, activeBountyKey); // Delete the bounty
                    return;
                }

                var secondsLeft = Math.floor((timeLeft / 1000) % 60);
                var minutesLeft = Math.floor((timeLeft / 1000 / 60) % 60);
                var hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                var daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

                var timeLeftString =
                    'Time Left: ' +
                    daysLeft +
                    ' days, ' +
                    hoursLeft +
                    ' hours, ' +
                    minutesLeft +
                    ' minutes, ' +
                    secondsLeft +
                    ' seconds';
                timeBox.textContent = timeLeftString;

                // Update the shown reward with the active bounty reward
                dropdown.value = activeBounty.Reward;
            }, 10);
        } else {
            // Enable the dropdown for selecting a new bounty
            dropdown.disabled = false;
            taskBox.value = "";

            // Check if the tier has any inactive bounties
            var hasInactiveBounties = false;
            for (var key in rewards) {
                if (rewards.hasOwnProperty(key)) {
                    var bounty = rewards[key];
                    var currentTime = Date.now();

                    // Check if the bounty is inactive
                    if (bounty.StartTime > currentTime || currentTime > bounty.EndTime) {
                        hasInactiveBounties = true;
                        break;
                    }
                }
            }

            // Show the "Start Bounty" button for tiers with no active bounties
            if (!hasInactiveBounties) {
                startButton.style.display = "inline-block";
                startButton.addEventListener('click', function () {
                    startBounty(ref, dropdown.value);
                });
            } else {
                startButton.style.display = "none";
            }
        }

        // Clear existing options from the dropdown
        dropdown.innerHTML = "";

        // Iterate through the rewards and add them to the dropdown
        for (var key in rewards) {
            if (rewards.hasOwnProperty(key)) {
                var reward = rewards[key].Reward;
                var option = document.createElement('option');
                option.text = reward;
                dropdown.add(option);
            }
        }
    });
}

// Function to start a bounty with appropriate start and end time
function startBounty(ref, selectedBountyKey) {
    var selectedBountyRef = ref.child(selectedBountyKey);
    var currentTime = Date.now();

    // Retrieve the bounty length from the database
    selectedBountyRef.once('value', function (snapshot) {
        var selectedBounty = snapshot.val();
        var bountyLength = selectedBounty.Length; // Get the length of the bounty from the database

        // Calculate the start and end time for the bounty
        var startTime = currentTime;
        var endTime = currentTime + bountyLength * 60 * 60 * 1000; // Convert hours to milliseconds

        // Update the bounty with the new start and end time
        selectedBountyRef
            .update({
                StartTime: startTime,
                EndTime: endTime,
            })
            .then(function () {
                // Reload the page after updating the bounty
                location.reload();
            })
            .catch(function (error) {
                console.error('Failed to start bounty:', error);
            });
    });
}

// Function to delete a bounty
function deleteBounty(ref, bountyKey) {
    ref.child(bountyKey)
        .remove()
        .then(function () {
            // Reload the page after deleting the bounty
            location.reload();
        })
        .catch(function (error) {
            console.error('Failed to delete bounty:', error);
        });
}

// Function to check for ended bounties and delete them
function checkEndedBounties(ref) {
    ref.once('value', function (snapshot) {
        var bounties = snapshot.val();
        var currentTime = Date.now();

        for (var key in bounties) {
            if (bounties.hasOwnProperty(key)) {
                var bounty = bounties[key];
                if (bounty.EndTime <= currentTime) {
                    deleteBounty(ref, key); // Delete the ended bounty
                }
            }
        }
    });
}
