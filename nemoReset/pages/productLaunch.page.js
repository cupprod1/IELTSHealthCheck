var actions = require("./../lib/browserAction.js");

module.exports = {
	elements: {
		testContainer: {
			selector: '//div[@id="testContainer"]',
			locateStrategy: 'xpath'
		},

		answerOption2: {
			selector: '//*[contains(@class, "simple-choice")][2]',
			locateStrategy: 'xpath'
		},

		currentQuestionCount: {
			selector: '.jetpack-progress .current'
		},

		totalQuestionCount: {
			selector: '.jetpack-progress .total'
		},

        paymentOverlay: {
            selector: '.payment-overlay'
        },

        crossIconOnFirst: {
            selector: '.question-band a.question-serial-number-parent:nth-child(2) i.incorrect-answer'
        },

        paymentButton: {
            selector: 'a.payment-button'
        }
	},

	commands: [
        {
            validateTestContainerLaunch: function(){
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.testContainer.selector,60000);
                this.api.useCss();
            },

            waitForAnswerOptionsToAppear: function(){
                this.api.frame(0)
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.answerOption2.selector,60000);
                this.api.useCss();
                this.api.frameParent();
            },

            validateScoreProgress: function(){
                this.api.frame(0)
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.currentQuestionCount.selector,60000);
            	this.api.frameParent();
            },

            validatePaymentOverlay: function() {
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.paymentOverlay.selector,60000);
            },

            validateCrossIcon: function() {
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.crossIconOnFirst.selector,60000);  
            },

            clickPaymentButton: function() {
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.paymentButton.selector,60000);
                actions.click(this,this.elements.paymentButton.selector)
            }
        }
    ]
}