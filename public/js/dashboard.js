$(document).ready(function() {
    // Getting references to our form and input
    var addItemForm = $("form#add-item-form");
    var urlInput = $("input#url-input");
    var ItemsSection = $("#all-items");

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


    // function to render the item details after getting data from our API
    const renderItemPage = (data) => {
      console.log(data)
      window.location.replace('/view/'+ data.id)
    }



    // Select item
    $('.item-card').on('click', function() {
        const itemId = ($(this).attr('data-item-id'))
        console.log(itemId)
        $.ajax({
            url: '/api/items/' + itemId,
            type: 'GET',
            success: function(results) {
                // console.log(results)
                renderItemPage(results)
            }
        })
    })
    
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

    const checkItemforUpdate = (itemId, cb) => {
        $.ajax({
            url: '/api/scrape/' + itemId,
            type: 'POST',
            success: cb()
        });
    }
    // Check button handler
    $('.check-update').on('click', function(){
        const itemId = ($(this).attr('data-id'));
        console.log('checking update on Item: ', itemId);
        // Start spinner
        $('.loader').removeClass('invisible');
        checkItemforUpdate(itemId, function(result){
            console.log(result, ' item is checked');
            window.location.replace('/dashboard');
        });
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
    $('#update-all').on('click', () => {
        checkForUpdates();
    })
});
