$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        $(".member-name").text(data.email);
    });
    // Getting references to our form and input
    var addItemForm = $("form#add-item-form");
    var urlInput = $("input#url-input");
    // Add Item handler
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

    // Helper function to check/update single item
    const checkItemforUpdate = async (itemId, cb) => {
        await $.ajax({
            url: '/api/scrape/' + itemId,
            type: 'POST',
            success: cb()
        });
    }

    // Check button handler
    $('.check-update').on('click', async function(){
        const itemId = ($(this).attr('data-id'));
        console.log('checking update on Item: ', itemId);
        // Start spinner
        $('.loader').removeClass('invisible');
        await checkItemforUpdate(itemId, function(){});
        window.location.replace('/dashboard');
    });

    // Function to make call to scrape API and add item in DB.
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

    // Function to check all items for updates
    const checkForUpdates = async () => {
        $.get("/api/items").then(items => {
            console.log('Checking items for update in background');
            items.forEach(item => {
                checkItemforUpdate(item.id, () => {});
            });
        }).then(() => {
            console.log('Checked all items for update');
            window.location.replace('/dashboard');
        })
    };

    // Check All button handler
    $('#update-all').on('click', async function() {
        $('.spinner-small').removeClass('invisible');
        await checkForUpdates();
    })
});
