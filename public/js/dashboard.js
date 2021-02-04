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
    }).catch(err => {
        console.log(err);
        window.location.replace('/dashboard');
    });
    
    /// Activate function to fade in cards as they scrolled down
    $(window).on("load",function() {
        $(window).scroll(function() {
            let windowBottom = $(this).scrollTop() + $(this).innerHeight();
            $(".fade").each(function() {
                /* Check the location of each desired element */
                let objectTop = $(this).offset().top;
                /* If the element is completely within bounds of the window, fade it in */
                if (objectTop + 50 < windowBottom) { //object comes into view (scrolling down)
                if ($(this).css("opacity")==0) {$(this).fadeTo(200,1);}
                } 
            });
        }).scroll(); //invoke scroll-handler on page-load
    });

    // GET request to figure out which user is logged in
    // and update the HTML on the page
    $.get("/api/user_data").then((data) => {
        $(".member-name").text(data.email);
    });

    // Logout button click handler
    $('#logout').on('click', () => {
        sessionStorage.removeItem("session");
        window.location.replace("/logout")
    });

    // Logo image click handler to redirect to dashboard
  $('#logo-ws').on('click', () => {
    console.log('redirecting to dash...');
    window.location.replace('/dashboard');
  });
  
    // Getting references to our form and input
    const addItemForm = $("form#add-item-form");
    const urlInput = $("input#url-input");
    // Add Item handler
    addItemForm.on("submit", (event) => {
        event.preventDefault();
        let itemUrlData = {
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

    // References for Note form and input
    const addNoteForm = $("form#add-note");
    const noteInput = $("textarea#note-input");
    const itemID = $("button#selected-id").attr("data-item-id");
    noteInput.val($('#note').text());

    // Helper function to add note
    const addNoteInfo = (note) => {
        $.ajax({
            url: "/api/items/" + note.id,
            type: 'PUT',
            data: note,
            success: (result) => {
                console.log(result,note.id, ' item is updated');
                window.location.replace('/item/'+ note.id);
            }
        }).fail(err => {
            console.log(err);
            window.location.replace('/dashboard');
        });
    };

    // Add note handler
    addNoteForm.on("submit", (event) => {
        event.preventDefault();
        const noteData = {
            id: itemID,
            note: noteInput.val().trim()
        };
        addNoteInfo(noteData);
        noteInput.val("")
    })

    // References for Category input
    const addCategoryForm = $("form#add-category");
    const categoryInput = $("input#category-input");
    // Helper function to add category
    const addCategoryInfo = (category) => {
        $.ajax({
            url: "/api/items/" + category.id,
            type: 'PUT',
            data: category,
            success: function(result) {
                console.log('item is updated!');
                window.location.replace('/item/'+category.id);
            }
        }).fail(err => {
            console.log(err);
            window.location.replace('/dashboard');
        });
    }

    // Add Category Handler
    addCategoryForm.on("submit", (event) => {
        event.preventDefault();
        const categoryData = {
            id: itemID,
            category: categoryInput.val().trim()
        };
        addCategoryInfo(categoryData);
        categoryInput.val("")
    })
    
    // View item handler
    $('.view-item').on('click', function() {
        const itemId = ($(this).attr('data-item-id'));
        window.location.replace('/item/'+ itemId);
    });

    // Go back to full dashboard handler
    $('.back-to-dash').on('click', function() {
        console.log("redirecting to dash...")
        window.location.replace('/dashboard');
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
        }).fail(err => {
            console.log(err);
            window.location.replace('/dashboard');
        });
    });

    // Helper function to check/update single item
    const checkItemforUpdate = async (itemId, cb) => {
        await $.ajax({
            url: '/api/scrape/' + itemId,
            type: 'POST',
            success: cb()
        }).fail(err => {
            console.log(err);
            window.location.replace('/dashboard');
        });
    };

    // Check button handler
    $('.check-update').on('click', async function(){
        const itemId = ($(this).attr('data-id'));
        console.log('checking update on Item: ', itemId);
        // Start spinner
        $('.loader').removeClass('invisible');
        await checkItemforUpdate(itemId, function(){});
        window.location.replace('/dashboard');
    });

    // Check button handler on view page
    $('.check-update-view').on('click', async function(){
        const itemId = ($(this).attr('data-id'));
        console.log('checking update on Item: ', itemId);
        // Start spinner
        $('.loader').removeClass('invisible');
        await checkItemforUpdate(itemId, function(){});
        window.location.replace('/item/'+ itemId);
    });

    // Function to make call to scrape API and add item in DB.
    function addItemUrl(url) {
        $.post("/api/scrape", {
            url: url
        })
        .then(function(data) {   
                // Reload the page so the user can see the new item
                console.log('Added new item!', data.title);
                window.location.replace('/dashboard');
        }). catch (err => {
            $('.error-msg').removeClass('invisible');
            $('.error-msg').addClass('animate__animated animate__zoomIn');
            console.log(err.responseText);
            setTimeout(() => {
                window.location.replace('/dashboard');
            }, 2000);
        });
    }

    // Function to check all items for updates
    const checkForUpdates = async (items) => {
        $('.spinner-small').removeClass('invisible');
        $('#updating').text(' Checking...')
            const itemsPromises = items.map(async item => {
                const itemUpdated = await checkItemforUpdate(item.id, () => {});
                return itemUpdated;
            });
        await Promise.all(itemsPromises);
        window.location.replace('/dashboard');
    };
        
    // Check All button handler
    $('#update-all').on('click', async function() {
        $.get("/api/items").then(items => {
            console.log('Checking items for update in background');
            checkForUpdates(items);
        })
        .fail(err => {
            console.log(err);
            window.location.replace('/dashboard');
        });
    });

    // Trigger button 'Check All' on first login to check all items for update
    const isSameSession = sessionStorage.getItem("session");
    // Check if this is first time user logged in and save to session stoarge true
    if (!isSameSession) {
        $('#update-all').trigger('click');
        console.log('Click update all');
        sessionStorage.setItem("session", true);
      };
});
