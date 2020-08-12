var actions = require("./../lib/browserAction.js");
var format = require("string-template");
var Excel = require('exceljs');

module.exports = {
    elements: {
        startLearningButton: {
            selector: '[class*="dashboard-container"] [href*="startlearning"]'
        },
        addProduct: {
            selector: '[class~="product-add"]'
        },
        welcomeMessage: {
            selector: '[class~="welcome-msg"]'
        },
        product: {
            selector: '[src="assets/img/learner/BookCovers/Evolve1SB.png"]'
        },
        learningclass:{
            selector:'//*[contains(text(),"{LEARNINGCLASS}")]',
            locateStrategy: 'xpath'
        },
        iHaveActivationCodeOption: {
            selector: '[class*="product-activation-code"] [class*="nemo-activate-code"]'
        },
        enterActivationCodeTextbox: {
            selector: '#activationCodeInput'
        },
        emptyTextbox: {
            selector: '#activationCodeInput[class*="ng-untouched"]'
        },
        activateButton: {
            selector: '//*[contains(@class,"product-activation-code")]//*[contains(@class,"submit-activation-code")][not(contains(@class,"disabled"))]',
            locateStrategy: 'xpath'
        },
        errorIcon: {
            selector: '[class*="product-activation-code"] [class*="nemo-error-icon"]'
        },
        errorMessage: {
            selector: '[class*="product-activation-code"] [class*="error-message"]'
        },
        closeStartLearningIcon: {
            selector: '[class*="start-learning-header"] [class*="nemo-cross"]'
        },
        userProfileDropdown: {
            selector: '#dropdownMenuLink'
        },
        logout: {
            selector: '[class*="dropdown-menu"] [class*="logout"]'
        },
        activationSuccessNextButton: {
            selector: '[class*="activation-code-success"] [class*="btn-icon"]'
        },
        activationSuccessText: {
            selector: '[class*="activation-code-success"] [class*="content-div-body"]'
        },
        learningOnMyOwnOption: {
            selector: '[class*="start-learning"] [class*="own-learning"]'
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
        verifyproduct:{
            selector:'//*[contains(text(),"{PRODUCTNAME}")]',
            locateStrategy: 'xpath'
        }
    },
    commands: [
        {
            waitForStartLearningButtonToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.startLearningButton.selector,60000);
            },
            getStartLearningText: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.startLearningButton.selector,callback);
            },
            waitForAddProduct: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.addProduct.selector,30000);
            },
            getWelcomeMessageText: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.welcomeMessage.selector,callback);
            },
            launchProduct: function(){
                this.api.useCss();
                actions.click(this,this.elements.product.selector);
            },
            clickStartLearningButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.startLearningButton.selector);
            },
            waitForHaveActivationCodeOptionToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.iHaveActivationCodeOption.selector,30000);
            },
            clickHaveActivationCodeOption: function(){
                this.api.useCss();
                actions.click(this,this.elements.iHaveActivationCodeOption.selector);
            },
            waitForEnterActivationCodeTextboxToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.enterActivationCodeTextbox.selector,30000);
            },
            // enterActivationCode:async function(activationCode){
            //     this.api.useCss();
            //     actions.setValue(this,this.elements.enterActivationCodeTextbox.selector,activationCode);
            // },
            waitForInputBoxPropertyToChange: function(){
                this.api.useCss();
                actions.waitForElementNotVisible(this,this.elements.emptyTextbox.selector,10000);
            },
            isActivateButtonEnabled: function(callback){
                this.api.useXpath();
                actions.isElementVisible(this,this.elements.activateButton.selector,function(result)
                {
                    if(result==true)
                    {
                        callback(true);
                    }
                    else{
                        callback(false);
                    }
                })
            },
            clickActivateButton: function(){
                this.api.useXpath();
                actions.click(this,this.elements.activateButton.selector);
            },
            waitForErrorIconToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.errorIcon.selector,30000);
            },
            getErrorMessageText: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.errorMessage.selector,callback);
            },
            clickCloseStartLearningIcon: function(){
                this.api.useCss();
                actions.click(this,this.elements.closeStartLearningIcon.selector);
            },
            waitForActivationSuccessNextButton: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.activationSuccessNextButton.selector,30000);
            },
            clickActivationSuccessNextButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.activationSuccessNextButton.selector);
            },
            getActivationSuccessText: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.activationSuccessText.selector,callback);
            },
            waitForLearningOnMyOwnOptionToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.learningOnMyOwnOption.selector,30000);
            },
            clickLearningOnMyOwnOption: function(){
                this.api.useCss();
                actions.click(this,this.elements.learningOnMyOwnOption.selector);
            },
            waitForLearningClassToAppear: function(learnclass){
                var select3 = format(this.elements.learningclass.selector,{LEARNINGCLASS:learnclass});
                this.api.useXpath();
                actions.waitForElementVisible(this,select3,30000);
            },
            clickLearningClass: function(learnclass){
                var select3 = format(this.elements.learningclass.selector,{LEARNINGCLASS:learnclass});
                this.api.useXpath();
                actions.click(this,select3);
            },
            waitClassKeyInput:function(){
                actions.waitForElementVisible(this,'@classkeyinput',50000);
            },
            inputClassKey:function(key){
                actions.setValue(this,'@classkeyinput',key);
            },
            waitJoin:function(){
                actions.waitForElementVisible(this,'@joinbtn',50000);
            },
            clickJoin:function(){
                actions.click(this,'@joinbtn');
            },
            waitLearn:function(){
                actions.waitForElementVisible(this,'@learnbtn',50000);
            },
            clickLearn:function(){
                actions.click(this,'@learnbtn');
            },
            verifyJoinedproduct(pname){
                var select3 = format(this.elements.verifyproduct.selector,{PRODUCTNAME:pname});
                this.api.useXpath();
                actions.waitForElementVisible(this,select3,50000);
            },
            getProductCode: function(){
                return new Promise(function (resolve,reject){
                    var wb = new Excel.Workbook();
                    var path = require('path');
                    var filePath = path.resolve('./nemoReset/testdata','test.xlsx');
                    var pcode;
                
                    wb.xlsx.readFile(filePath).then(function(){
                        var sh = wb.getWorksheet("Sheet1");
                        var x;
                        //Get all the rows data [1st and 2nd column]
                        for (i = 1; i <= sh.rowCount; i++) {
                            //console.log(sh.getRow(i).getCell(1).value+" "+sh.getRow(i).getCell(2).value);
                            
                            if(sh.getRow(i).getCell(1).value==="N")
                            {
                                pcode=sh.getRow(i).getCell(2).value;
                                x=i;
                                break;
                            }
                        }
                    
                        sh.getRow(x).getCell(1).value="U";
                        sh.getRow(x).commit();
                        console.log("before");
                        for (i = 1; i <= sh.rowCount; i++) {
                            console.log(sh.getRow(i).getCell(1).value+" "+sh.getRow(i).getCell(2).value);
                            
                            
                        }
                        wb.xlsx.writeFile('./nemoReset/testdata/test.xlsx')
                        .then(function(){
                            resolve(pcode);
                        });
                      
                        console.log("after");
                        for (i = 1; i <= sh.rowCount; i++) {
                            console.log(sh.getRow(i).getCell(1).value+" "+sh.getRow(i).getCell(2).value);
                            
                            
                        }
                    });  
                });    
            }



        }]
};
