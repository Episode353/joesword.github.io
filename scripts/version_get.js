const apiUrl = 'https://api.github.com/repos/Episode353/episode353.github.io/commits';
let versionNumber = 0;

function fetchCommits(page = 1) {
    fetch(`${apiUrl}?per_page=100&page=${page}`)
        .then(response => response.json())
        .then(data => {
            versionNumber += data.length;
            if (data.length === 100) {
                fetchCommits(page + 1);
            } else {
                document.getElementById('version').innerText = versionNumber;
            }
        })
        .catch(error => {
            console.error(error);
        });
}

fetchCommits();
