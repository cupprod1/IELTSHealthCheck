var action = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        welcome_msg: {
            selector: 'div.welcome-msg' // Update the selector value based on your application
        },
       class:{
           selector:'.courses .practice-image'
       },
       productaddbtn:{
           selector:'.d-flex .product-add'
       },
       productcodeinput:{
            selector:'#activationCodeInput'
       },
       activatebtn:{
        selector:'form [type="submit"]'
       },
       joinclass:{
           selector:'//*[contains(text(),"{LEARNINGCLASS}")]',
           locateStrategy: 'xpath'
       },
       classkeyinput:{
        selector:'#classKeyInput'
       },
       joinbtn:{
           selector:'.text-center [type="submit"]'
       },
       learnbtn:{
           selector:'.product-activation-code button'
       },
       verifyclass:{
        selector:'//*[contains(text(),"{CLASS_NAME}")]',
        locateStrategy: 'xpath'
       },
       classaddbtn:{
           selector:'div:nth-child(2) > a:nth-child(2)'
       },
       cqapracticeextra:{
        // selector:'//*[contains(text(),"Practice Extra")]',
        // locateStrategy: 'xpath'
        selector:".image-group .practice-image"
       },
       frameselec:{
          // selector:'.question-div .text-editor'
          selector: "#studentAnswer-productiveSkill-input"
       },
       class2:{
           selector: ".courses .product-image"
       },
       analytics:{
           selector:".component-analytics .analytic-content"
       }
 },
    commands: [
        {
            waitForPageLoad: function(){
                action.waitForElementVisible(this,'@welcome_msg',50000);
            },
            goToClass: function(){
                action.click(this,'@class');
            },
            waitForClassLoad:function(){
                action.waitForElementVisible(this,'@class',25000);
            },
            addProduct:function(){
                action.click(this,'@productaddbtn');
            },
            waitInputProductBox:function(){
                action.waitForElementVisible(this,'@productcodeinput',25000);
            },
            inputProductCode:function(code){
                action.setValue(this,'@productcodeinput',code);
            },
            clickActivate:function(){
                action.click(this,'@activatebtn');
            },
            waitActivatedSuccesfully:function(learnclass){
                var select3 = format(this.elements.joinclass.selector,{LEARNINGCLASS:learnclass});
                this.api.useXpath();
                action.waitForElementVisible(this,select3,50000);
            },
            clickJoinClass:function(learnclass){
                var select3 = format(this.elements.joinclass.selector,{LEARNINGCLASS:learnclass});
                this.api.useXpath();
                action.click(this,select3);
            },
            waitClassKeyInput:function(){
                action.waitForElementVisible(this,'@classkeyinput',25000);
            },
            inputClassKey:function(key){
                action.setValue(this,'@classkeyinput',key);
            },
            clickJoin:function(){
                action.click(this,'@joinbtn');
            },
            waitJoin:function(){
                action.waitForElementVisible(this,'@joinbtn',50000);
            },
            waitLearn:function(){
                action.waitForElementVisible(this,'@learnbtn',80000);
            },
            verifyJoinedClass(cname){
                var select3 = format(this.elements.verifyclass.selector,{CLASS_NAME:cname});
                this.api.useXpath();
                action.waitForElementVisible(this,select3,50000);
            },
            addClass:function(){
                action.click(this,'@classaddbtn');
            },
            clickLearn:function(){
                action.click(this,'@learnbtn');
            },
            waitForProductAppear: function(){
                this.api.useCss();
                action.waitForElementVisible(this,this.elements.cqapracticeextra.selector,50000);
            },
            practiceextraopen: function(){
                action.click(this,'@cqapracticeextra');
            },
            waitForFrame: function(){
                this.api.useCss();
                action.waitForElementVisible(this,this.elements.frameselec.selector,50000);         
            },
            goToClass2: function(){
                this.api.useCss();
                action.click(this,this.elements.class2.selector);                
            },
            waitForAnalytic: function(){
                this.api.useCss();
                action.waitForElementVisible(this,this.elements.analytics.selector,50000);           
            }
        }

    ]
};
