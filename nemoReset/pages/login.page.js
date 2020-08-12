var action = require('../lib/browserAction');

var loginCommands = {

    waitForPageLoad: function(){
        action.waitForElementVisible(this,'@username',25000);
    },
    login: function(username,password)
    {
        action.setValue(this,'@username',username);
        action.setValue(this,'@password',password);
        action.click(this,'@submitButton');
    },
    LoginWithGoogleOption: function() {
        action.waitForElementVisible(this,this.elements.googleOption.selector,50000);
        action.click(this,'@googleOption');
    },
    loginWithGoogleCredentials: function(email, pass) {
        action.waitForElementVisible(this,this.elements.googleUsername.selector,50000);
        action.setValue(this,'@googleUsername',email);
        action.click(this,'@googleNext');
        action.waitForElementVisible(this,this.elements.googlePass.selector,50000);
        action.setValue(this,'@googlePass',pass);
        action.click(this,'@googleNext2');
    }
};

module.exports = {

    url: function () {
        return (this.api.globals.test.launchUrl);
    },

    commands: [loginCommands],

    elements: {
        username: {
            selector: '#gigya-login-form input[name="username"]' // Update the selector value based on your application
        },
        password: {
            selector: '#gigya-login-form input[name="password"]' // Update the selector value based on your application
        },
        submitButton: {
            selector: '#gigya-login-form input[type="submit"]' // Update the selector value based on your application
        },
        googleOption: {
            selector: ".gigya-login-providers-list .gigya-login-provider:nth-of-type(2) .tabbing-button"
        },
        googleUsername: {
            selector: "#identifierId"
        },
        googleNext: {
            selector: "#identifierNext"
        },
        googlePass: {
            selector: 'input[type="password"]'
        },
        googleNext2: {
            selector: "#passwordNext"
        }
    }
};
