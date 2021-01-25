

$(document).ready(function() {
    // Getting references to our form and input
    var addItemForm = $("form#add-item-form");
    var urlInput = $("input#url-input");
    var ItemsSection = $("#all-items")

    addItemForm.on("submit", function(event) {
        event.preventDefault();
        var itemUrlData = {
          url: urlInput.val().trim()
        };
    
        if (!itemUrlData.url) {
          return;
        }
        // If we have a url, run the addItemUrl function
        addItemUrl(itemUrlData.url);
        urlInput.val("");
    });
    

    // $.get("/api/items")
    // .then(data => {
    //     console.log("Success getting all items:", data);
    // }) 
        
    

    function addItemUrl(url) {
        $.post("/api/scrape", {
            url: url
        })
        .then(function(data) {    
            // Reload the page so the user can see the new item
            console.log('Added new item!');


            // We'll need to do something like this when it's added
            window.location.href= '/dashboard';
        })
    }
})


