$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  // Send request to server to scrape item from url
  $('#add-item').on('click', () => {
    const url = $('#item-url').val();
    $.post("/api/scrape", {
      url: url,
    })
      .then(function(data) {
        console.log(data);
        // window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  });

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
