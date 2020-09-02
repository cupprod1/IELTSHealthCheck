var config = require('./../config/config.js')

describe('IELTS - Health Check Test', function() {
  
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

  it('Scenario 1 - Launch In Progress Assignment', function(browser) {
    loginPage.waitForUsernameToAppear();  
    loginPage.login(config[testEnv].student.email, config[testEnv].student.password);
    dashboardPage.clickProgressTile();
    progressPage.clickReadingTile();
    progressPage.clickReadingTest();
    productLaunchPage.validateTestContainerLaunch();
    productLaunchPage.waitForAnswerOptionsToAppear();
    browser
      .frame(0)
      .useXpath()
      .assert.containsText(productLaunchPage.elements.answerOption2.selector, config[testEnv].student.answer2Text, "Checking Answer Option 2 Text is matching")
      .useCss()
      .frameParent()
    productLaunchPage.validateScoreProgress();
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