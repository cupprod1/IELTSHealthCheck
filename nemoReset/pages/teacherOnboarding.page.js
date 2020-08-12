var actions = require("./../lib/browserAction.js");

module.exports = {
    elements: {
        //Element - Start Teaching Button
        startTeachingButton: {
            selector: '[class*="start-teaching-container"] [href*="startteaching"]'
        },
        //Element - Join School Link
        wantToJoinSchool:{
            selector: '[class*="join-school"] [class*="action-link"]'
        },
        //Element - Teach Independently link
        wantToTeachIndependent:{
            selector: '[class*="teach-independent"] [class*="action-link"]'
        },
        //Element - School Key input box
        haveSchoolKey:{
            selector: '[id*="accessCodeInput"]'
        },
        //Element - School Key in Enabled state
        schoolkeyNextEnabled:{
            selector: '[class*="product-activation-code"] button:not([class*="disabled"])'
        },
        //Element - Teach Independent link
        teachIndependent_SchoolKey:{
            selector: '[class*="product-activation-later"] [href]'
        },
        //Element - Button Let's Go
        success:{
            selector: '[class*="school-key-success"] button'
        },
        //Element - Welcome Message
        welcome_inst:{
            selector: '[class*="no-class"] [class*="space-title"]'
        },
        lastImageOnPage: {
            selector: '.start-teaching-container [src*="Visual2"]'
        }
       
    },
    commands: [
        {
            //Function - To Wait start teach button to appear
            waitForStartTeacherButtonToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.startTeachingButton.selector,60000);
            },
            //Function - To get "Start Teaching" text
            getStartTeachingText: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.startTeachingButton.selector,callback);
            },
            //Function - To Click on Start Teaching Button
            clickStartTeachingButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.startTeachingButton.selector);
            },
            //Function - To wait for join school page
            waitForJoinInst: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.wantToJoinSchool.selector,60000);
            },
            //Function - To Click on Join School
            clickJoinInstitution: function(){
                this.api.useCss();
                actions.click(this,this.elements.wantToJoinSchool.selector);
            },
            //Function - To Click on Teach Independent Button
            clickTeachIndependent: function(){
                this.api.useCss();
                actions.click(this,this.elements.wantToTeachIndependent.selector);
            },
            //Function - To wait for school key page
            waitForHaveSchoolKey: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.haveSchoolKey.selector,60000);
            },
            //Function - To input school key
            enterSchoolKey: function(schoolKey){
                this.api.useCss();
                actions.setValue(this,this.elements.haveSchoolKey.selector,schoolKey);
            },
            //Function - To wait for next button to be enabled
            waitForNextButtonSchoolkey: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.schoolkeyNextEnabled.selector,60000);
            },
            //Function - To Click on Next button
            clickNextSchoolkey: function(){
                this.api.useCss();
                actions.click(this,this.elements.schoolkeyNextEnabled.selector);
            },
            //Function - To Click on Teach Independent link
            clickTeachIndependent_HaveSchoolKey_P:function(){
                this.api.useCss();
                actions.click(this,this.elements.teachIndependent_SchoolKey.selector);
            },
            //Function - To wait for School join success page
            waitForSchoolJoinSuccess: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.success.selector,60000);
            },
            //Function - To Click on Let's Go button
            clickOnletsGoSuccess:function(){
                this.api.useCss();
                actions.click(this,this.elements.success.selector);
            },
            //Function - To wait for welcome message
            waitForwelcomeInst: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.welcome_inst.selector,60000);
            },
            waitForLastImageToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.lastImageOnPage.selector,60000)
            }
        }
    ]
};
