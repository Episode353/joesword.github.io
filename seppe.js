document.addEventListener("DOMContentLoaded", function () {
    // Get all text nodes in the page
    let walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    // Loop through all text nodes
    while (walker.nextNode()) {
        let node = walker.currentNode;
        let text = node.textContent;

        // Find all occurrences of the word "seppe"
        let regex = /seppe/gi;
        let match;
        while (match = regex.exec(text)) {
            // Check if the matched word is inside an element with the class "word-seppe"
            let insideWordSeppe = false;
            let parentElement = node.parentNode;
            while (parentElement && parentElement !== document.body) {
                if (parentElement.classList.contains("word-seppe")) {
                    insideWordSeppe = true;
                    break;
                }
                parentElement = parentElement.parentNode;
            }
            if (insideWordSeppe) {
                continue; // Skip this match if it's already inside a "word-seppe" element
            }

            // Create a new element to wrap around the matched word
            let span = document.createElement("span");
            span.textContent = match[0];
            span.classList.add("word-seppe");

            // Replace the original matched word with the new wrapped element
            let wordStart = match.index;
            let wordEnd = match.index + match[0].length;
            let prefix = text.slice(0, wordStart);
            let suffix = text.slice(wordEnd);
            if (prefix.length > 0) {
                node.parentNode.insertBefore(document.createTextNode(prefix), node);
            }
            node.parentNode.insertBefore(span, node);
            if (suffix.length > 0) {
                node.textContent = suffix;
            } else {
                node.parentNode.removeChild(node);
            }

            // Update the walker to start from the end of the inserted span element
            walker.currentNode = node.previousSibling;
        }
    }
});
