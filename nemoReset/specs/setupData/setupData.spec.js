var config = require('./../../config/config.js')
var fs = require('fs');
var filepath = "./testdata_" + testEnv + ".csv"

describe('Setup', function() {

  before(function (browser, done) {
    if (fs.existsSync(filepath)) {
      done();
    } else {
      fs.appendFile(filepath,"email,status,,,,,,,,,,,,,,,,,,,\n",
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
    fs.appendFile(filepath,username_learner+",false,,,,,,,,,,,,,,,,,,,\n",
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
        username_learner = "learner_" + Date.now() + "@yopmail.com";
        console.log(username_learner);
        dashboardPage = browser.page['dashboard.page']();
        productLaunchPage = browser.page['productLaunch.page']();
        userRegisterPageObj = browser.page['userRegistration.page']();
        userRegisterPageObj.waitForRegistrationScreenToAppear();
        userRegisterPageObj.registerAsNewUserNew(username_learner);
        userRegisterPageObj.waitForEmailVerificationScreenToAppear();
        browser.pause(10000);
        browser.url("http://www.yopmail.com/en/", function() {
          browser
            .click("td.nw")
            .setValue("input#login", username_learner)
            .click("input.sbut")
            .waitForElementVisible("#inbox", 60000)
            .frame("ifmail")
            .useXpath()
            .waitForElementVisible('//a[text()="Verify"]', 20000)
            .click('//a[text()="Verify"]')
            .useCss()
            .frameParent()
            .windowHandles(function(result) {
              var handle = result.value[1];
              browser.switchWindow(handle, function() {
                dashboardPage.chooseSkillBand()
                productLaunchPage.validateTestContainerLaunch();

              // browser
              //   .waitForElementVisible("div.selection-container", 30000)
              //   .click('div.selection-container a[qid="skill-band-1"]')
              //   .waitForElementVisible('div.dropdown-menu.show a:nth-child(1)', 30000)
              //   .click('div.dropdown-menu.show a:nth-child(1)')
              //   .click('div.selection-container a[qid="skill-band-2"]')
              //   .waitForElementVisible('div.dropdown-menu.show a:nth-child(1)', 30000)
              //   .click('div.dropdown-menu.show a:nth-child(1)')
              //   .waitForElementNotPresent('a.start-test-btn.disabled', 30000)
              //   .click('a.start-test-btn')
              //   .waitForElementVisible('#testContainer', 30000)

              });
            })
        })
        
      });
}