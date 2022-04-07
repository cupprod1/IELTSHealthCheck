var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");

module.exports = {
    elements: {
        privateProgressTile: {
            selector: 'div.private-space a.product-image'
        },

        userProfileName: {
            selector: '.userProfile a.userName'
        },

        logoutButton: {
            selector: '.userProfile div.logout'
        },

        skillBandContainer: {
            selector: 'div.selection-container'
        },

        skillDropdown: {
            selector: 'div.selection-container a[qid="skill-band-1"]'
        },

        bandDropdown: {
            selector: 'div.selection-container a[qid="skill-band-2"]'
        },

        dropdownOption1: {
            selector: 'div.dropdown-menu.show a:nth-child(1)'
        },
        skillCard1: {
            selector: 'div.selection-container a[qid="skill-card-0"]'

        },
        SkillBand1: {
            selector: 'div.selection-container a[qid="skill-band-3-0"]'

        },
        testDate1: {
            selector: 'div.selection-container a[qid="test-date-undefined"]:first-of-type'

        },
        testCategory1: {
            selector: 'div.test-category:first-of-type'

        },
        disabledStartbutton: {
            selector: 'a.start-test-btn.disabled'
        },

        startButton: {
            selector: 'a.start-test-btn'
        }
    },

    commands: [
        {
            clickProgressTile: function () {
                this.api.perform(function () {
                    testlog.info("Waiting for Progress Tile to appear on Dashboard Page")
                })
                this.api.useCss();
                this.api.waitForElementVisible(this.elements.privateProgressTile.selector, 60000, "Progress Tile is not visible on Dashboard Page");
                this.api.perform(function () {
                    testlog.info("Progress Tile is visible on Dashboard Page")
                })
                this.api.perform(function () {
                    testlog.info("Clicking Progress Tile on Dashboard Page")
                })
                this.api.click(this.elements.privateProgressTile.selector, function (result) {
                    this.assert.equal(result.status, 0, "Progress Tile is not clickable on Dashboard page");
                })
                this.api.perform(function () {
                    testlog.info("Progress Tile is clicked successfully")
                })
            },

            logout: function () {
                this.api.perform(function () {
                    testlog.info("Waiting for User Profile Name dropdown button")
                })
                this.api.useCss();
                this.api.waitForElementVisible(this.elements.userProfileName.selector, 60000, "User Profile dropdown is not visible");
                this.api.perform(function () {
                    testlog.info("User Profile Name dropdown button is visible")
                })
                this.api.perform(function () {
                    testlog.info("Clicking User Profile dropdown button")
                })
                this.api.click(this.elements.userProfileName.selector, function (result) {
                    this.assert.equal(result.status, 0, "User Profile dropdown is not clickable");
                })
                this.api.perform(function () {
                    testlog.info("Clicking Logout button")
                })
                this.api.click(this.elements.logoutButton.selector, function (result) {
                    this.assert.equal(result.status, 0, "Logout Button is not clickable");
                })
                this.api.waitForElementVisible(this.elements.userProfileName.selector, 60000, "User Profile dropdown is not visible");
                this.api.perform(function () {
                    testlog.info("Logout operation is successful")
                })
            },

            chooseSkillBand: function () {
                this.api.perform(function () {
                    testlog.info("Choosing Skill Band")
                })
                this.api.useCss();
                actions.waitForElementVisible(this, this.elements.skillCard1.selector, 60000);
                actions.click(this, this.elements.skillCard1.selector);
                this.api.pause(1000)
                actions.waitForElementVisible(this, this.elements.testDate1.selector, 60000);
                actions.click(this, this.elements.testDate1.selector);
                this.api.pause(1000)
                actions.waitForElementVisible(this, this.elements.SkillBand1.selector, 60000);
                actions.click(this, this.elements.SkillBand1.selector);
                this.api.pause(1000)
                actions.waitForElementVisible(this, this.elements.testCategory1.selector, 60000);
                actions.click(this, this.elements.testCategory1.selector);
                this.api.pause(1000)
                actions.waitForElementNotPresent(this, this.elements.disabledStartbutton.selector, 60000);
                this.api.pause(2000)
                actions.click(this, this.elements.startButton.selector);
                this.api.pause(30000)
                actions.waitForElementVisible(this, '#testContainer', 60000);
            }
        }
    ]
}