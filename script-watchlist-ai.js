// Load items from localStorage
document.addEventListener('DOMContentLoaded', function(e) {
    var watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    for (var i = 0; i < watchlist.length; i++) {
        addItemToDOM(watchlist[i]);
    }
});

document.getElementById('watchlistForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var title = document.getElementById('title').value;
    var image = document.getElementById('image').value;
    var availableOn = document.getElementById('availableOn').value;
    var episode = document.getElementById('episode').value || 'N/A';
    var viewer = document.getElementById('viewer').value;
    var dateWatched = document.getElementById('dateWatched').value;
    var rating = document.getElementById('rating').value;

    // Basic Data Validation
    if(title === "" || availableOn === "" || viewer === "" || dateWatched === "" || rating === "" || rating < 1 || rating > 10) {
        alert("Please fill out all fields correctly.");
        return;
    }

    var item = {
        title: title,
        image: image,
        availableOn: availableOn,
        episode: episode,
        viewer: viewer,
        dateWatched: dateWatched,
        rating: rating
    };

    addItemToDOM(item);

    // Save to localStorage
    var watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.push(item);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
});

function addItemToDOM(item) {
    var watchlist = document.getElementById('watchlist');
    var div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
        <h2>${item.title}</h2>
        <img src="${item.image}" onError="this.onerror=null; this.src='https://via.placeholder.com/150';">
        <p>Available On: ${item.availableOn}</p>
        <p>Episode: ${item.episode}</p>
        <p>Viewer: ${item.viewer}</p>
        <p>Date Watched: ${item.dateWatched}</p>
        <p>Rating: ${item.rating}</p>
        <button class="delete">Delete</button>
    `;
    watchlist.appendChild(div);

    // Delete button event listener
    div.querySelector('.delete').addEventListener('click', function(e) {
        e.preventDefault();
        watchlist.removeChild(div);

        // Remove from localStorage
        var watchlistArray = JSON.parse(localStorage.getItem('watchlist')) || [];
        var index = watchlistArray.findIndex(watchlistItem => watchlistItem.title === item.title);
        watchlistArray.splice(index, 1);
        localStorage.setItem('watchlist', JSON.stringify(watchlistArray));
    });
}
