var screenshots = require("./../lib/screenshots");
var assert = require("../lib/assertionLibrary.js");
var helper = require("../lib/helper.js");
var testData = require("../testdata/nemoResetTestData.js");

describe("Cambridge One APP", function() {
  //Variable Declaration
  var username,
    password,
    className,
    emailCreator,
    teacher,
    percentage,
    feedback;
  before(function(browser, done) {
    test_data = browser.globals.test;
    username = testData.nemoReset.teacher.username;
    password = testData.nemoReset.teacher.password;
    //Set percentage and feedback of PS
    percentage = testData.nemoReset.teacher.percentage;
    feedback = testData.nemoReset.teacher.feedback;
    done();
    //Create object of nemo launch page
    nemoLaunchPageObj = browser.page["nemoLaunch.page"]();
    //Launch nemo url
    nemoLaunchPageObj.navigate();
    //Wait for the nemo launch page to appear
    nemoLaunchPageObj.waitForGetStartedButtonToAppear();
    done();
  });

  xit("TC-001: Verify that New Teacher account can be created and new teacher can enroll into ABERYSTWYTH COLLEGE.", function(browser) {
    console.log(username);
    //Click get started button
    nemoLaunchPageObj.clickGetStartedButton();
    //Create page object for user registeration page
    userRegisterPageObj = browser.page["userRegistration.page"]();
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
      browser.switchWindow(result.value[0]);
      browser.switchWindow(result.value[1]);
      //Creating page object of student dashboard page
      teacherOnboarding = browser.page["teacherOnboarding.page"]();
      //Wait for the start learning page to appear
      teacherOnboarding.waitForStartTeacherButtonToAppear();
      //Get start learning button text
      teacherOnboarding.getStartTeachingText(function(result) {
        //Verify that the student account has been created
        browser.verify.equal(
          result,
          teacher.startTeachingButtonText,
          "Actual result is not as expected"
        );
      });
      //Click on Start Teaching Button
      teacherOnboarding.clickStartTeachingButton();
      //Wait for Join Institute Page
      teacherOnboarding.waitForJoinInst();
      //Click on Join Institute
      teacherOnboarding.clickJoinInstitution();
      //Wait for enter school key page
      teacherOnboarding.waitForHaveSchoolKey();
      //Enter school key
      teacherOnboarding.enterSchoolKey(teacher.schoolKey);
      //Wait for next button
      teacherOnboarding.waitForNextButtonSchoolkey();
      //Click on Next button
      teacherOnboarding.clickNextSchoolkey();
      //Wait for school join success page
      teacherOnboarding.waitForSchoolJoinSuccess();
      //Click on Let's go
      teacherOnboarding.clickOnletsGoSuccess();
      //Wait for welcome message
      teacherOnboarding.waitForwelcomeInst();
    });
    /* headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();*/
  });
  xit("TC-002: Verify that teacher can create a class and associate a product", function(browser) {
    nemoLaunchPageObj.clickLogin();
    //Wait for login button
    nemoLaunchPageObj.waitForLoginButtonToBePresent();

    //Create object for login page
    nemoLoginPageObj = browser.page["login.page"]();
    //Wait for login page
    nemoLoginPageObj.waitForPageLoad();
    //Login via Teacher
    nemoLoginPageObj.login(username, password);
    //Create Teacher dashboard page object
    nemoTeacherDashboardPageObj = browser.page["nemoTeacherDashboard.page"]();
    //Wait for Teacher dashboard
    nemoTeacherDashboardPageObj.waitForCreateClassLinkToAppear();
    //Click Create Class link
    nemoTeacherDashboardPageObj.clickCreateClassLink();
    //Wait for enter classname text box to appear
    nemoTeacherDashboardPageObj.waitForClassNameTextBoxToAppear();
    //Create Class
    nemoTeacherDashboardPageObj.createClass(className);
    //Wait for class created successfully message to appear
    nemoTeacherDashboardPageObj.waitForClassSuccessTeachButtonToAppear();
    //Verify the class success message to ensure that class created successfully
    nemoTeacherDashboardPageObj.getClassSuccessMessage(function(result) {
      browser.verify.equal(
        result,
        "CLASS SUCCESSFULLY CREATED",
        "Actual result is not as expected"
      );
    });
    //Click on Teach Button
    nemoTeacherDashboardPageObj.clickClassSuccessTeachButton();
    //Wait for class key to appear
    nemoTeacherDashboardPageObj.waitForClassKeyToAppear(className);
    //Move to Add Course Material link
    nemoTeacherDashboardPageObj.moveToAddCourseMaterialLink(className);
    //Verify that class created with the name provided
    nemoTeacherDashboardPageObj.isClassPresent(className, function(result1) {
      browser.verify.equal(result1, true, "Actual result is not as expected");
    });
    //Fetch Class Key
    nemoTeacherDashboardPageObj.getClassKey(className, function(result2) {
      console.log("Class Key = " + result2);
    });
    //Click on Add Course Material link
    nemoTeacherDashboardPageObj.clickAddCourseMaterialLink(className);
    //Wait for pupup
    nemoTeacherDashboardPageObj.waitForAddProductButtonToAppear();
    //Move to Evolve Level 1 Product
    nemoTeacherDashboardPageObj.moveToEvolve1();
    //Select Evovle Level 1
    nemoTeacherDashboardPageObj.clickEvolve1Checkbox();
    //Click on Add Product button
    nemoTeacherDashboardPageObj.clickAddProductButton();
    //Wait for disappear add product popup
    nemoTeacherDashboardPageObj.waitForAddProductButtonToDisappear();
    //MOve to Class Product name
    nemoTeacherDashboardPageObj.moveToClassProductName(className);
    //Wait for Class Product name
    nemoTeacherDashboardPageObj.waitForClassProductName(className);
    //Verify Class product
    nemoTeacherDashboardPageObj.fetchClassProduct(className, function(res) {
      browser.verify.equal(
        res,
        "Evolve Level 1",
        "Actual result is not as expected"
      );
    });
  });

  it("TC-006: Mark PS Skill", function(browser) {
    nemoLaunchPageObj.clickLogin();
    //Wait for login button
    nemoLaunchPageObj.waitForLoginButtonToBePresent();

    //Create object for login page
    nemoLoginPageObj = browser.page["login.page"]();
    //Wait for login page
    nemoLoginPageObj.waitForPageLoad();
    //Login via Teacher
    nemoLoginPageObj.login(username, password);
    //Create Mark PS page object
    markPSPageObj = browser.page["markPS.page"]();
    //Wait for Teacher dashboard
    markPSPageObj.waitForMyMarking();
    //Click on my marking of class
    markPSPageObj.clickMyMarking();
    //Wait for Marking page to open
    markPSPageObj.waitForfeedbackInput();
    //Enter the percentage
    markPSPageObj.enterPercentageInput(percentage);
    // Enter the feedback
    markPSPageObj.enterfeedbackInput(feedback);
    //Wait for saving
    markPSPageObj.waitForSaveButton();
    //Click on save button
    markPSPageObj.clickSaveButton();
    //Wait for submit button to be enabled
    markPSPageObj.waitForSubmitButton();
    //Click on submit button
    markPSPageObj.clickSubmitButton();
    //Wait for submit sure
    markPSPageObj.waitForsureSubmit();
    //Click on submit sure
    markPSPageObj.clicksureSubmit();
    // Wait for Mark label to appear
    markPSPageObj.waitFormarkedLabel();
    //Wait for feedback visible
    markPSPageObj.waitForfeedbackscreen();
    //Check for correctness of feedback
    markPSPageObj.getFeedbackText(function(result) {
      console.log("Feedback on just marked PS");
      console.log(result);
      browser.verify.equal(result, feedback, "Actual result is not as expected");
    });
    markPSPageObj.getPercentageText(function(result) {
      console.log("Percentage on just marked PS");
      console.log(result);
      browser.verify.equal(result, percentage , "Actual result is not as expected");
    });
  });

  afterEach(function(browser, done) {
    //take screenshot on every test completion
    screenshots.takeScreenshot(browser);
    done();
    //Logout
    headerPageObj = browser.page["header.page"]();
    headerPageObj.clickUserProfileDropdown();
    headerPageObj.waitForLogoutToAppear();
    headerPageObj.clickLogout();
    nemoLaunchPageObj.waitForGetStartedButtonToAppear();
    done();

    /* //close browser
        if (browser.sessionId) {
            browser.end(function () {
                done();
            });
        } else {
            done();
        }*/
  });
  after(function(browser, done) {
    //close browser
    if (browser.sessionId) {
      browser.end(function() {
        done();
      });
    } else {
      done();
    }
  });
});
