var screenshots = require('./../lib/screenshots');
var testData = require('../testdata/nemoResetTestData.js');

describe('Cambridge One APP', function () {
    //Variable Declaration
    var password;

    before(function (browser, done) {              
        password = testData.nemoReset.teacher.password;
        a_password='#compro@1254';
        studentDashboard = testData.nemoReset.studentDashboard;                        
        username_admin = 'admin1_aberystwyth_prod1@comprodls.com';            
	    studentOnboardingPageObj = browser.page['studentOnboarding.page']();
        done();
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        nemoLaunchPageObj.navigate();
        headerPageObj = browser.page['header.page']();
         done();
    });

    it('Support-Admin Login and  Outputs Institutes And Registered Users', function (browser) {
       browser.url('https://cambridgeone.org?p=@cambridge.org&t=saml');
       browser.pause(10000);
       var count;
        browser.window_handles(function(result) {
            browser.switchWindow(result.value[1]);   
            nemoSupportAdminDashboardPageObj = browser.page['nemoSupportAdminDashboard.page']();
            //Wait for okta login
            nemoSupportAdminDashboardPageObj.waitForOktalogin();       
        });
        browser.window_handles(function(result) {
            browser.switchWindow(result.value[0]);  
            //Wait for search box
            nemoSupportAdminDashboardPageObj.waitForSearchBoxAndGetAllInstitutes();
            count=nemoSupportAdminDashboardPageObj.getSchoolCount(function(resi) {
                count=resi;
                count=parseInt(count.match(/\d+/));
                console.log(count);
                nemoSupportAdminDashboardPageObj.getDetails(browser,count);
            });
        });
    });    

    after(function (browser, done) {
        console.log("closing");
        //close browser
        if (browser.sessionId) {
            browser.end(function () {
                done();
            });
        } else {
            done();
        }
    });
});
