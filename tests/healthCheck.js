var config = require('./../config/config.js')

describe('IELTS - Health Check Test', function() {

  // this.timeout = config.overallTimeout;
  
  before(function(browser, done) {
    
    loginPage = browser.page.loginPage();
    dashboardPage = browser.page.dashboardPage();
    progressPage = browser.page.progressPage();
    productLaunchPage = browser.page.productLaunchPage();
    homePage = browser.page.homePage();
    
    browser
      .url(config[testEnv].loginUrl, function() {
        console.log("Launching URL: " + config[testEnv].loginUrl)
      })
      .maximizeWindow()
      .waitForElementVisible(loginPage.elements.username, config[testEnv].timeout, "Step 1: Login Page (Checking username field)")
      .setValue(loginPage.elements.username, config[testEnv].student.email)
      .setValue(loginPage.elements.password, config[testEnv].student.password)
      .click(loginPage.elements.submitButton, function() {
        done();
      })
  });

  it('Verify Assignment Launch', function(browser) {
    browser
      .waitForElementVisible(dashboardPage.elements.progressTile, config[testEnv].timeout, "Step 2: Dashboard Page (Checking visibility of Progress Tile)")
      .click(dashboardPage.elements.progressTile)
      .waitForElementVisible(progressPage.elements.readingTile, config[testEnv].timeout, 'Step 3: Progress Page (Checking visibility of Reading Tile)')
      .click(progressPage.elements.readingTile)
      .waitForElementVisible(progressPage.elements.readingTest, config[testEnv].timeout, "Checking Reading Tile is expanded")
      .click(progressPage.elements.readingTest)
      .waitForElementVisible(productLaunchPage.elements.testContainer, config[testEnv].timeout, 'Step 4: Launch IETLS Test Page (Checking Container is painted)')
      .frame(0)
      .waitForElementVisible(productLaunchPage.elements.answerOption2, config[testEnv].timeout, "Step 5: Validating Metrica Frame & Test Content")
      .waitForElementVisible(productLaunchPage.elements.currentQuestionCount, config[testEnv].timeout, "Step 6: Metrica Score Progress Layer")
      .assert.containsText(productLaunchPage.elements.currentQuestionCount, config[testEnv].student.currentQuestionCount, "Checking Current Score is matching")
      .assert.containsText(productLaunchPage.elements.totalQuestionCount, config[testEnv].student.totalQuestionCount, "Checking Total Score is matching")
      .frameParent()
      .click(dashboardPage.elements.userProfileName)
      .click(dashboardPage.elements.logoutButton)
      .waitForElementVisible(homePage.elements.heading, config[testEnv].timeout, "Logged Out successfully")
  });

  after(function (browser, done) {
    console.log("Ending After")
    if (browser.sessionId) {
      browser.end(function () {
          done();
      });
    } else {
      done();
    }
  });

});