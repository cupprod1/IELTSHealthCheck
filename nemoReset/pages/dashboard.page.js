var actions = require("./../lib/browserAction.js");
require("./../lib/logging.js");

module.exports = {
	elements: {
		progressTile: {
			selector: 'a.product-image'
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

        disabledStartbutton: {
            selector: 'a.start-test-btn.disabled'
        },

        startButton: {
            selector: 'a.start-test-btn'
        }
	},

	commands: [
        {
            clickProgressTile: function(){
                this.api.perform(function() {
                    testlog.info("Clicking Progress Tile")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.progressTile.selector,60000);
                actions.click(this,this.elements.progressTile.selector);
            },

			logout: function(){
                this.api.perform(function() {
                    testlog.info("Performing Logout operation")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.userProfileName.selector,60000);
                actions.click(this,this.elements.userProfileName.selector);
                actions.click(this,this.elements.logoutButton.selector);
                actions.waitForElementVisible(this,this.elements.userProfileName.selector,60000);
            },

            chooseSkillBand: function() {
                this.api.perform(function() {
                    testlog.info("Choosing Skill Band")
                })
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.skillBandContainer.selector,60000);
                actions.click(this,this.elements.skillDropdown.selector);
                actions.waitForElementVisible(this,this.elements.dropdownOption1.selector,60000);
                this.api.pause(1000)
                actions.click(this,this.elements.dropdownOption1.selector);
                actions.waitForElementVisible(this,this.elements.bandDropdown.selector,60000);
                this.api.pause(1000)
                actions.click(this,this.elements.bandDropdown.selector);
                actions.waitForElementVisible(this,this.elements.dropdownOption1.selector,60000);
                this.api.pause(2000)
                actions.click(this,this.elements.dropdownOption1.selector);
                actions.waitForElementNotPresent(this,this.elements.disabledStartbutton.selector,60000);
                this.api.pause(2000)
                actions.click(this,this.elements.startButton.selector);
                this.api.pause(30000)
                actions.waitForElementVisible(this,'#testContainer',60000);
            }         
        }
    ]
}