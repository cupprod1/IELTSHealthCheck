var actions = require("./../lib/browserAction.js");

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
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.readingTile.selector,60000);
                actions.click(this,this.elements.readingTile.selector);
                this.api.useCss();
            },

			clickReadingTest: function(){
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.readingTest.selector,60000);
                actions.click(this,this.elements.readingTest.selector);
                this.api.useCss();
            }            
        }
    ]
}