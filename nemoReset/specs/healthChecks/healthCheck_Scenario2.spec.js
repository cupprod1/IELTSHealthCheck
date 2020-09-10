var config = require('./../../config/config.js')

describe('IELTS - Health Check Test', function() {
  
  before(function(browser, done) {
    loginPage = browser.page['ieltsLogin.page']();
    dashboardPage = browser.page['dashboard.page']();
    progressPage = browser.page['progress.page']();
    productLaunchPage = browser.page['productLaunch.page']();
    homePage = browser.page['home.page']();
    billingInfoPage = browser.page['billingInfo.page']();

    browser
      .url(config[testEnv].loginUrl, function() {
        console.log("Launching URL: " + config[testEnv].loginUrl)
      })
      .maximizeWindow(function() {
        done();
      });
  });

  it('Scenario 2 - Student launches an already submitted assignment and go to billing page to confirm integration with KonaKart', function(browser) {
    loginPage.waitForUsernameToAppear();  
    loginPage.login(config[testEnv].student_scenario2.email, config[testEnv].student_scenario2.password);
    dashboardPage.clickProgressTile();
    progressPage.clickReadingTile();
    progressPage.clickReadingTest();
    productLaunchPage.validatePaymentOverlay();
    productLaunchPage.validateStatusIcon();
    productLaunchPage.clickPaymentButton();
    billingInfoPage.validateBillingInfo();
    billingInfoPage.completeBillingForm();
    billingInfoPage.clickPaymentButtonStep2();
    if(testEnv != "thor" && testEnv != "qa") {
      billingInfoPage.validateCheckoutPage();
      billingInfoPage.cancelPayment();
      productLaunchPage.validatePaymentOverlay();
    }
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