var screenshots = require('./../lib/screenshots');
var assert = require('../lib/assertionLibrary.js');
var testData = require('../testdata/nemoResetTestData.js');

describe('Cambridge One APP', function () {
    //Variable Declaration
    var password;

    before(function (browser, done) {              
        password = testData.nemoReset.teacher.password;
        a_password='#compro@1254';
        studentDashboard = testData.nemoReset.studentDashboard;                        
        username_admin = 'admin1_aberystwyth_prod1@comprodls.com';            
	    studentOnboardingPageObj = browser.page['studentOnboarding.page']();
        done();
        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        //nemoLaunchPageObj.waitForGetStartedButtonToAppear();
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        nemoLaunchPageObj.clickLogin();
        //Wait for login button
        //nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
        headerPageObj = browser.page['header.page']();
         done();
    });
    it('Verify that the learning path app and class app are working', function(browser) {
        //Wait for login button
       // nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Click login button
      //  nemoLaunchPageObj.clickLogin();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
       // nemoLoginPageObj.waitForPageLoad();
        nemoLoginPageObj.login('health.check@yopmail.com','Compro11');
        studentDashboard = browser.page['studentDashboard.page']();
        studentDashboard.waitForProductAppear();
        studentDashboard.practiceextraopen();
        nemoClassLearningPathwayPageObj= browser.page['classLearningPathway.page']();
        nemoClassLearningPathwayPageObj.waitForFrame();// this is different than prod test
        browser.pause(20000);
        nemoClassLearningPathwayPageObj.goback();
        studentDashboard.waitForProductAppear();
        studentDashboard.goToClass2();
        studentDashboard.waitForAnalytic();
    });   
    xit('Admin Login and access dashboard', function (browser) {  
        nemoLaunchPageObj.clickLogin();
       // nemoLaunchPageObj.waitForLoginButtonToBePresent();
        nemoLoginPageObj = browser.page['login.page']();
        nemoLoginPageObj.waitForPageLoad();
        nemoLoginPageObj.login(username_admin,a_password);
        nemoAdminDashboardPageObj = browser.page['nemoAdminDashboard.page']();
        nemoAdminDashboardPageObj.waitForTabs();
        //count of tabs
        browser.elements('css selector',".my-spaces .flex-wrap .flex-column",function(result){   //Need to change the selector for teacher/admin
            if(result.value.length !=5)
            {
                browser.assert.fail('Tabs Count do not match');
            }
        });   
    });     
    xit('Support-Admin Login and access dashboard', function (browser) {
        browser.url('https://www.cambridgeone.org?p=@cambridge.org&t=saml');
        browser.pause(10000);
        browser.window_handles(function(result) {
            browser.switchWindow(result.value[1]);   
            nemoSupportAdminDashboardPageObj = browser.page['nemoSupportAdminDashboard.page']();
            //Wait for okta login
            nemoSupportAdminDashboardPageObj.waitForOktalogin();       
        });
        browser.window_handles(function(result) {
            browser.switchWindow(result.value[0]);  
            //Wait for search box
            nemoSupportAdminDashboardPageObj.waitForSearchBox();      
        });        
    });     


    afterEach(function (browser, done) {
      //  take screenshot on every test completion
        screenshots.takeScreenshot(browser);
        done();
        //Logout
        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
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
