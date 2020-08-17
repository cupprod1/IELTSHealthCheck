var actions = require("./../lib/browserAction.js");

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
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.username.selector,60000);
                this.api.useCss();
            },
            login: function(){
                this.api.useXpath();
                actions.setValue(this,this.elements.username.selector,"cmpstudent2607@yopmail.com");
                actions.setValue(this,this.elements.password.selector,"Compro11");
                actions.click(this,this.elements.submitButton.selector);
                this.api.useCss();
            }
        }
    ]
}