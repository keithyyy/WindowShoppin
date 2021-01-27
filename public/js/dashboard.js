

$(document).ready(function() {
    // Getting references to our form and input
    var addItemForm = $("form#add-item-form");
    var urlInput = $("input#url-input");
    var ItemsSection = $("#all-items");
    const deleteButtons = document.querySelectorAll(".delete-item")
    

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

    if (deleteButtons) {
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute("data-id");
                console.log(id)
            })
        })
    }

    // when a user selects an item
    const savedItem = document.querySelectorAll("view-item")
    
    if (savedItem) {
        savedItem.forEach((item) => {
            item.addEventListener('click', (e) => {
                const id = e.target.getAttribute("data-item-id");
                fetch("/api/items/" + id, 
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(
                    
                )
            })
        })
    }


    

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


