document.addEventListener("DOMContentLoaded", function (event) {
    // Find all <p> and <li> elements on the page
    var elements = document.querySelectorAll("p, li");

    // Loop through each element
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var preserveWord = element.getAttribute("data-preserve");
        var text = element.textContent;

        // Only proceed if the "data-preserve" attribute is not present or is set to "false"
        if (preserveWord !== "true") {
            // Replace instances of "seppe", "guiseppe", and "seep" with the formatted version
            var newText = text.replace(/\b(seppe|guiseppe|seep|soup|soupy)\b/gi, '<span class="word-seppe">$1</span>');

            // Update the element if necessary
            if (newText !== text) {
                element.innerHTML = newText;
            }
        }
    }
});


/*

                <p>Here is a normal sentence with the word "seppe".</p>
                <p data-preserve="true">This sentence contains "seppe" and should not be changed.</p>
                <p>Another sentence with the word "seppe".</p>

*/



