var config = require('./../../config/config.js')

describe('IELTS - Health Check Test', function() {
  
  before(function(browser, done) {
    loginPage = browser.page['ieltsLogin.page']();
    dashboardPage = browser.page['dashboard.page']();
    progressPage = browser.page['progress.page']();
    productLaunchPage = browser.page['productLaunch.page']();
    homePage = browser.page['home.page']();

    console.log("Launching URL: " + config[testEnv].loginUrl)
    browser
      .url(config[testEnv].loginUrl, function() {
        console.log("URL: " + config[testEnv].loginUrl + " launched successfully")
      })
      .maximizeWindow(function() {
        done();
      });
  });

  it('Scenario 1 - Student launches an incomplete IELTS assignment, checks for Metrica content and logs out', function(browser) {
    loginPage.waitForUsernameToAppear();  
    loginPage.login(config[testEnv].student.email, config[testEnv].student.password);
    dashboardPage.clickProgressTile();
    progressPage.clickReadingTile();
    progressPage.clickReadingTest();
    productLaunchPage.validateMetricaFrameToAppear();
    dashboardPage.logout();
    browser.waitForElementVisible(homePage.elements.heading.selector, config[testEnv].timeout, "Unable to log out successfully")
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