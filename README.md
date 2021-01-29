# Window Shoppin' ![Logo](/public/images/favicon.ico)
<img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="jQuery" src="https://img.shields.io/badge/jquery%20-%230769AD.svg?&style=for-the-badge&logo=jquery&logoColor=white"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="MySQL" src="https://img.shields.io/badge/mysql-%2300f.svg?&style=for-the-badge&logo=mysql&logoColor=white"/> <img alt="SQLite" src ="https://img.shields.io/badge/sqlite-%2307405e.svg?&style=for-the-badge&logo=sqlite&logoColor=white"/>

You love checkin' out the goods in the windows of your favourite shopping district? Why not bring that experience online, and never forget what you've dreamed about buyin'? With **Window Shoppin'** , you get that same experience, but way better!

Attention Window Shoppers! *Window Shoppin'* lets you take your window shopping experience from the streets to your seats, and makes that experience more efficient, more economical, and more entertaining.

We recognized that shoppers aren't always ready to buy certain higher-ticket items right when they find them, due to any number of reasons. Perhaps they don't have the cash at the moment, or it isn't a priority purchase and they just want to wait for the item to go on sale. Whatever the "why", we make life easier by enabling shoppers to save a wish list in one centralized place so they don't have to navigate to several different sites when they feel like going on a bit of a window-shopping spree. 

Using several built-in technologies, shoppers add items to their personal cart, and when they return to it another day, they can refresh the page and if there is a new price, they will be notified with an alert and the new price will be displayed. They can also organize their items by category and make a note if they feel the need to remember something about it. And if their shopping takes them to sites outside of their home country, we provide updated currency exchange rates right on the site.

No more trying to remember the exact name of those wireless headphones you were eyeing at Best Buy, or missing that sale at your favourite shoe store. Window Shoppin' will escalate your online shopping experience higher than the moving stairs in Toronto's Scotiabank Theatre.

  **Technologies\libraries used to code application:** Node.js, Express.js, Handlebars, [Puppeteer](https://pptr.dev/) high-level API to control Chromium to scrape websites for data, JavaScript, jQuery, Animate CSS, Bootstrap, MySQL, [Sequelize ORM.](https://sequelize.org/)
  3rd party API: [Exchange Rate API](https://www.exchangerate-api.com/).

### Screenshot
![Demo screenshot 1](/public/images/demo.gif)
  

## Contents

1. [Contents](#contents)
2. [Screenshot](#screenshot)
3. [Installation](#installation)
4. [Usage](#usage)
5. [License](#license)
6. [Questions](#questions)

## Installation
To install application locally download repo and run `npm install` to install all dependencies. Run `npm start` to start application. Open browser at provided link.

Deployed application can be accessed at [https://window-shoppin.herokuapp.com/](https://window-shoppin.herokuapp.com/)

## Usage

When you navigate to the site, you will have the option to read an overview in the "How It Works" section, which provides a high-level overview of what you can do with the site. 

Clicking on `Go Shoppin'` will take you to a login page. If you do not have an account, you may sign up with your email address and a password.

URLFrom there you will be taken to your "dashboard", where you will find a field which allows you to enter an item URL to "Track your shoppin' favorites". When you find an item somewhere else on the internet you would like to save, simply **copy** the URL of that item, **paste** it into the "Add Item URL" field on the *Window Shoppin'* site and click `Add Item`. Behind the scenes, *Window Shoppin'* retrieves useful data about that item (name, description, photo, price, date added) and stores it in your personal shopping cart database. The item will be displayed on your dashboard. Add as many as you wish. If you log out and log back in, your saved items will all be displayed on this page.

Clicking `Check` will tell *Window Shoppin'* to access the site where you found your item and assess whether there has been a price change. If there is, you will see a new price in the "New Price" field.

Clicking `Check All` will check all of your items for price changes at once.

Clicking `Delete` will remove the item from Your Saved Items.

Clicking `View` will allow you to view the item on its own, and provide you with a few more options. You can add a note about the item, which will then display beneath the item description. You can also assign a personalized category to each item so you will be able to view all items belonging to that category. The category name you assign will appear beneath the item name.

From the single item view page, clicking on `Show Me My Goods` will take you back to your dashboard.

When you would like to log out of *Window Shoppin'*, simply click `Log Out` in the navigation bar at the top of the page. 

All app code is available at repository [https://github.com/keithyyy/WindowShoppin](https://github.com/keithyyy/WindowShoppin)

## License

Licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions / Contact

:boom:GitHub Profiles: 

Keith Crooc: [https://github.com/keithyyy](https://github.com/keithyyy)
Eldar Humbatov: [https://github.com/elogonme](https://github.com/elogonme)
Michael Torontow: [https://github.com/Torontow](https://github.com/Torontow)
Lina Zughaiyer: [https://github.com/whataleen](https://github.com/whataleen)

:email:Email: 

Keith Crooc: [keith.crooc@gmail.com](mailto:keith.crooc@gmail.com)
Eldar Humbatov: [elogon@gmail.com](mailto:elogon@gmail.com)
Michael Torontow: [mtorontow0@gmail.com](mailto:mtorontow0@gmail.com)
Lina Zughaiyer: [linazughaiyer@hotmail.com](mailto:linazughaiyer@hotmail.com)

  
![UofT](/public/images/uoft.jpg)
Project #2 (featuring Eldar, Keith, Lina &amp; Michael), a project at UofT coding bootcamp.
