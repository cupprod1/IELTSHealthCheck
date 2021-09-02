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
                    testlog.info("Waiting for Username field to appear on login page")
                })
                this.api.useXpath();
                this.api.waitForElementVisible(this.elements.username.selector,60000,"Username field is not appeared on login page");
                this.api.useCss();
                this.api.perform(function() {
                    testlog.info("Username field is appeared successfully on login page")
                })
            },
            login: function(email, password){
            	this.api.perform(function() {
                    testlog.info("Entering login details")
                })
                this.api.useXpath();
                this.api.setValue(this.elements.username.selector, email);
                this.api.setValue(this.elements.password.selector, password);
                this.api.click(this.elements.submitButton.selector, function(result) {
                    this.assert.equal(result.status, 0, "Login Button is not clickable");
                })
                this.api.useCss();
                this.api.perform(function() {
                    testlog.info("Login Button is clicked successfully")
                })
            }
        }
    ]
}