var config = require('./../config/config.js')
var testEnv = "thor"
describe('IELTS - Health Check Test', function() {
  
  before(function(browser, done) {
    loginPage = browser.page['ieltsLogin.page']();
    dashboardPage = browser.page['dashboard.page']();
    progressPage = browser.page['progress.page']();
    productLaunchPage = browser.page['productLaunch.page']();
    // homePage = browser.page['homePage']();

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
    loginPage.login();
  });
   
  it('Step 2: Dashboard Page (Checking visibility of Progress Tile)', function(browser) {
    dashboardPage.clickProgressTile();
  }); 

  it('Step 3: Progress Page (Checking visibility of Reading Tile)', function(browser) {
    progressPage.clickReadingTile();
    progressPage.clickReadingTest();
  }); 

  it('Step 4: Launch IETLS Test Page (Checking Container is painted)', function(browser) {
    productLaunchPage.validateTestContainerLaunch();
  });

  it('Step 5: Validating Metrica Frame & Test Content', function(browser) {
    productLaunchPage.validateAnswerOption2();
  });

  it('Step 6: Metrica Score Progress Layer', function(browser) {
    productLaunchPage.validateScoreProgress();
    browser
      .frame(0)
      .assert.containsText(productLaunchPage.elements.currentQuestionCount.selector, config[testEnv].student.currentQuestionCount, "Checking Current Score is matching")
      .assert.containsText(productLaunchPage.elements.totalQuestionCount.selector, config[testEnv].student.totalQuestionCount, "Checking Total Score is matching")
      .frameParent()
  });

  it('Step 7: Logout', function(browser) {
    dashboardPage.logout();
  });  

    // productLaunchPage.clickReadingTest();
    // browser
    //   .waitForElementVisible(productLaunchPage.elements.currentQuestionCount, config[testEnv].timeout, "Step 6: Metrica Score Progress Layer")
    //   .assert.containsText(productLaunchPage.elements.currentQuestionCount, config[testEnv].student.currentQuestionCount, "Checking Current Score is matching")
    //   .assert.containsText(productLaunchPage.elements.totalQuestionCount, config[testEnv].student.totalQuestionCount, "Checking Total Score is matching")
    //   .frameParent()
    //   .click(dashboardPage.elements.userProfileName)
    //   .click(dashboardPage.elements.logoutButton)
    //   .waitForElementVisible(homePage.elements.heading, config[testEnv].timeout, "Logged Out successfully")

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