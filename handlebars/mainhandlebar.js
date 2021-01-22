const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const product = [
    {
        productName: "bag of apples",
        productCategory: "produce",
        productQuantiy: "1",
        productPrice: "2.99"

    },

    {
        productName: "box of cookies",
        productCategory: "bakery",
        productQuantiy: "1",
        productPrice: "1.99"

    },

    {
        productName: "shampoo",
        productCategory: "hair care",
        productQuantiy: "1",
        productPrice: "7.99"

    }
];

