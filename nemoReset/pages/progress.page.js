var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");

module.exports = {
	elements: {
		readingTile: {
			selector: '//div[text()="Reading"]',
			locateStrategy: 'xpath'
		},

		readingTest: {
			selector: '//div[text()="Reading"]//following::*[contains(@class, "show")][1]',
			locateStrategy: 'xpath'
		}
	},

	commands: [
        {
            clickReadingTile: function(){
                this.api.perform(function() {
                    testlog.info("Waiting for Reading Tile to appear on Progress Page")
                })
                this.api.useXpath();
                this.api.waitForElementVisible(this.elements.readingTile.selector,60000,"Reading Tile is not visible on Progress Page");
                this.api.perform(function() {
                    testlog.info("Reading Tile is visible on Progress Page")
                })
                this.api.perform(function() {
                    testlog.info("Expanding Reading Tile on Progress Page")
                })
                this.api.click(this.elements.readingTile.selector, function(result) {
                    this.assert.equal(result.status, 0, "Reading Tile is not clickable on Progress page");
                })
                this.api.useCss();
                this.api.perform(function() {
                    testlog.info("Reading Tile is expanded on Progress Page")
                })
            },

			clickReadingTest: function(){
                this.api.perform(function() {
                    testlog.info("Waiting for Reading Test button to appear inside Reading Tile")
                })
                this.api.useXpath();
                this.api.waitForElementVisible(this.elements.readingTest.selector,60000,"Reading Test button is not visible inside Reading Tile");
                this.api.perform(function() {
                    testlog.info("Reading Test button is visible inside Reading Tile")
                })
                this.api.perform(function() {
                    testlog.info("Clicking Reading Test button")
                })
                this.api.click(this.elements.readingTest.selector, function(result) {
                    this.assert.equal(result.status, 0, "Reading Test button is not clickable inside Reading Tile");
                })
                this.api.perform(function() {
                    testlog.info("Reading Test button is clicked successfully")
                })
                this.api.useCss();
            }            
        }
    ]
}