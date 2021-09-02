var config = require('./../../config/config.js')
var fs = require('fs');
var filepath = "./testdata_" + testEnv + ".csv"

describe('Setup', function() {

  before(function (browser, done) {
    if (fs.existsSync(filepath)) {
      done();
    } else {
      fs.appendFile(filepath,"email,status\n",
      function(err) {
      if(err) {
        return console.log(err);
      }
      console.log("File created successfully!");
     });
      done();
    }
  })

  for(i=0;i<count;i++) {
    it('Student registers in IELTS app', function(browser) {
      registerUser(browser)
    });
  }


  afterEach(function (browser, done) {
    fs.appendFile(filepath,username_learner+",false\n",
    function(err) {
    if(err) {
    return console.log(err);
    }
     console.log("The test data file was saved!");
     });
    if (browser.sessionId) {
      browser.end(function () {
          done();
      });
    } else {
      done();
    }               
  });


});

function registerUser(browser) {
  browser
      .url(config[testEnv].registerUrl, function() {
        console.log("Launching URL: " + config[testEnv].loginUrl)
      })
      .maximizeWindow(function() {
        username_learner = "cqaproduser3+" + Date.now() + "@gmail.com";
        console.log(username_learner);
        dashboardPage = browser.page['dashboard.page']();
        productLaunchPage = browser.page['productLaunch.page']();
        userRegisterPageObj = browser.page['userRegistration.page']();
        userRegisterPageObj.waitForRegistrationScreenToAppear();
        userRegisterPageObj.registerAsNewUserNew(username_learner);
        userRegisterPageObj.waitForEmailVerificationScreenToAppear();
        browser.pause(10000);
        browser.url("https://mail.google.com/", function() {
          browser
            .pause(2000)
            .click("input#identifierId")
            .setValue("input#identifierId", "cqaproduser3@gmail.com")
            .useXpath()
            .click("//span[text()='Next']//parent::button")
            .pause(2000)
            .setValue("//input[@name='password']", "Compro11")
            .click("//span[text()='Next']//parent::button")
            .pause(10000)
            .click("//span[text()='Verify your new Cambridge One account']//ancestor::tr[1]")
            .pause(2000)
            .click("//a[text()='Verify']")
            .useCss()
            .windowHandles(function(result) {
              var handle = result.value[1];
              browser.switchWindow(handle, function() {
                dashboardPage.chooseSkillBand()
                productLaunchPage.validateTestContainerLaunch();
              });
            })
        })
        
      });
}