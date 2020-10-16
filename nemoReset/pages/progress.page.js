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
                    testlog.info("Expanding Reading Tile")
                })
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.readingTile.selector,60000);
                actions.click(this,this.elements.readingTile.selector);
                this.api.useCss();
            },

			clickReadingTest: function(){
                this.api.perform(function() {
                    testlog.info("Clicking Reading Test")
                })
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.readingTest.selector,60000);
                actions.click(this,this.elements.readingTest.selector);
                this.api.useCss();
            }            
        }
    ]
}