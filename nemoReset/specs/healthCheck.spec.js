var config = require('./../config/config.js')
var testEnv = "thor"
describe('IELTS - Health Check Test', function() {

  // this.timeout = config.overallTimeout;
  
  before(function(browser, done) {
    loginPage = browser.page['ieltsLogin.page']();
    // dashboardPage = browser.page.dashboardPage();
    // progressPage = browser.page.progressPage();
    // productLaunchPage = browser.page.productLaunchPage();
    // homePage = browser.page.homePage();

    // console.log(loginPage.elements.username.selector)
    browser
      .url(config[testEnv].loginUrl, function() {
        console.log("Launching URL: " + config[testEnv].loginUrl)
      })
      .maximizeWindow(function() {
        done();
      });
  });

  it('Verify Assignment Launch', function(browser) {
    console.log("Entering it");
    loginPage.waitForUsernameToAppear();  
    loginPage.login();
    // dashboardPage.clickProgressTile();
    // progressPage.clickReadingTile();

    // browser
    //   .waitForElementVisible(dashboardPage.elements.progressTile, config[testEnv].timeout, "Step 2: Dashboard Page (Checking visibility of Progress Tile)")
    //   .click(dashboardPage.elements.progressTile)
    //   .waitForElementVisible(progressPage.elements.readingTile, config[testEnv].timeout, 'Step 3: Progress Page (Checking visibility of Reading Tile)')
    //   .click(progressPage.elements.readingTile)
    //   .waitForElementVisible(progressPage.elements.readingTest, config[testEnv].timeout, "Checking Reading Tile is expanded")
    //   .click(progressPage.elements.readingTest)
    //   .waitForElementVisible(productLaunchPage.elements.testContainer, config[testEnv].timeout, 'Step 4: Launch IETLS Test Page (Checking Container is painted)')
    //   .frame(0)
    //   .waitForElementVisible(productLaunchPage.elements.answerOption2, config[testEnv].timeout, "Step 5: Validating Metrica Frame & Test Content")
    //   .waitForElementVisible(productLaunchPage.elements.currentQuestionCount, config[testEnv].timeout, "Step 6: Metrica Score Progress Layer")
    //   .assert.containsText(productLaunchPage.elements.currentQuestionCount, config[testEnv].student.currentQuestionCount, "Checking Current Score is matching")
    //   .assert.containsText(productLaunchPage.elements.totalQuestionCount, config[testEnv].student.totalQuestionCount, "Checking Total Score is matching")
    //   .frameParent()
    //   .click(dashboardPage.elements.userProfileName)
    //   .click(dashboardPage.elements.logoutButton)
    //   .waitForElementVisible(homePage.elements.heading, config[testEnv].timeout, "Logged Out successfully")
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