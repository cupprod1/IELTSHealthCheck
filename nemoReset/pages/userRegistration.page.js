var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        learnerIcon: {
           // selector: '[class*="user-type-selection"] [class*="nemo-learner"]'
           selector:'[for="learner-radio-input"]'
        },
        learnerList: {
           // selector: '[class*="user-features learner-list"] [class*="list-unstyled"]'
           selector:'.gigya-layout-row .learner-list'
        },
        chooseUserRoleNextButton: {
            //selector: '[class*="register-wrapper"] [class*="select-user-btn"]'
            selector:'[value="Next"]'
        },
        registrationScreen: {
            //selector:'#gigya_register_container_content'
            selector:'[id="c1-gigya-container"]'
        },
        gbox:{
            selector:'.g-box'
        },
        registerButton: {
            selector: '.g-box [type=submit]'
        },
        firstName: {
            selector: '.g-box [name*="firstName"]'
        },
        lastName: {
            selector: '.g-box [name*="lastName"]'
        },
        email: {
            selector: '.g-box  [name*="email"]'
        },
        password: {
            selector: '.g-box [name*="password"]'
        },
        checkBox: {
            selector: '.g-box[class*="nemo-checkbox"] [class*="gigya-label"]'
        },
        emailVerificationScreen: {
           // selector: '#cup-verification-sent-screen'
           selector:'#c1-gigya-container_content'
        },
        emailBox: {
            //selector: '#inboxfield'
            selector: "input[ng-model=myinbox]"
        },
        activationEmail: {
            //selector: '[onclick*="showTheMessage"]:nth-child(4)'
            selector: "table tr[class*=clickable]"
        },
        emailVerificationLink: {
            selector: '//*[contains(text(),"Verify")]',
            locateStrategy: 'xpath'
        },
        validEmailIcon: {
           // selector: '.g-box[name="email"][class*="gigya-valid"]'
           selector:'#c1-gigya-container_content [name="email"][class*="gigya-valid"]'
        },
        validPassword: {
          //  selector: '.g-box [name="password"][class*="gigya-valid"]'
          selector: '#c1-gigya-container_content [name="password"][class*="gigya-valid"]'
        },
        iframe: {
            selector: '#msg_body'
        },
        instructorIcon: {
            selector: '[for="teacher-radio-input"]'
            //selector:'[id="teacher-radio"]>img'
        },
        instructorList: {
           // selector: '[class*="user-features"] [class*="list-unstyled"]'
           selector:'.gigya-layout-row .teacher-list'
        },
        country: {
           // selector: '.gigya-register-form [name*="country"]'
           selector:'.g-box [name*="country"]'
        },
        india: {
            //selector: '#gigya-choose-countryautocomplete-list div:first-child'
          //  selector:'#gigya-learner-choose-countryautocomplete-list>div:first-child'
            selector:'[aria-label="India"]'
        },
        indiaTeacher: {
            //selector: '#gigya-teacher-choose-countryautocomplete-list > div:first-child'
            selector:'[aria-label="India"]'
        },
        termAndConditions: {
           // selector: '.gigya-register-form [for*="checkbox"]'
           selector:'[for="teacher-checkbox-1"]'
        },
        acceptConsent:{
            selector:'.gigya-register-form [for="teacher-checkbox-2"]'
        },
        checkboxSelected: {
            selector: '.gigya-register-form [class*="gigya-terms-valid"]'
        },
        unblockLinkButton: {
            selector: ".btn-group [href*='dirty/{USERNAME}']"
        },
        emailInviteLink:{
            selector:'tr > th:nth-child(1) > div > center > table > tbody > tr > td > table > tbody > tr > td > a'
        }
    },
    commands: [
        {
            waitForLearnerRadioIconToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.learnerIcon.selector,30000);
            },
            clickLearnerOption: function(){
                this.api.useCss();
                actions.click(this,this.elements.learnerIcon.selector)
            },
            waitForLearnerListToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.learnerList.selector,30000);
            },
            clickChooseUserRoleNextButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.chooseUserRoleNextButton.selector)
            },
            waitForRegistrationScreenToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.registrationScreen.selector,60000);
                actions.waitForElementVisible(this,this.elements.gbox.selector,60000);
                actions.waitForElementVisible(this,this.elements.firstName.selector,60000);
            },
            registerAsNewUserNew:function(email){
                this.api.pause(1000);
                this.api.useCss();
                actions.setValue(this,this.elements.firstName.selector,"Test");
                actions.setValue(this,this.elements.lastName.selector,"User");
                actions.setValue(this,this.elements.email.selector,email);
                actions.waitForElementVisible(this,this.elements.validEmailIcon.selector,30000);
                actions.setValue(this,this.elements.password.selector,"Compro11");
                actions.waitForElementVisible(this,this.elements.validPassword.selector,30000);                
                actions.setValue(this,this.elements.country.selector,"India");
                actions.waitForElementVisible(this,this.elements.india.selector,30000);
                actions.click(this,this.elements.india.selector);
                actions.clickAtParticularPosition(this,'[for="learner-checkbox-1"]',0,0);
                //actions.clickAtParticularPosition(this,this.elements.acceptConsent.selector,0,0);
                //actions.waitForElementVisible(this,this.elements.checkboxSelected.selector,50000);
                actions.click(this,this.elements.registerButton.selector);
            },
            registerAsNewUser: function(email){
                this.api.pause(1000);
                this.api.useCss();
                actions.setValue(this,this.elements.firstName.selector,"Test");
                actions.setValue(this,this.elements.lastName.selector,"User");
                actions.setValue(this,this.elements.email.selector,email);
                actions.waitForElementVisible(this,this.elements.validEmailIcon.selector,30000);
                actions.setValue(this,this.elements.password.selector,"Compro11");
                actions.waitForElementVisible(this,this.elements.validPassword.selector,30000);                
                //actions.setValue(this,this.elements.country.selector,"India");
                //actions.waitForElementVisible(this,this.elements.india.selector,30000);
                //actions.click(this,this.elements.india.selector);
                actions.clickAtParticularPosition(this,'[for="learner-checkbox-1"]',0,0);
                //actions.clickAtParticularPosition(this,this.elements.acceptConsent.selector,0,0);
                //actions.waitForElementVisible(this,this.elements.checkboxSelected.selector,50000);
                actions.click(this,this.elements.registerButton.selector);
            },
            registerAsNewTeacher: function(email){
                this.api.pause(1000);
                this.api.useCss();
                actions.setValue(this,this.elements.firstName.selector,"Test");
                actions.setValue(this,this.elements.lastName.selector,"User");
                actions.setValue(this,this.elements.email.selector,email);
                actions.waitForElementVisible(this,this.elements.validEmailIcon.selector,30000);
                actions.setValue(this,this.elements.password.selector,"Compro11");
                actions.waitForElementVisible(this,this.elements.validPassword.selector,30000);                
                actions.setValue(this,this.elements.country.selector,"India");
                actions.waitForElementVisible(this,this.elements.indiaTeacher.selector,30000);
                actions.click(this,this.elements.indiaTeacher.selector);
                actions.clickAtParticularPosition(this,this.elements.termAndConditions.selector,0,0);
                //actions.clickAtParticularPosition(this,this.elements.acceptConsent.selector,0,0);
                //actions.waitForElementVisible(this,this.elements.checkboxSelected.selector,5000);
                actions.click(this,this.elements.registerButton.selector);
            },            
            waitForEmailVerificationScreenToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.emailVerificationScreen.selector,50000);
            },
            waitForEmailBoxToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.emailBox.selector,50000);
            },
            enterEmail: function(email){
                this.api.useCss();
                actions.setValue(this,this.elements.emailBox.selector,email)
                actions.pressEnter(this,this.elements.emailBox.selector);
            },
            waitForActivationEmailToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.activationEmail.selector,30000);
            },
            clickEmail: function(){
                this.api.useCss();
                actions.click(this,this.elements.activationEmail.selector);
            },
            waitForEmailVerificationLink: function(){
                this.api.useXpath();
                actions.waitForElementVisible(this,this.elements.emailVerificationLink.selector,30000);
            },
            clickEmailVerificationLink: function(){
                this.api.useXpath();
                actions.click(this,this.elements.emailVerificationLink.selector);
                //browser.doubleClick(browser.moveTo(this.elements.emailVerificationLink.selector));
            },
            waitForFrame: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.iframe.selector,30000);
            },
            waitForInstructorOptionToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.instructorIcon.selector,30000);
            },
            clickInstructorOption: function(){
                this.api.useCss();
                actions.click(this,this.elements.instructorIcon.selector)
            },
            waitForInstructorListToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.instructorList.selector,30000);
            }, 
            waitForUnblockLinkButtonToAppear: function(username){
                var select = format(this.elements.unblockLinkButton.selector,{USERNAME:username});
                this.api.useCss();
                actions.waitForElementVisible(this,select,30000);
            },  
            clickUnblockLinkButton: function(username){
                var select = format(this.elements.unblockLinkButton.selector,{USERNAME:username});
                this.api.useCss();
                actions.click(this,select);
            },
            waitForInviteVerificationLink:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.emailInviteLink.selector,30000);
            },
            clickInviteVerificationLink:function(){
                this.api.useCss();
                actions.click(this,this.elements.emailInviteLink.selector);
            },
            signupNewTeacher:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,'.g-box [name*="firstName"]',25000);  
                actions.setValue(this,this.elements.firstName.selector,"Test");
                actions.setValue(this,this.elements.lastName.selector,"User");
                actions.setValue(this,this.elements.password.selector,"Compro11");
                actions.waitForElementVisible(this,this.elements.validPassword.selector,30000);                
                actions.setValue(this,this.elements.country.selector,"India");
                actions.waitForElementVisible(this,this.elements.indiaTeacher.selector,30000);
                actions.click(this,this.elements.indiaTeacher.selector);
                actions.clickAtParticularPosition(this,this.elements.termAndConditions.selector,0,0);
               // actions.waitForElementVisible(this,this.elements.checkboxSelected.selector,5000);
                actions.click(this,this.elements.registerButton.selector);
            },
            waitForCountry:function(){
                actions.waitForElementVisible(this,this.elements.country.selector,30000);
                actions.click(this,this.elements.country.selector);
                actions.setValue(this,this.elements.country.selector,"India");
                actions.waitForElementVisible(this,this.elements.indiaTeacher.selector,30000);
                actions.click(this,this.elements.indiaTeacher.selector);
                actions.click(this,'[value="Next"]');
            }
        }
    ]
};
