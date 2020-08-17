var config = require('./../config/config.js')

describe('IELTS - Health Check Test - Scenario 2 - Launch Submitted Assignment', function() {
  
  before(function(browser, done) {
    loginPage = browser.page['ieltsLogin.page']();
    dashboardPage = browser.page['dashboard.page']();
    progressPage = browser.page['progress.page']();
    productLaunchPage = browser.page['productLaunch.page']();
    homePage = browser.page['home.page']();

    browser
      .url(config[testEnv].loginUrl, function() {
        console.log("Launching URL: " + config[testEnv].loginUrl)
      })
      .maximizeWindow(function() {
        done();
      });
  });

  it('Step 1: Login Page', function(browser) {
    loginPage.waitForUsernameToAppear();  
    loginPage.login(config[testEnv].student_scenario2.email, config[testEnv].student_scenario2.password);
  });
   
  it('Step 2: Dashboard Page (Checking visibility of Progress Tile)', function(browser) {
    dashboardPage.clickProgressTile();
  }); 

  it('Step 3: Progress Page (Checking visibility of Reading Tile)', function(browser) {
    progressPage.clickReadingTile();
    progressPage.clickReadingTest();
  }); 

  it('Step 4: Launch IETLS Test Page (Checking Payment Overlay is present)', function(browser) {
    productLaunchPage.validatePaymentOverlay();
  });

  it('Step 5: Validating Cross icon is appearing', function(browser) {
    productLaunchPage.validateCrossIcon();
  });

  it('Step 6: Logout (Checking visibility of Home Page', function(browser) {
    dashboardPage.logout();
    browser.waitForElementVisible(homePage.elements.heading.selector, config[testEnv].timeout, "Logged Out successfully")
  });  

  after(function (browser, done) {
    if (browser.sessionId) {
      browser.end(function () {
          done();
      });
    } else {
      done();
    }
  });

});