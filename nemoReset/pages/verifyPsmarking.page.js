var actions = require("./../lib/browserAction.js");

module.exports = {
  elements: {
    gotoUnits: {
      selector: '[class*="unit-view-header"] a'
    },
    unit: {
      selector: '[class*="unit-name"]'
    },
    unitprog: {
      selector: '[class*="unit-progress"]'
    },
    PSlesson: {
      selector: '[title*="Lesson 6"]'
    },
    PSitem: {
      selector: '[title*="Sample Productive Skill"] '
    }
  },
  commands: [
    {
      waitForPageLoad: function() {
        this.api.useCss();
        actions.waitForElementVisible(
          this,
          this.elements.PSlesson.selector,
          60000
        );
      },
      checkunitprog: function(callback) {
        this.api.useCss();
        actions.click(this, this.elements.gotoUnits.selector);
        actions.waitForElementVisible(this, this.elements.unit.selector, 60000);
        actions.waitForElementVisible(this, this.elements.unitprog.selector, 60000);
        actions.getElementText(this,this.elements.unitprog.selector,callback);
      },
      openPS: function() {
        actions.click(this, this.elements.unit.selector);
        actions.waitForElementVisible(
          this,
          this.elements.PSlesson.selector,
          60000
        );
        actions.click(this, this.elements.PSlesson.selector);
        actions.waitForElementVisible(
          this,
          this.elements.PSitem.selector,
          60000
        );
        actions.click(this, this.elements.PSitem.selector);
      }
    }
  ]
};
