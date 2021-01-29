$(document).ready(function() {
    let dateToday = moment().format('ll'); // get todays date using moment.js
    // Make call to API on server to get currencies and output to page
    $.get("/api/currencies").then(function(data) {
        function drawTable(data) {
            var html = '';
            for (const key in data) {
              html += '<tr><td>' + key +':' + '</td><td>' + data[key] + '</td><td>' + '</tr>';
            }
            $("#date").text(dateToday);
            $('#table tbody').append(html);
        }
        drawTable(data);
    });

    // Activate function to fade in cards as they scrolled down
    $(window).on("load",function() {
        $(window).scroll(function() {
          let windowBottom = $(this).scrollTop() + $(this).innerHeight();
          $(".fade").each(function() {
            /* Check the location of each desired element */
            let objectBottom = $(this).offset().top + $(this).outerHeight();
            
            /* If the element is completely within bounds of the window, fade it in */
            if (objectBottom - 200 < windowBottom) { //object comes into view (scrolling down)
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

    // View item handler
    $('.view-item').on('click', function() {
        const itemId = ($(this).attr('data-item-id'))
        console.log(itemId);
        window.location.replace('/item/'+ itemId)
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
            if (data.title) {
                // Reload the page so the user can see the new item
                console.log('Added new item!', data.title);
                window.location.replace('/dashboard');
            }
            $('.error-msg').removeClass('invisible');
            $('.error-msg').addClass('animate__animated animate__zoomIn');
            console.log('unable to scrape from this URL');
            setTimeout(() => {
                window.location.replace('/dashboard');
            }, 2000);
            
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
