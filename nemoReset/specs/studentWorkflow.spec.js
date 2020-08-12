var screenshots = require('./../lib/screenshots');
var assert = require('../lib/assertionLibrary.js');
var helper = require('../lib/helper.js');
var testData = require('../testdata/nemoResetTestData.js');

 

describe('Cambridge One APP', function () {
      
    //Variable Declaration
    var username,password,className,emailCreator,studentDashboard,productCode,pname,cname,key;
    var inputtxt1,inputtxt2,inputtxt3;
    var textn,savedmsg,psskill,submitmarking,dwnld,scorablename,nonscorename,scorableScore;

    before(function (browser, done) {

         test_data = browser.globals.test;     
         password = testData.nemoReset.teacher.password;
         emailCreator = testData.nemoReset.emailCreator;
         studentDashboard = testData.nemoReset.studentDashboard;
         productCode='QD8P-R4TU-3FA4-FA8A';
         pname='Evolve Level 1';
         cname='AAWebTest';
         key='dbj9-2X8i';
         textn='hi';
         savedmsg='Saved just now';
         psskill='Sample Productive Skill';
         submitmarking='Submitted for marking';
         dwnld='Sample Audio file';
         scorablename='R22_EV_PE_INT_L2_U10_5_S3_V04.zip';
         nonscorename='Non-Scoreable Activity1 Flashcards';
         inputtxt1='about';
         inputtxt2='watching';
         inputtxt3='its';
         scorableScore=testData.nemoReset.activityScore;
        //Create unique email address

        username = "learner_" + Math.random().toString(36).substr(2, 5) + emailCreator.suffix;
          // username="learner_xh6zz@mailinator.com";
        done();

        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();

        done();
     });

    it('TC_003: Verify that new student login can be created and student can enroll into a product', function (browser) {
        
        console.log(username);

        
        //Click get started button
        nemoLaunchPageObj.clickGetStartedButton();
        //Create page object for user registeration page
        userRegisterPageObj = browser.page['userRegistration.page']();
        //Wait for the next screen to appear
        userRegisterPageObj.waitForLearnerRadioIconToAppear();
        //Select learner option
        userRegisterPageObj.clickLearnerOption();
        //Wait for the learner list to appear
        userRegisterPageObj.waitForLearnerListToAppear();
        //Click on next button
        userRegisterPageObj.clickChooseUserRoleNextButton();
        //Wait for the registration form to appear
        userRegisterPageObj.waitForRegistrationScreenToAppear();
        //Enter user details and register
        userRegisterPageObj.registerAsNewUser(username);
        //Wait for the verify your email screen to appear
        userRegisterPageObj.waitForEmailVerificationScreenToAppear();
        //Navigate to email creator
        browser.url(emailCreator.url);
        //Wait for email box to appear
        userRegisterPageObj.waitForEmailBoxToAppear();
        //Enter email ID in the email box and press enter
        userRegisterPageObj.enterEmail(username);
        //Wait to account activation email to appear
        userRegisterPageObj.waitForActivationEmailToAppear();
        //Click on the activation email
        userRegisterPageObj.clickEmail();
        //Wait for iframe to appear
        userRegisterPageObj.waitForFrame();
        //Enter iframe
        browser.frame(1, function() {
            //Wait for account activation link to appear
            userRegisterPageObj.waitForEmailVerificationLink();
           
            //Click the account activation link
            userRegisterPageObj.clickEmailVerificationLink();
            
        });
        //Using browser handles function
        browser.window_handles(function(result) {
            //Switching focus to the new window
           // browser.switchWindow(result.value[0]);
            browser.switchWindow(result.value[1]);

            //Creating page object of student dashboard page
            studentOnboardingPageObj = browser.page['studentOnboarding.page']();
            //Wait for the start learning page to appear
            studentOnboardingPageObj.waitForStartLearningButtonToAppear();
            //Get start learning button text
           /* studentOnboardingPageObj.getStartLearningText(function(result)
            {
                //Verify that the student account has been created
                browser.verify.equal(result,studentDashboard.startLearningButtonText,"Actual result is not as expected")
            })*/
        });    
 



        studentOnboardingPageObj = browser.page['studentOnboarding.page']();
        //wait start learning
        studentOnboardingPageObj.waitForStartLearningButtonToAppear();
        //Click on start learning button
        studentOnboardingPageObj.clickStartLearningButton();
        //wait for product activation page
        studentOnboardingPageObj.waitForHaveActivationCodeOptionToAppear();
        //wait for product code input box
        studentOnboardingPageObj.waitForEnterActivationCodeTextboxToAppear();
        // Enter the activation code
        studentOnboardingPageObj.enterActivationCode(productCode);
        // Click product activation button
        studentOnboardingPageObj.clickActivateButton();
        // Wait for product activated success page
        studentOnboardingPageObj.waitForActivationSuccessNextButton();
        // Click next button
        studentOnboardingPageObj.clickActivationSuccessNextButton();
        // wait for my private learning option
        studentOnboardingPageObj.waitForLearningOnMyOwnOptionToAppear();
        // click my private learning
        studentOnboardingPageObj.clickLearningOnMyOwnOption();
        //Verify product on student dashboard
        studentOnboardingPageObj.verifyJoinedproduct(pname);
    });

    it('TC_004: Verify that the student can enroll into a class and attempt activities', function (browser) {
        
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Click login button
        nemoLaunchPageObj.clickLogin();
        
        
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        //Login via Student
        nemoLoginPageObj.login(username,password);
        //Create student dashboard page object
        nemoStudentDashboardPageObj = browser.page['studentDashboard.page']();
        //wait for student dashboard
        nemoStudentDashboardPageObj.waitForPageLoad();
        //Click Add class button
        nemoStudentDashboardPageObj.addClass();
        //wait for class key input box
        nemoStudentDashboardPageObj.waitClassKeyInput();
        //input Class Key
        nemoStudentDashboardPageObj.inputClassKey(key);
        //wait for join button
        nemoStudentDashboardPageObj.waitJoin();
        //click join button
        nemoStudentDashboardPageObj.clickJoin();
        //wait Learn button*/
        nemoStudentDashboardPageObj.waitLearn();
        //click learn button
        nemoStudentDashboardPageObj.clickLearn();
        //wait for student dashboard
        nemoStudentDashboardPageObj.waitForPageLoad();
        //verify joined class
        nemoStudentDashboardPageObj.verifyJoinedClass(cname);

        //Wait for class load
        nemoStudentDashboardPageObj.waitForClassLoad();
        //Go to class
        nemoStudentDashboardPageObj.goToClass();    
        //Create object for Learning Pathway
        nemoClassLearningPathwayPageObj= browser.page['classLearningPathway.page']();
        //Wait for LP
        nemoClassLearningPathwayPageObj.waitForPageLoad(scorablename);
        
      


        //open scorable
        nemoClassLearningPathwayPageObj.openScorable(scorablename);
        
        //scorable progress
       nemoClassLearningPathwayPageObj.scorableProgress(scorablename);
       nemoClassLearningPathwayPageObj.waitForFrame();

       browser.frame('iframe_1528285334091-1528285590109-1540554613329',function()
       {
           nemoClassLearningPathwayPageObj.waitinput1();
           nemoClassLearningPathwayPageObj.enterinput1(inputtxt1);
        });
         browser.frame(null);
         nemoClassLearningPathwayPageObj.waitcheck();
         nemoClassLearningPathwayPageObj.clickcheck();
         nemoClassLearningPathwayPageObj.waitnext();
         nemoClassLearningPathwayPageObj.clicknext();
   
   
         nemoClassLearningPathwayPageObj.waitForFrame();
   
          browser.frame('iframe_1528285334091-1528285590109-1540554613329',function()
       {
           nemoClassLearningPathwayPageObj.waitinput2();
           nemoClassLearningPathwayPageObj.enterinput2(inputtxt2);
        });
         browser.frame(null);
         nemoClassLearningPathwayPageObj.waitcheck();
         nemoClassLearningPathwayPageObj.clickcheck();
         nemoClassLearningPathwayPageObj.waitnext();
         nemoClassLearningPathwayPageObj.clicknext();
   
         nemoClassLearningPathwayPageObj.waitForFrame();
   
          browser.frame('iframe_1528285334091-1528285590109-1540554613329',function()
       {
           nemoClassLearningPathwayPageObj.waitinput3();
           nemoClassLearningPathwayPageObj.enterinput3(inputtxt3);
        });
         browser.frame(null);
         nemoClassLearningPathwayPageObj.waitcheck();
         nemoClassLearningPathwayPageObj.clickcheck();
         nemoClassLearningPathwayPageObj.waitnext();
         nemoClassLearningPathwayPageObj.clicknext();
   
   
   
   
         nemoClassLearningPathwayPageObj.waitsubmit();
         nemoClassLearningPathwayPageObj.clicksubmit();
         nemoClassLearningPathwayPageObj.waitnextact();
         nemoClassLearningPathwayPageObj.clicknextact();
         nemoClassLearningPathwayPageObj.waitscore(scorablename);
         nemoClassLearningPathwayPageObj.checkscore(function(result)
         {
           browser.verify.equal(result,scorableScore.marks,"Actual result is not as expected");
         },scorablename)
         nemoClassLearningPathwayPageObj.waitstar(scorablename);
   
      nemoClassLearningPathwayPageObj.opennonscore(nonscorename);
     //nemoClassLearningPathwayPageObj.nonscoreprogress();
      nemoClassLearningPathwayPageObj.waitstar(nonscorename);


    
       //Open a PS
       nemoClassLearningPathwayPageObj.openPS(psskill);
       //Wait for PS to load
       nemoClassLearningPathwayPageObj.waitToloadPS();
       //Fill text in text area
       nemoClassLearningPathwayPageObj.fillTextInPS(textn);
       //clickSave
       nemoClassLearningPathwayPageObj.saveText();
       // wait for save to complete
       nemoClassLearningPathwayPageObj.waitForSave(savedmsg);
       //submit
       nemoClassLearningPathwayPageObj.clickSubmit();
       //wait for final submit
       nemoClassLearningPathwayPageObj.waitFinalSubmit();
       //final submit pop-up
       nemoClassLearningPathwayPageObj.clickFinalSubmit();
       //Verify submission
       nemoClassLearningPathwayPageObj.verifySubmit(submitmarking);
        //verify progress icon
        nemoClassLearningPathwayPageObj.progressVisiblePS(psskill);

      //Open Downloadable item
      nemoClassLearningPathwayPageObj.openDownloadable(dwnld);
      //Load downloadable
      nemoClassLearningPathwayPageObj.loadDownloadable();
 
       
    });

    afterEach(function (browser, done) {

         //take screenshot on every test completion

        screenshots.takeScreenshot(browser);

        done();

        //Logout

        headerPageObj = browser.page['header.page']();

        headerPageObj.clickUserProfileDropdown();

        headerPageObj.waitForLogoutToAppear();

        headerPageObj.clickLogout();

        nemoLaunchPageObj.waitForGetStartedButtonToAppear();

        done();

    });


    after(function (browser, done) {
         //close browser

        if (browser.sessionId) {

            browser.end(function () {

                done();

            });

        } else {

            done();

        }

    });

});