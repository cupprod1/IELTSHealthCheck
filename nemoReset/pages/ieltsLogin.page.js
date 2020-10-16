var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");

module.exports = {
	elements: {
		username: {
			selector: '//form[contains(@id, "gigya-login-form")]//input[@name="username"]',
			locateStrategy: 'xpath'
		},

		password: {
			selector: '//form[contains(@id, "gigya-login-form")]//input[@name="password"]',
			locateStrategy: 'xpath'
		},

		submitButton: {
			selector: '//form[contains(@id, "gigya-login-form")]//input[@type="submit"]',
			locateStrategy: 'xpath'
		}
	},

	commands: [
        {
            waitForUsernameToAppear: function(){
            	this.api.perform(function() {
                    testlog.info("Waiting for Username to appear")
                })
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.username.selector,60000);
                this.api.useCss();
            },
            login: function(email, password){
            	this.api.perform(function() {
                    testlog.info("Entering login details")
                })
                this.api.useXpath();
                actions.setValue(this,this.elements.username.selector, email);
                actions.setValue(this,this.elements.password.selector, password);
                actions.click(this,this.elements.submitButton.selector);
                this.api.useCss();
            }
        }
    ]
}