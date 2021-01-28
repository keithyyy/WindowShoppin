$(document).ready(function() {
    // Activeate function to fadein cards as they scrolled down
    $(window).on("load",function() {
        $(window).scroll(function() {
          var windowBottom = $(this).scrollTop() + $(this).innerHeight();
          $(".fade").each(function() {
            /* Check the location of each desired element */
            var objectBottom = $(this).offset().top + $(this).outerHeight();
            
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom < windowBottom) { //object comes into view (scrolling down)
              if ($(this).css("opacity")==0) {$(this).fadeTo(200,1);}
            } 
          });
        }).scroll(); //invoke scroll-handler on page-load
      });

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


    // // function to render the item details after getting data from our API
    // const renderItemPage = (data) => {
    //   console.log(data)
    //   window.location.replace('/view/'+ data.id)
    // }



    // View item handler
    $('.view-item').on('click', function() {
        const itemId = ($(this).attr('data-item-id'))
        console.log(itemId);
        window.location.replace('/item/'+ itemId)
        // $.ajax({
        //     url: '/item/' + itemId,
        //     type: 'GET',
        //     success: function(results) {
        //         // console.log(results)
        //         // renderItemPage(results)
        //     }
        // })
    })

    // Go back to full dashboard handler
    $('.back-to-dash').on('click', function() {
        window.location.replace('/dashboard');
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
