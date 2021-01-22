var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");

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

        questionSection: {
            selector: '#main section'
        },

        exitTest: {
            selector: '//button[text()="EXIT TEST"]',
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

        questionStatusIcon: {
            selector: '.question-band a.question-serial-number-parent:nth-child(2) i.question-status-icon'
        },

        paymentButton: {
            selector: 'a.payment-button'
        },

        allQuestions: {
            selector: '.jetpack-pager__all-questions'
        },

        lastQuestion: {
            selector: 'div.pages-row:last-child span:last-child'
        },

        submitButton: {
            selector: '//button[text()="Submit"]',
            locateStrategy: 'xpath'
        },

        submitAnywayButton: {
            selector: '//button[text()="Submit anyway"]',
            locateStrategy: 'xpath'
        }
	},

	commands: [
        {
            validateTestContainerLaunch: function(){
                this.api.perform(function() {
                    testlog.info("Validating Product Test Container is launched")
                })
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.testContainer.selector,120000);
                this.api.useCss();
            },

            validateMetricaFrameToAppear: function(){
                this.api.perform(function() {
                    testlog.info("Validating Metrica Frame is appeared or not")
                })
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.testContainer.selector,240000);
                this.api.frame(0)
                actions.waitForElementVisible(this,this.elements.exitTest.selector,240000);
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.currentQuestionCount.selector,240000);
                this.api.expect.element(this.elements.questionSection.selector).text.to.not.equal("")
                this.api.frameParent();
            },

            validateScoreProgress: function(){
                this.api.perform(function() {
                    testlog.info("Validating score progress")
                })
                this.api.frame(0)
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.currentQuestionCount.selector,60000);
            	this.api.frameParent();
            },

            validatePaymentOverlay: function() {
                this.api.perform(function() {
                    testlog.info("Validating Payment Overlay is present or not")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.paymentOverlay.selector,60000);
            },

            validateStatusIcon: function() {
                this.api.perform(function() {
                    testlog.info("Validating Status icon is present or not")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.questionStatusIcon.selector,60000);  
            },

            clickPaymentButton: function() {
                this.api.perform(function() {
                    testlog.info("Clicking Payment button")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.paymentButton.selector,60000);
                actions.click(this,this.elements.paymentButton.selector)
            },

            moveToLastQuestion: function() {
                this.api.perform(function() {
                    testlog.info("Moving to Last assignment question")
                })
                this.api.useCss();
                this.api.frame(0)
                actions.waitForElementVisible(this,this.elements.allQuestions.selector,60000)
                actions.click(this,this.elements.allQuestions.selector)
                actions.waitForElementVisible(this,this.elements.lastQuestion.selector,60000)
                actions.click(this,this.elements.lastQuestion.selector)
                this.api.frameParent()
            },

            submitAssignment: function() {
                this.api.perform(function() {
                    testlog.info("Submitting the assignment")
                })
                this.api.useXpath();
                this.api.frame(0)
                actions.waitForElementVisible(this,this.elements.submitButton.selector,60000)
                actions.click(this,this.elements.submitButton.selector)
                actions.waitForElementVisible(this,this.elements.submitAnywayButton.selector,60000)
                actions.click(this,this.elements.submitAnywayButton.selector)
                this.api.frameParent()
                this.api.useCss();
            }
        }
    ]
}
