/* eslint-disable */
require("mocha");

const expect = require('chai').expect;
const server = require('../server');

console.log('running test: against server.js');

describe('title: This is the title of the test', () => {
  it('this simple test checks How Awesome App is!', () => {
    expect('Test CI with Travis. Window Shoppin is awesome!' ).to.equal('Test CI with Travis. Window Shoppin is awesome!');
  });
});
