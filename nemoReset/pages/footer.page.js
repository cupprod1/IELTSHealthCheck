var actions = require("../lib/browserAction.js");

module.exports = {
    elements: {
        languageSelector: {
            selector: '[qid="cFooter-7"]'
        }
    },
    commands: [
        {            
            waitForLanguageSelectorToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.languageSelector.selector,30000);
            }
        }
    ]
};
