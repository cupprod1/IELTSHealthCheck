var screenshots = require('./../lib/screenshots');
var assert = require('../lib/assertionLibrary.js');
var helper = require('../lib/helper.js');
var testData = require('../testdata/nemoResetTestData.js');

describe('Account Creation Feature', function () {
    //Variable Declaration
    var emailCreator, studentDashboard, teacher;

    beforeEach(function (browser, done) {
        test_data = browser.globals.test;
        emailCreator = testData.nemoReset.emailCreator;
        studentDashboard = testData.nemoReset.studentDashboard;
        teacher = testData.nemoReset.teacherDashboard
        //done();
        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
        done();
    });

    it('PTO_2_TC01 - User should be able to create an account successfully.', function (browser) {
        //Create unique email address
        email = "learner_" + Math.random().toString(36).substr(2, 5) + emailCreator.suffix;
        console.log(email)
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
        userRegisterPageObj.registerAsNewUser(email);
        //Wait for the verify your email screen to appear
        userRegisterPageObj.waitForEmailVerificationScreenToAppear();
        //Navigate to email creator
        browser.url(emailCreator.url);
        //Wait for email box to appear
        userRegisterPageObj.waitForEmailBoxToAppear();
        //Enter email ID in the email box and press enter
        userRegisterPageObj.enterEmail(email);
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
            browser.switchWindow(result.value[0]);
            browser.switchWindow(result.value[1]);
            //Creating page object of student dashboard page
            studentOnboardingPageObj = browser.page['studentOnboarding.page']();
            //Wait for the start learning page to appear
            studentOnboardingPageObj.waitForStartLearningButtonToAppear();
            //Get start learning button text
            studentOnboardingPageObj.getStartLearningText(function(result)
            {
                //Verify that the student account has been created
                browser.verify.equal(result,studentDashboard.startLearningButtonText,"Actual result is not as expected")
            })
        });    
        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
    });

    it('Teacher account creation.', function (browser) {
        //Create unique email address
        email = "teacher_" + Math.random().toString(36).substr(2, 5) + emailCreator.suffix;
        console.log(email)
        //Click get started button
        nemoLaunchPageObj.clickGetStartedButton();
        //Create page object for user registeration page
        userRegisterPageObj = browser.page['userRegistration.page']();
        //Wait for the next screen to appear
        userRegisterPageObj.waitForInstructorOptionToAppear();
        //Select learner option
        userRegisterPageObj.clickInstructorOption();
        //Wait for the learner list to appear
        userRegisterPageObj.waitForInstructorListToAppear();
        //Click on next button
        userRegisterPageObj.clickChooseUserRoleNextButton();
        //Wait for the registration form to appear
        userRegisterPageObj.waitForRegistrationScreenToAppear();
        //Enter user details and register
        userRegisterPageObj.registerAsNewUser(email);
        //Wait for the verify your email screen to appear
        userRegisterPageObj.waitForEmailVerificationScreenToAppear();
        //Navigate to email creator
        browser.url(emailCreator.url);
        //Wait for email box to appear
        userRegisterPageObj.waitForEmailBoxToAppear();
        //Enter email ID in the email box and press enter
        userRegisterPageObj.enterEmail(email);
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
            browser.switchWindow(result.value[0]);            
            browser.switchWindow(result.value[1]);   
            //Creating page object of student dashboard page
            teacherOnboarding = browser.page['teacherOnboarding.page']();
            //Wait for the start learning page to appear
            teacherOnboarding.waitForStartTeacherButtonToAppear();
            //Get start learning button text
            teacherOnboarding.getStartTeachingText(function(result)
            {                
                //Verify that the student account has been created
                browser.verify.equal(result,teacher.startTeachingButtonText,"Actual result is not as expected")
            })         
        });        
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



