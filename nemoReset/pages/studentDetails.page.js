var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        activityAttempts:{
            selector: "//*[@id='lessonCollapse00']/div[2]//*[contains(@class,'analytics-data')][3]",
            locateStrategy: 'xpath'
        }
    },
    commands: [
        {
            getActivityAttempts: function(callback)
            {
                this.api.useXpath();
                actions.getElementText(this,this.elements.activityAttempts.selector,callback)
            },
            waitForActivityAttempts: function()
            {
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.activityAttempts.selector,50000);
            }
        }
    ]
};
