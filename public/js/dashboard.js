

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
        // Start spinner
        $('.loader').removeClass('invisible');
        urlInput.val("");
    });
    
    // Delete button handler
    $('.delete').on('click', function(){
        const itemId = ($(this).attr('data-id'));
        // Start spinner
        $('.loader').removeClass('invisible');
        $.ajax({
            url: '/api/items/' + itemId,
            type: 'DELETE',
            success: function(result) {
                console.log(result, ' item is deleted');
                window.location.replace('/dashboard');
            }
        });
    });

    // Update button handler 
    $('.update').on('click', function(){
        const itemId = ($(this).attr('data-id'));
        // Start spinner
        $('.loader').removeClass('invisible');
        $.ajax({
            url: '/api/items/' + itemId,
            type: 'UPDATE',
            success: function(result) {
                console.log(result, ' item is updated');
                window.location.replace('/dashboard');
            }
        });
    });

    function addItemUrl(url) {
        $.post("/api/scrape", {
            url: url
        })
        .then(function(data) {    
            // Reload the page so the user can see the new item
            console.log('Added new item!');


            // We'll need to do something like this when it's added
            window.location.replace('/dashboard');
        })
    }
    
})
