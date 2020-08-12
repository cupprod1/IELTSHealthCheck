var actions = require("./../lib/browserAction.js");
var refreshuntilElem= require("./../lib/refreshuntilElem.js");

module.exports = {
  elements: {
    myMarking: {
      selector: '[qid="tDashboard-3-00"]'
    },
    feedbackInput: {
      selector: '[qid="ctMarking-4"]'
    },
    percentageInput: {
      selector: '[qid="ctMarking-2"]'
    },
    saveButton: {
      selector: '[qid="ctMarking-5"]'
    },
    sureSubmit:{
      selector: '[qid="ctMarking-9"]'
    },
    submitButton: {
      selector: '[qid="ctMarking-7"]'
    },
    markedLabel: {
      selector: '[qid="cMarking-13-0"] [class="marked"]'
    },
    back: {
      selector: '[qid="cHeader-8"]'
    },
    markedStudent: {
      selector: '[qid="cMarking-14-0"]'
    },
    markedItem: {
      selector: '[qid="cMarking-15-0-0"]'
    },
    percentagescreen:{
      selector: '[class="teacher-feedback"] [class="h-3"]'
    },
    feedbackscreen:{
      selector: '[class="teacher-feedback"] p'
    }
  },
  commands: [
    {
      waitForMyMarking: function() {
        this.api.useCss();
        actions.waitForElementVisible(
          this,
          this.elements.myMarking.selector,
          60000
        );
      },
      clickMyMarking: function() {
        this.api.useCss();
        actions.click(this, this.elements.myMarking.selector);
      },
      waitForfeedbackInput: function() {
        this.api.useCss();
        actions.waitForElementVisible(
          this,
          this.elements.feedbackInput.selector,
          60000
        );
      },
      enterfeedbackInput: function(feedback) {
        this.api.useCss();
        actions.setValue(this, this.elements.feedbackInput.selector, feedback);
      },
      enterPercentageInput: function(percentage) {
        this.api.useCss();
        actions.setValue(
          this,
          this.elements.percentageInput.selector,
          percentage
        );
      },
      waitForSaveButton: function() {
        this.api.useCss();
        actions.waitForElementVisible(
          this,
          this.elements.saveButton.selector,
          60000
        );
      },
      clickSaveButton: function() {
        this.api.useCss();
        actions.click(this, this.elements.saveButton.selector);
      },
      waitForSubmitButton: function() {
        this.api.useCss();
        actions.waitForElementPresent(
          this,
          this.elements.submitButton.selector,
          60000
        );
      },
      clickSubmitButton: function() {
        setTimeout(()=>{
        this.api.useCss();
        actions.click(this, this.elements.submitButton.selector);
        },60000);
      },
      waitForsureSubmit: function() {
        this.api.useCss();
        actions.waitForElementVisible(
          this,
          this.elements.sureSubmit.selector,
          60000
        );
      },
      clicksureSubmit: function() {
        this.api.useCss();
        actions.click(this, this.elements.sureSubmit.selector);
      },
      waitFormarkedLabel: function() {
        this.api.useCss();
       actions.waitForElementPresent(this,this.elements.markedLabel.selector,60000);
      },
      clickBackButton: function() {
        this.api.useCss();
        actions.click(this, this.elements.back.selector,60000);
      },
      waitFormarkedStudent: function() {
        this.api.useCss();
        actions.waitForElementVisible(
          this,
          this.elements.markedStudent.selector,
          60000
        );
      },
      clickmarkedStudent: function() {
        this.api.useCss();
        actions.click(this, this.elements.markedStudent.selector);
      },
      waitFormarkedItem: function() {
        this.api.useCss();
        actions.waitForElementPresent(
          this,
          this.elements.markedItem.selector,
          60000
        );
      },
      clickmarkedItem: function() {
        this.api.useCss();
        actions.click(this, this.elements.markedItem.selector);
      },
      waitForfeedbackscreen: function() {
        this.api.useCss();
        actions.waitForElementPresent(
          this,
          this.elements.feedbackscreen.selector,
          60000
        );
      },
      getFeedbackText: function(callback)
      {
        this.api.useCss();
        actions.getElementText(this,this.elements.feedbackscreen.selector,callback);
      },
      getPercentageText: function(callback)
      {
        this.api.useCss();
        actions.getElementText(this,this.elements.percentagescreen.selector,callback);
      },
      // waitForElement: async function(markPSPageObj) 
      // {
      //   this.api.useCss();
      //   return new Promise(function(resolve, reject) {
      //     refreshuntilElem(
      //       markPSPageObj,
      //       //'[qid="tDashboard-3-00"] .hasCount').then((res)=>{
      //       '//*[@qid="tDashboard-3-00"]//*[contains(@class,"hasCount")]').then((res)=>{
      //         resolve(res);
      //       });                    
      //   });
      // },
      // waitForCompletedCount: async function(markPSPageObj) 
      // {
      //   this.api.useXpath();
      //   return new Promise(function(resolve, reject) {
      //     refreshuntilElem(
      //       markPSPageObj,
      //       "//*[contains(@class,'progress-info')]//*[contains(@class,'progress-box')]//*[text()='3']").then((res)=>{
      //         resolve(res);
      //       });                    
      //   });
      // }            
    }
  ]
};
