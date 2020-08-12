var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        tabsContainer:{
            selector:'.my-spaces .flex-wrap'
        }
    },
    commands: [
        {
            waitForTabs:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.tabsContainer.selector,50000);
            }
        }
    ]
};