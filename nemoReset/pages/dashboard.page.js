var actions = require("./../lib/browserAction.js");

module.exports = {
	elements: {
		progressTile: {
			selector: 'a.product-image'
		},

		userProfileName: {
			selector: '.userProfile a.userName'
		},

		logoutButton: {
			selector: '.userProfile div.logout'
		}

	},

	commands: [
        {
            clickProgressTile: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.progressTile.selector,60000);
                actions.click(this,this.elements.progressTile.selector);
            },

			logout: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.userProfileName.selector,60000);
                actions.click(this,this.elements.userProfileName.selector);
                actions.click(this,this.elements.logoutButton.selector);
                actions.waitForElementVisible(this,this.elements.userProfileName.selector,60000);
            }            
        }
    ]
}