var config = require('./../../config/config.js')
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
var email, rowNumber;
var flag = false
var filepath = "testdata_" + testEnv + ".csv"
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: filepath,
  header: [
    {id: 'email', title: 'email'},
    {id: 'status', title: 'status'}
  ]
});

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
        fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          results.forEach(function(user, index) {
            if (user.status == "false" && flag == false) {
              rowNumber = index + 2
              flag = true
              email = user.email
              user.status = true
              done();
            }         
          })
          csvWriter
                .writeRecords(results)
                .then(()=> console.log('The CSV file was written successfully'));
        });
      });
  });

  it('Scenario 3 - Student launches the IELTS assignment and then submit this assignment', function(browser) {
    console.log("Email id: " + email + " at Row Number: " + rowNumber)
    loginPage.waitForUsernameToAppear(); 
    loginPage.login(email, "Compro11");
    dashboardPage.clickProgressTile();
    progressPage.clickReadingTile();
    progressPage.clickReadingTest();
    productLaunchPage.validateTestContainerLaunch();
    productLaunchPage.validateMetricaFrameToAppear();
    productLaunchPage.moveToLastQuestion();
    productLaunchPage.submitAssignment();
    productLaunchPage.validatePaymentOverlay();
    productLaunchPage.validateStatusIcon();  
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

