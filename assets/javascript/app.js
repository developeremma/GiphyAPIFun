$(document).ready(function () {


  var reactionsArr = ["happy", "sad", "lol", "angry", "love", "aww"];

  renderButtons();

  // Add new button
  $("#add-reaction-btn").on("click", function (event) {
    // Prevents the page from reloading as this is the default action for a submit button in a form
    event.preventDefault();
    // Gets the value of the text box input
    var reactionInput = $("#reaction-input").val().trim();
    // Add the new search term to the foods array
    reactionsArr.push(reactionInput);

    renderButtons();
    // Clear out the text field after adding a new search button
    $("#reaction-input").val("")

  });

  // Search the Giphy Api based on the value of the button clicked
  function searchGiphyAPI() {
    // Clears out the results from the previous search before populating new results
    $("#reactions").empty();
    $("#heading").empty();
    // Add a heading with instructions
    $("#heading").append("<h1>Click on a PIC to make it GIF!</h1>");
    // Captures the value of the data-name attribute from the button that was pressed
    var reactionSearch = $(this).attr("data-name");
    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reactionSearch + "&api_key=FgDWLeIdqfGZ3PnLhk0YD7EBTylzGJlv";
    // Ajax call to pull in the objects from the Giphy API
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function (response) {
      var results = response.data;
      // Loops through only 10 gifs
      for (var i = 0; i < 10; i++) {
        // Create 10 Divs to hold gifs
        var reactionDiv = $("<div class=col-md-4>" + "<br>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Create img tags and add some attributes
        var reactionImage = $("<img>");
        reactionImage.attr("src", results[i].images.fixed_width_still.url);
        reactionImage.attr("data-still", results[i].images.fixed_width_still.url);
        reactionImage.attr("data-animate", results[i].images.fixed_width.url);
        reactionImage.attr("data-state", "still");
        reactionImage.attr("class", "gif");

        reactionDiv.append(p);
        reactionDiv.append(reactionImage);

        $("#reactions").prepend(reactionDiv);
      }

    });
  }

  // Create buttons
  function renderButtons() {

    $("#reaction-btns").empty();

    for (var i = 0; i < reactionsArr.length; i++) {

      var createBtn = $("<button>");
      createBtn.addClass("btn btn-primary");
      createBtn.attr("data-name", reactionsArr[i]);
      createBtn.text(reactionsArr[i]);
      $("#reaction-btns").append(createBtn);
    }
  }
  // Turn motion on and off when image is clicked
  function gifAnimate() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  };

  $(document).on("click", ".btn-primary", searchGiphyAPI);
  $(document).on("click", "img", gifAnimate);


});
