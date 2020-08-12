var screenshots = require('../lib/screenshots');
var assert = require('../lib/assertionLibrary');
var helper = require('../lib/helper');
var testData = require('../testdata/nemoResetTestData');

describe('Account Creation Feature', function () {
    //Variable Declaration
    var username,password;

    beforeEach(function (browser, done) {
       test_data = browser.globals.test;
       username='webtester18@yopmail.com';
       password = 'Compro11';
       productCode='QQ3J-L3BF-9HT7-WR9Z';
      // learnclass= "I'm learning as part of a class";
       pname='Evolve Level 1';
       cname='AAWebTest';
       key='dbj9-2X8i';

       scorableScore=testData.nemoReset.activityScore;
        //done();
        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Click login button
        nemoLaunchPageObj.clickLogin();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
       //Enter User deatils
        nemoLoginPageObj.login(username,password);
        done();
    });

    it('TC_003 : Student adds product', function (browser) {
        
        //Creating page object of student onboarding page
        studentOnboardingPageObj = browser.page['studentOnboarding.page']();
        //Wait for the start learning page to appear
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

        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
    });

    
    it('Student join class', function (browser) {

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


        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
       
    });



    afterEach(function (browser, done) {
      

        //take screenshot on every test completion
        screenshots.takeScreenshot(browser);

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


