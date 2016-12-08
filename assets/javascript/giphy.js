$(document).on("click", "button", function(){ 
    var band = $(this).data("band");
    //URL of the giphy api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        band + "&api_key=dc6zaTOxFJmzC&limit=10";
        //call to api for information
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data;


        //for loop iterating through and adding rating, attributes, and appending new divs
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var rating = results[i].rating;
                var bandDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                bandDiv.append(p);
                var bandImage = $("<img class='giff'>");
                bandImage.attr("src", results[i].images.fixed_height_still.url);
                bandImage.attr("data-still", results[i].images.fixed_height_still.url);
                bandImage.attr("data-animate", results[i].images.fixed_height.url);
                bandImage.attr("data-state", results[i].images.fixed_height.url);
                bandDiv.append(p);
                bandDiv.append(bandImage);
            
                $("#gifs").prepend(bandDiv);

            }

        }


        //empty array that i am pushing the new searches too
        var bands = [];
            
        //iterates through and adds class and data attributes to the new searches and then appends them to a div
        function renderButtons() {

            $("#buttons-here").empty()
            for (var i = 0; i < bands.length; i++) {
                var a = $("<button>");
                a.addClass("band");
                a.attr("data-band", bands[i]);
                a.attr("data-still", bands[i]);
                a.attr("data-animate", bands[i]);
                a.attr("data-state", bands[i]);
                a.text(bands[i]);
                $("#buttons-here").append(a);
            }
        }
        //when the seach is clicked it is rendering the new button
        $("#add-band").on("click", function(e) {
            e.preventDefault();
            var bandTwo = $("#band-input").val().trim();

            bands.push(bandTwo);
            renderButtons();
            console.log(bands);
     
          

        //trying to get the gif to be still and animate once clicked
        });
        $(document).on('click', '.giff', function(){
        var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
        }

  });
    });
});