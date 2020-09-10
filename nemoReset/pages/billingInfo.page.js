var actions = require("./../lib/browserAction.js");

module.exports = {
	elements: {
		billingInfoWrapper: {
			selector: 'div.billing-info-wrapper'
		},

        country: {
            selector: '#country'
        },

        address: {
            selector: '//input[@name="streetAddress"]',
            locateStrategy: 'xpath'
        },

        city: {
            selector: '//input[@name="cityname"]',
            locateStrategy: 'xpath'
        },

        state: {
            selector: '//input[@name="state"]',
            locateStrategy: 'xpath'
        },

        postalCode: {
            selector: '//input[@name="postalCode"]',
            locateStrategy: 'xpath'
        },

        termsLinkCheckbox: {
            selector: 'label.terms-text'
        },

        continuePaymentButton: {
            selector: 'a.begin-payment-btn'
        },

        cardType: {
            selector: '#card_type_selection'
        },

        cancelButton: {
            selector: '//input[contains(@class, "cancelbutton")]',
            locateStrategy: 'xpath'
        },

        yesButton: {
            selector: '//button[text()="Yes"]',
            locateStrategy: 'xpath'
        }
	},

	commands: [
        {
            validateBillingInfo: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.billingInfoWrapper.selector,60000);
            },

            completeBillingForm: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.billingInfoWrapper.selector,60000);
                actions.clearValue(this,this.elements.country.selector);
                actions.setValue(this,this.elements.country.selector,'India');
                actions.click(this,this.elements.billingInfoWrapper.selector);
                this.api.pause(3000);
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.address.selector,60000);
                actions.clearValue(this,this.elements.address.selector);
                actions.setValue(this,this.elements.address.selector,'Uday Park');
                actions.waitForElementVisible(this,this.elements.city.selector,60000);
                actions.clearValue(this,this.elements.city.selector);
                actions.setValue(this,this.elements.city.selector,'Delhi');
                actions.waitForElementVisible(this,this.elements.state.selector,60000);
                actions.clearValue(this,this.elements.state.selector);
                actions.setValue(this,this.elements.state.selector,'Delhi');
                actions.waitForElementVisible(this,this.elements.postalCode.selector,60000);
                actions.clearValue(this,this.elements.postalCode.selector);
                actions.setValue(this,this.elements.postalCode.selector,'110049');
                this.api.useCss();
                // actions.waitForElementVisible(this,this.elements.termsLinkCheckbox.selector,60000);
                // this.api.moveToElement(this.elements.termsLinkCheckbox.selector, 5, 5)
                // this.api.mouseButtonClick(0)
                // actions.isElementPresent(this,'div.terms-not-accepted'), function(result) {
                //     console.log("result" + result)
                //     if(result) {
                //         actions.waitForElementVisible(this,this.elements.termsLinkCheckbox.selector,60000);
                //         this.api.moveToElement(this.elements.termsLinkCheckbox.selector, 5, 5)
                //         this.api.mouseButtonClick(0)
                //     }
                // }
            },

            clickPaymentButtonStep2: function() { 
                // actions.click(this,this.elements.termsLinkCheckbox.selector);
                actions.click(this,this.elements.continuePaymentButton.selector);
            },

            validateCheckoutPage: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.cardType.selector,60000);
            },

            cancelPayment: function(){
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.cancelButton.selector,60000);
                actions.click(this,this.elements.cancelButton.selector);
                actions.waitForElementVisible(this,this.elements.yesButton.selector,60000);
                actions.click(this,this.elements.yesButton.selector);
                this.api.useCss();
            }        
        }
    ]
}