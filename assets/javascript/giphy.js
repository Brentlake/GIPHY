$("button").on("click", function() {
    var band = $(this).data("band");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        band + "&api_key=dc6zaTOxFJmzC&limit=10";

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
                var button = '<button data-band="' + band + '"class="bands">' + band + '</button>';
                $("#gifs").prepend(bandDiv);
            }

        }



        var bands = [];

        function renderButtons() {

            $("#buttons-here").empty()
            for (var i = 0; i < bands.length; i++) {
                var a = $("<button>");
                a.addClass("");
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
            console.log(bandTwo)
            $(".band").on("click", function() {
                $("#gifs").prepend(bandDiv);
            });


        });



        renderButtons();
    });
});