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
            selector: 'div.overlay'
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
                this.api.waitForElementVisible(this.elements.testContainer.selector,120000);
                this.api.useCss();
                this.api.perform(function() {
                    testlog.info("Validating Product Test Container is launched")
                })
            },

            validateMetricaFrameToAppear: function(){
                this.api.useXpath();
                this.api.perform(function() {
                    testlog.info("Waiting for Test Container to appear on Assignment Page")
                })
                this.api.waitForElementVisible(this.elements.testContainer.selector,240000,"Test Container is not visible on Assignment Page");
                this.api.perform(function() {
                    testlog.info("Test Container is visible on Assignment Page")
                })
                this.api.frame(0)
                this.api.perform(function() {
                    testlog.info("Waiting for Exit Test button to appear inside Metrica Frame on Assignment Page")
                })
                this.api.waitForElementVisible(this.elements.exitTest.selector,240000,"Exit Test button is not visible inside Metrica Frame on Assignment Page");
                this.api.perform(function() {
                    testlog.info("Exit Test button is visible inside Metrica Frame on Assignment Page")
                })
                this.api.useCss();
                this.api.perform(function() {
                    testlog.info("Waiting for Question Count field to appear inside Metrica Frame on Assignment Page")
                })
                this.api.waitForElementVisible(this.elements.currentQuestionCount.selector,240000,"Question Count field is not visible inside Metrica Frame on Assignment Page");
                this.api.perform(function() {
                    testlog.info("Question Count field is visible inside Metrica Frame on Assignment Page")
                })
                this.api.expect.element(this.elements.questionSection.selector).text.to.not.equal("")
                this.api.frameParent();
            },

            validateScoreProgress: function(){
                this.api.perform(function() {
                    testlog.info("Validating score progress")
                })
                this.api.frame(0)
                this.api.useCss();
                this.api.waitForElementVisible(this.elements.currentQuestionCount.selector,60000);
            	this.api.frameParent();
            },

            validatePaymentOverlay: function() {
                this.api.perform(function() {
                    testlog.info("Waiting for Payment Overlay to appear on submitted assignment page")
                })
                this.api.useCss();
                this.api.waitForElementVisible(this.elements.paymentOverlay.selector,60000,"Payment Overlay is not visible");
                this.api.perform(function() {
                    testlog.info("Payment Overlay is visible on submitted assignment page")
                })
            },

            validateStatusIcon: function() {
                this.api.perform(function() {
                    testlog.info("Waiting for Status icon to appear on submitted assignment page")
                })
                this.api.useCss();
                this.api.waitForElementVisible(this.elements.questionStatusIcon.selector,60000,"Status icon is not visible on submitted assignment page");
                this.api.perform(function() {
                    testlog.info("Status icon is visible on submitted assignment page")
                })
            },

            clickPaymentButton: function() {
                this.api.perform(function() {
                    testlog.info("Clicking Payment button")
                })
                this.api.useCss();
                this.api.waitForElementVisible(this.elements.paymentButton.selector,60000);
                this.api.click(this.elements.paymentButton.selector)
            },

            moveToLastQuestion: function() {
                this.api.perform(function() {
                    testlog.info("Moving to Last assignment question")
                })
                this.api.useCss();
                this.api.frame(0)
                this.api.waitForElementVisible(this.elements.allQuestions.selector,60000,"All Questions button is not visible inside Metrica Frame on Assignment Launch page")
                this.api.click(this.elements.allQuestions.selector)
                this.api.waitForElementVisible(this.elements.lastQuestion.selector,60000,"Last Question button is not visible inside Metrica Frame on Assignment Launch page")
                this.api.click(this.elements.lastQuestion.selector)
                this.api.frameParent()
                this.api.perform(function() {
                    testlog.info("Moved to Last assignment question successfully")
                })
            },

            submitAssignment: function() {
                this.api.perform(function() {
                    testlog.info("Submitting the assignment")
                })
                this.api.useXpath();
                this.api.frame(0)
                this.api.waitForElementVisible(this.elements.submitButton.selector,60000,"Submit button is not visible inside Metrica Frame on Assignment Launch page")
                this.api.click(this.elements.submitButton.selector)
                this.api.waitForElementVisible(this.elements.submitAnywayButton.selector,60000,"Submit Anyway button is not visible inside Metrica Frame on Assignment Launch page")
                this.api.click(this.elements.submitAnywayButton.selector)
                this.api.frameParent()
                this.api.useCss();
                this.api.perform(function() {
                    testlog.info("Assignment submitted successfully")
                })
            }
        }
    ]
}
