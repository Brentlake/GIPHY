//when the button is clicked it will function
$(document).on("click", "button", function(){ 
    var band = $(this).data("band");
    //URL of the giphy api
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        band + "&api_key=dc6zaTOxFJmzC&limit=10";
        //call to api for information
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        var results = response.data;



        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var rating = results[i].rating;
                var bandDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                bandDiv.append(p);
                var bandImage = $("<img>")
                bandImage.attr("src", results[i].images.fixed_height.url);
                bandDiv.append(p);
                bandDiv.append(bandImage);
            
                $("#gifs").prepend(bandDiv);

            }

        }


        //empty array that i am pushing the new searches too
        var bands = [];
            

        function renderButtons() {

            $("#buttons-here").empty()
            for (var i = 0; i < bands.length; i++) {
                var a = $("<button>");
                a.addClass("band");
                a.attr("data-band", bands[i]);
                a.text(bands[i]);
                $("#buttons-here").append(a);
            }
        }
        $("#add-band").on("click", function(e) {
            e.preventDefault();
            var bandTwo = $("#band-input").val().trim();

            bands.push(bandTwo);
            renderButtons();
            console.log(bands);
     
          


        });

        $(".band").on("click", function(){
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