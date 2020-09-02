var actions = require("./../lib/browserAction.js");

module.exports = {
	elements: {
		billingInfoWrapper: {
			selector: 'div.billing-info-wrapper'
		}
	},

	commands: [
        {
            validateBillingInfo: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.billingInfoWrapper.selector,60000);
            }            
        }
    ]
}