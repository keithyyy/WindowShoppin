$(document).ready(function() {
    // Making our panels clickable
    const howItWorksPanel = $("div#how-it-works");
    const goShoppinPanel = $("div#go-shoppin");
  
    // When the panel is clicked it goes to the new HTML file
    howItWorksPanel.on("click", function(event) {
      event.preventDefault();
      window.location.replace()
      // If we have an email and password we run the loginUser function and clear the form
    });
  
    goShoppinPanel.on("click", function(event) {
        event.preventDefault();
        // If we have an email and password we run the loginUser function and clear the form
      });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  });
