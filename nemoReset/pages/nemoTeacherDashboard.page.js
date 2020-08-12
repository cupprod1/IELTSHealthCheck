var actions = require("./../lib/browserAction.js");
var format = require("string-template");

module.exports = {
    elements: {
        createClassLink: {
            //selector: '[href="/teacher/class/create-class"]'
            //selector: '.no-class .add-course-link'
            selector:'.plus-icon>a'
        },
        userDropdown: {
            //selector: '#dropdownMenuLink'
           selector: '#element_S3_8990_EV_OPA2_U10_L05_video02a_602729'
        },
        logout: {
            selector: '[class*="userProfile"] [class*="logout"]'
        },

        classNameTextBox: {
            selector: '[class*="create-class"] [name="classTitle"]'
        },
        instituteSelectorTextBox: {
            selector: '[qid="cClass-1"]'
        },
        aberystwythCollegeCheckBox: {
            selector: '.dropdown-item:nth-child(1) .radio-wrapper'
        },
        createClassNextButton: {
            selector: '[class*="create-class"] button[type="submit"]'
        },
        createClassSuccessMessage: {
          selector: '.school-key-success>h2'
        },
        classSuccessTeachButton: {
            selector: '[class*="school-key-success"] button'
        },
        className: {
            selector: '//a[contains(text(),"{CLASSNAME}")]',
            locateStrategy: 'xpath'
        },
        classKey: {
            selector: '//div[contains(@class,"user-space-container")]//a[contains(text(),"{CLASSNAME}")]/../..//div[contains(@class,"class-info")]//span[contains(@class,"class-key")]//strong',
            //selector: 'anil',
            locateStrategy: 'xpath'
        },
        addCourseMaterial: {
            selector: '//a[contains(text(),"{CLASSNAME}")]/../..//a[contains(@class,"add-course-link")]',
            locateStrategy: 'xpath'

        },
        evolveLevel1: {
           // selector: '[for="product28"]'
           //selector:'//label[text()="Evolve Level 1"]',
           selector:'//label[text()="Evolve Level 1 (C1 Live)"]',
           locateStrategy:'xpath'
        },
        addProductButton: {
            selector: '#course-materials-modal [class~="btn-add-product"]'
        },
        classProductName: {
            selector: '//a[contains(text(),"{CLASSNAME}")]/../..//a[contains(@qid,"tDashboard-2-")]//div[contains(@class,"heading4")]',
            locateStrategy: 'xpath'
        },
        teacherClass:{
            selector:'[qid="tDashboard-17-00"]'
        },
        pracexto:{
            selector:'[qid="tDashboard-000"]'
        },
        teacherProduct: {
            selector:'//p[contains(text(),"auto comproqa testproduct123")]',
            locateStrategy:'xpath'
        },
        addTeacherLink:{
            selector:'[qid="cView-23"]'
        },
        addedteacher:{
            selector:'[for="teacherAddModal0"]'
        },
        addteacherbtn:{
            selector:'[qid="cView-28"]'
        },
        addteacherverifytext:{
            selector:'//*[contains(text(),"{ADDTEACHERTEXT}")]',
            locateStrategy:'xpath'
        },
        removeTeacher:{
            selector:'[for="teacher0"]'
        },
        removeButton:{
            selector:'[qid="cView-50"]'
        },
        removeModal:{
            selector:'[qid="cView-30"]'
        },
        cancelbtn:{
            selector:'.remove-msg:nth-of-type(1)'
        },
        remoteacherverifytext:{
            selector:'//*[contains(text(),"{REMOVETEACHERTEXT}")]',
            locateStrategy:'xpath'
        },
        learnerCheckbox:{
            selector:'[for="learner0"]'
        },
        studentverifytext:{
            selector:'//*[contains(text(),"{REMOVESTUDENT}")]',
            locateStrategy:'xpath'
        },
        backbtn:{
            selector:'[qid="cHeader-8"]'
        },
        progressbar:{
            selector:'.progress-info:nth-of-type(2)'
        },
        averagescore:{
            selector:'.progress-info:nth-of-type(2)>div:nth-of-type(1)>p'
        },
        compcount:{
            selector:'.progress-info:nth-of-type(2)>div:nth-of-type(2)>div:nth-of-type(2)>p:nth-of-type(1) .text-part-1'
        },
        compabovecount:{
            selector:'.progress-info:nth-of-type(2)>div:nth-of-type(3)>p'
        },
        compbelowcount:{
            selector:'.progress-info:nth-of-type(2)>div:nth-of-type(4)>p'
        },
        timeact:{
            selector:'.progress-info:nth-of-type(2)>div:nth-of-type(5)>p'
        },
        markingCount:{
            selector: '[qid="tDashboard-3-00"] .hasCount'
        },
        welcomemsg:{
            selector:'.welcome-msg:nth-of-type(1)'
        },
        practiceextra:{
            selector:'[qid="cView-62"]'
        },
        practiceextra2:{
            selector:'//*[contains(text(),"Practice Extra")]',
            locateStrategy:'xpath'
          //  selector:'a.media.mb-4:nth-of-type(1)'
        },
        classaudio:{
            selector:'[qid="cView-63"]'
        },
        testgenerator:{
            selector:'[qid="cView-64"]'
        },
        studentEmail:{
            selector: '.learners-container .detail .email'
        },
        learningmaterials:{
            selector:'.digital-components h2'
        }
    },
    commands: [
        {
            //Function to verify if provided class present
            isClassPresent: function(className,callback){
                var select8 = format(this.elements.className.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.isElementPresentUsingXpath(this,select8,function(result)
                {
                    if(result==true)
                    {
                        callback(true);
                    }
                    else
                    {
                        callback(false);
                    }
                })
            },
            //Function for getting class created successfully message
            getClassSuccessMessage: function(callback)
            {
                this.api.useCss();
                actions.getElementText(this,this.elements.createClassSuccessMessage.selector,callback)
            },
            //MOve to "Evolve Level 1" product in add product popup
            moveToEvolve1: function(){
                this.api.useXpath();           
                actions.moveToElement(this,this.elements.evolveLevel1.selector);
                
            },
            //Wait for Create Class Link to appear
            waitForCreateClassLinkToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.createClassLink.selector,60000);
            },
            //Click on Create Class Link
            clickCreateClassLink: function(){
                this.api.useCss();
                actions.click(this,this.elements.createClassLink.selector);
            },
            //Function for waiting classname screen to be appear    
            waitForClassNameTextBoxToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.classNameTextBox.selector,60000);
            },
            //Function for Create Class
            createClass: function(className){
                this.api.useCss();
                actions.setValue(this,this.elements.classNameTextBox.selector,className)                
               // actions.click(this,this.elements.instituteSelectorTextBox.selector);
               // actions.waitForElementVisible(this,this.elements.aberystwythCollegeCheckBox.selector,60000);                
               // actions.click(this,this.elements.aberystwythCollegeCheckBox.selector);   
            },
            //Function for waiting Teach button in Create class screen
            waitForClassSuccessTeachButtonToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.classSuccessTeachButton.selector,60000);
            },
            //Function to click on "Teach" button in create class screens
            clickClassSuccessTeachButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.classSuccessTeachButton.selector);
            },
            //Function: Move to Class key related to provided classname
            moveToClassKey: function(className){
                var select11 = format(this.elements.classKey.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.moveToElement(this,select11);
            },
            //Function: Move to Add Course Material link related to provided classname
            moveToAddCourseMaterialLink: function(className){
                var select13 = format(this.elements.addCourseMaterial.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.moveToElement(this,select13);
            },
            //Function: Wait for Class key to appear related to provided classname
            waitForClassKeyToAppear: function(className){
                var select1 = format(this.elements.classKey.selector,{CLASSNAME:className});
                this.api.useXpath();               
                actions.waitForElementVisible(this,select1,60000);
            },
            //Function: Get Class key related to provided classname
            getClassKey: function(className,callback)
            {
                var selectClassKey = format(this.elements.classKey.selector,{CLASSNAME:className});
                this.api.useXpath();               
                actions.getElementText(this,selectClassKey,callback);
            },
            //Function: Click on "Add Course Material" link related to provided classname
            clickAddCourseMaterialLink: function(className){
                var select3 = format(this.elements.addCourseMaterial.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.click(this,select3);
            },
            //Function: Wait for "Add Product" model/popup to appear
            waitForAddProductButtonToAppear: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.addProductButton.selector,60000);
            },
            clickCreate:function(){
                this.api.useCss();
                actions.click(this,this.elements.createClassNextButton.selector);
            },
            //Function: Wait for "Add Product" model/popup to disappear
            waitForAddProductButtonToDisappear: function(){
            this.api.useCss();
            actions.waitForElementNotVisible(this,this.elements.addProductButton.selector,60000);
            },
            //Function: Click on "Evolve Level 1" checkbox in Add product model/popup
            clickEvolve1Checkbox: function(){
                this.api.useXpath();
                actions.click(this,this.elements.evolveLevel1.selector);
            },
            //Function: Click on Add product button in the model/popup
            clickAddProductButton: function(){
                this.api.useCss();
                actions.click(this,this.elements.addProductButton.selector);
            },
            //Function: Move to Class Product link related to provided classname
            moveToClassProductName: function(className)
            {
                var select7 = format(this.elements.classProductName.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.moveToElement(this,select7,60000);
            },
            //Function: Wait for Class Product link to appear related to provided classname
            waitForClassProductName: function(className){
                var select4 = format(this.elements.classProductName.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.waitForElementVisible(this,select4,60000);
            },
            //Function: Fetch/get Class Product related to provided classname
            fetchClassProduct: function(className,callback)
            {
                var select5 = format(this.elements.classProductName.selector,{CLASSNAME:className});
                this.api.useXpath();
                actions.getElementText(this,select5,callback)
            },
            goToClass:function(){
                actions.click(this,'@teacherClass');
            },
            waitForClassAppear:function(){
              actions.waitForElementVisible(this,'@teacherClass',50000);
            },
            waitForProductAppear:function() {
                actions.waitForElementVisible(this,'@teacherProduct',50000);
            },
            openProduct:function() {
                actions.click(this,'@teacherProduct');
            },
            waitForAddTeacher:function(){
             actions.waitForElementVisible(this,'@addTeacherLink',50000);
            },
            clickAddTeacher:function(){
                actions.click(this,'@addTeacherLink');
            },
            waitSelectTeacher:function(){
                actions.waitForElementVisible(this,'@addedteacher',50000);
            },
            selectTeacher:function(){
                this.api.useCss();
                actions.click(this,this.elements.addedteacher.selector);
            },
            waitforaddbtn:function(){
               actions.waitForElementVisible(this,'@addteacherbtn',50000);
            },
            clickaddteacherbtn:function(){
                actions.click(this,'@addteacherbtn');
            },
            verifyAddedTeacher:function(vertext){
                var select3 = format(this.elements.addteacherverifytext.selector,{ADDTEACHERTEXT:vertext});
                this.api.useXpath();
                actions.waitForElementVisible(this,select3,50000);

             },
             moveToTeacher: function(){
                this.api.useCss();           
                actions.moveToElement(this,this.elements.addedteacher.selector);
                
             },
             selectAddedTeacher:function(){
                this.api.useCss();
                actions.click(this,this.elements.removeTeacher.selector);
             },
             waitForRemoveBtn:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.removeButton.selector,50000);
             },
             clickRemoveBtn:function(){
                this.api.useCss();
                actions.click(this,this.elements.removeButton.selector);
             },
             clickFinalRemove:function(){
                this.api.useCss();
                actions.click(this,this.elements.removeModal.selector);
               
             },
             waitFinalRemove:function(){
                 this.api.useCss();
                 actions.waitForElementVisible(this,this.elements.cancelbtn.selector,25000);
             },
             verifyRemovedTeacher:function(vertext1){
                var select3 = format(this.elements.remoteacherverifytext.selector,{REMOVETEACHERTEXT:vertext1});
                this.api.useXpath();
                actions.waitForElementVisible(this,select3,50000);
             },
             lastRemove:function(){
                actions.waitForElementVisible(this,this.elements.removeModal.selector,25000);
             },
             selectStudent:function(){
                this.api.useCss();
                 actions.click(this,this.elements.learnerCheckbox.selector);
             },
             waitForStudentCheckbox:function(){
                 this.api.useCss();
                 actions.waitForElementVisible(this,this.elements.learnerCheckbox.selector,50000);
             },
             verifyRemovedStudent:function(vertext2){
                var select3 = format(this.elements.studentverifytext.selector,{REMOVESTUDENT:vertext2});
                this.api.useXpath();
                actions.waitForElementVisible(this,select3,50000); 
             },
             removeBtnPresent:function(){
                this.api.useCss();
                actions.waitForElementPresent(this,this.elements.removeModal.selector,25000);
             },
             clickBackBtn:function(){
                this.api.useCss();
                actions.click(this,this.elements.backbtn.selector);
             },
             waitForSelectTeacher:function(){
                this.api.useCss();
                actions.waitForElementPresent(this,this.elements.removeTeacher.selector,25000);
             },
             waitbackbtn:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.backbtn.selector,50000);
             },
             waitForAnalytic:function(){
                 this.api.useCss();
                 actions.waitForElementVisible(this,this.elements.progressbar.selector,50000);
             },
             waitavgscore: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.averagescore.selector,50000);

            },
            checkavgscore: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.averagescore.selector,callback);

            },
            waitcompletedCount: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.compcount.selector,50000);

            },
            checkcompletedCount: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.compcount.selector,callback);

            },
            waitcompletedAbove: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.compabovecount.selector,50000);

            },
            checkcompletedAbove: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.compabovecount.selector,function(result)
                {                    
                    var count = result.split("/");                                 
                    callback(count[0].trim())
                });
            },
            waitcompletedBelow: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.compbelowcount.selector,50000);

            },
            checkcompletedBelow: function(callback){
                this.api.useCss();
                actions.getElementText(this,this.elements.compbelowcount.selector,function(result)
                {                    
                    var count = result.split("/");                                    
                    callback(count[0].trim())
                });
            },
            timeSpent: function(){
                this.api.useCss();
                actions.waitForElementPresent(this,this.elements.timeact.selector,50000);
            },
            waitforwelcomemsg:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.welcomemsg.selector,50000);
            },
            waitForPracticeExtra:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.practiceextra.selector,50000);
            },
            waitForPracticeExtraOfAutoComproQa:function() {
              //  this.api.useCss();
                actions.waitForElementVisible(this,this.elements.practiceextra2.selector,50000);
            },
            openProductAutoComproQa: function() {
               // this.api.useCss();
                actions.click(this,this.elements.practiceextra2.selector);
            },
            waitForClassAudio:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.classaudio.selector,50000);
            },
            waitForTestGenerator:function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.testgenerator.selector,50000);
            },
            openStudentDetails: function(){
                this.api.useCss();
                actions.click(this,this.elements.studentEmail.selector);
            },
            waitProfileDropDown: function(){
                this.api.useCss();
                actions.waitForElementVisible(this,this.elements.userDropdown.selector,60000);
            },
            practiceextraopen: function(){
                actions.click(this,'@pracexto');
            }
        }
    ]
};
