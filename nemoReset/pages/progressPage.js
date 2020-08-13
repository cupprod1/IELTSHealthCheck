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
                actions.waitForElementVisible(this,this.elements.username.readingTile,30000);
                actions.click(this,this.elements.readingTile.selector);
                this.api.useCss();
            },

			clickExpandedReadingTile: function(){
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.username.readingTest,30000);
                actions.click(this,this.elements.readingTest.selector);
                this.api.useCss();
            }            
        }
    ]
}