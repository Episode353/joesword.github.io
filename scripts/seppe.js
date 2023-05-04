// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function (event) {
    // Find all the text nodes on the page
    var textNodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    // Loop through each text node
    for (var i = 0; i < textNodes.snapshotLength; i++) {
        var node = textNodes.snapshotItem(i);
        var text = node.textContent;

        // Replace instances of "seppe", "guiseppe", and "seep" with the formatted version
        var newText = text.replace(/\b(seppe|guiseppe|seep)\b/gi, '<span class="word-seppe">$1</span>');

        // Update the text node if necessary
        if (newText !== text) {
            var newNode = document.createElement("span");
            newNode.innerHTML = newText;
            node.parentNode.replaceChild(newNode, node);
        }
    }
});