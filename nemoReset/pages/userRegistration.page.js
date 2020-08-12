var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        learnerIcon: {
            selector: '[class*="user-type-selection"] [class*="nemo-learner"]'
        },
        learnerList: {
            selector: '[class*="user-features learner-list"] [class*="list-unstyled"]'
        },
        chooseUserRoleNextButton: {
            selector: '[class*="register-wrapper"] [class*="select-user-btn"]'
        },
        registrationScreen: {
            selector:'#gigya_register_container_content'
        },
        registerButton: {
            selector: '#gigya_register_container_content [type=submit]'
        },
        firstName: {
            selector: '#gigya_register_container_content [name*="firstName"]'
        },
        lastName: {
            selector: '#gigya_register_container_content [name*="lastName"]'
        },
        email: {
            selector: '#gigya_register_container_content [name*="email"]'
        },
        password: {
            selector: '#gigya_register_container_content [name*="password"]'
        },
        checkBox: {
            selector: '#gigya_register_container_content [class*="nemo-checkbox"] [class*="gigya-label"]'
        },
        emailVerificationScreen: {
            selector: '#cup-verification-sent-screen'
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
            selector: '#gigya_register_container_content [name="email"][class*="gigya-valid"]'
        },
        validPassword: {
            selector: '#gigya_register_container_content [name="password"][class*="gigya-valid"]'
        },
        iframe: {
            selector: '#msg_body'
        },
        instructorIcon: {
            selector: '[class*="user-type-selection"] [class*="nemo-teacher"]'
        },
        instructorList: {
            selector: '[class*="user-features"] [class*="list-unstyled"]'
        },
        country: {
            selector: '.gigya-register-form [name*="country"]'
        },
        india: {
            //selector: '#gigya-choose-countryautocomplete-list div:first-child'
            selector:'#gigya-learner-choose-countryautocomplete-list>div:first-child'
        },
        indiaTeacher: {
            selector: '#gigya-teacher-choose-countryautocomplete-list > div:first-child'
        },
        termAndConditions: {
            selector: '.gigya-register-form [for*="checkbox"]'
        },
        checkboxSelected: {
            selector: '.gigya-register-form [class*="gigya-terms-valid"]'
        },
        unblockLinkButton: {
            selector: ".btn-group [href*='dirty/{USERNAME}']"
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
            },
            registerAsNewUser: function(email){
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
                actions.clickAtParticularPosition(this,this.elements.termAndConditions.selector,0,0);
                actions.waitForElementVisible(this,this.elements.checkboxSelected.selector,50000);
                actions.click(this,this.elements.registerButton.selector);
            },
            registerAsNewTeacher: function(email){
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
                actions.waitForElementVisible(this,this.elements.checkboxSelected.selector,5000);
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
            }
        }
    ]
};
