var games = ["League of Legends", "Fortnite", "Pubg", "Rocket League", "Dota 2", "World of Warcraft", "Far Cry 5"];
var apiKey = "BNSZyPj5scb50E6CmlmFT5bU1Y1bNx2R";
var currentTitle;
var loadMore = '<br><button class="btn btn-success btn-sm" id="load-more">Load More Results</button>';

function searchGiphy(currTitle) {
    var title = currTitle;        
    currentTitle = title;
    title = title.replace(/ /g,"+");
    var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${title}&limit=${limit}`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $(".movie-container").empty();
        var array = response.data;
        console.log(response);
        array.forEach( function(item) {
            var newGif = `<figure class="figure" style="margin: 10px;">
                <div class="meta">
                    <figcaption class="figure-caption">
                        <h5>Rating: ${item.rating}</h5>
                    </figcaption>
                </div>
                <img class="card-img-bottom gif" src="${item.images.fixed_height_still.url}" data-still="${item.images.fixed_height_still.url}"
                    data-animate="${item.images.fixed_height.url}" data-state="still">
                </figure>`;

            $(".movie-container").append(newGif);
        })
        
        $(".movie-container").append(loadMore);
    });
}



function displayButtons() {
    $(".header-container").empty();

    games.forEach( function( title ) {
        var newButton = `
        <button class="btn btn-dark game-btn btn-sm" data-name="${title}">${title}</button> `;
        $(".header-container").append(newButton);
    });
}

function checkForDuplicates(title) {
    return !(title === "") && games.indexOf(title) === -1;
}

$("#add-game").on("click", function(event) {
    event.preventDefault();

    var game = $("#game-input").val().trim();
    game = game.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    if(checkForDuplicates(game)) {
        games.push(game);
        displayButtons();
    } else {
        alert("This game has already been added to the button list");
    }
    $("#game-input").val("");
    
})

$(document).on("click", ".game-btn", function() {
    limit = 10;
    searchGiphy($(this).attr("data-name"));
});

$(document).on("click", "#load-more", function() {
    limit += 10;
    searchGiphy(currentTitle);
});

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});

$(document).ready( function() {
    displayButtons();
});

