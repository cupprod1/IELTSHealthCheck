var actions = require("./../lib/browserAction.js");

module.exports = {
    url: function () {
        return (this.api.globals.test.launchUrl);
    },
    elements: {
        getStartedButton: {
            //selector: '[class*="btn-started"][href*="regoptions"]'
            selector:'p[class="home-actions"]>a[class*="btn-started"]'
        },
        logIn: {
            //selector: '[href="/login"]'
            selector: '#onboarding-header-login-btn'
        }
    },
    commands: [
        {
            waitForGetStartedButtonToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.getStartedButton.selector,30000);
            },
            getTextOfGetStartedButton: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.getStartedButton.selector,callback)
            },
            clickGetStartedButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.getStartedButton.selector)
            },
            waitForLoginButtonToBePresent: function(){
                this.api.useCss();
                actions.waitForElementPresent(this,this.elements.logIn.selector,30000);
            },
            clickLogin: function(){
                this.api.useCss();
                actions.click(this,this.elements.logIn.selector)
            }
        }
    ]
};
