var screenshots = require('../lib/screenshots');
var assert = require('../lib/assertionLibrary');
var helper = require('../lib/helper');
var testData = require('../testdata/nemoResetTestData');

describe('Account Creation Feature', function () {
    //Variable Declaration
    var username,password,textn,scorableScore,savedmsg,psskill,dwnld,scorablename,nonscorename;
     var inputtxt1,inputtxt2,inputtxt3;

    beforeEach(function (browser, done) {
        test_data = browser.globals.test;
       username='learner_ty7g4@mailinator.com';
       password = 'Compro11';
       textn='hi';
       savedmsg='Saved just now';
       psskill='Sample Productive Skill';
       submitmarking='Submitted for marking';
       dwnld='Sample Audio file';
       scorablename='R22_EV_PE_INT_L2_U10_5_S3_V04.zip';
       nonscorename='Non-Scoreable Activity1 Flashcards';
       inputtxt1='about';
       inputtxt2='watching';
       inputtxt3='its';

       scorableScore=testData.nemoReset.activityScore;
        //done();
        //Create object of nemo launch page
        nemoLaunchPageObj = browser.page['nemoLaunch.page']();
        //Launch nemo url
        nemoLaunchPageObj.navigate();
        //Wait for the nemo launch page to appear
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
        done();
    });

    it('Student can access dashboard', function (browser) {
        
        
        //Wait for login button
        nemoLaunchPageObj.waitForLoginButtonToBePresent();
        //Click login button
        nemoLaunchPageObj.clickLogin();
        //Create object for login page
        nemoLoginPageObj = browser.page['login.page']();
        //Wait for login page
        nemoLoginPageObj.waitForPageLoad();
       //Enter User deatils
        nemoLoginPageObj.login(username,password);
        //Create student dashboard page object
        nemoStudentDashboardPageObj = browser.page['studentDashboard.page']();
        //Wait for student dashboard
        nemoStudentDashboardPageObj.waitForPageLoad();
        //Wait for class load
        nemoStudentDashboardPageObj.waitForClassLoad();
        //Go to class
        nemoStudentDashboardPageObj.goToClass();    
        //Create object for Learning Pathway
        nemoClassLearningPathwayPageObj= browser.page['classLearningPathway.page']();
        //Wait for LP
        nemoClassLearningPathwayPageObj.waitForPageLoad(scorablename);
        browser.pause(25000);
      


        //open scorable
        nemoClassLearningPathwayPageObj.openScorable(scorablename);
        
        //scorable progress
       nemoClassLearningPathwayPageObj.scorableProgress(scorablename);
       nemoClassLearningPathwayPageObj.waitForFrame();
       

       browser.frame('iframe_1528285334091-1528285590109-1540554613329',function()
       //browser.frame(0,function()
    {
        //console.log('inside frame');
        nemoClassLearningPathwayPageObj.waitinput1();
        
        nemoClassLearningPathwayPageObj.enterinput1(inputtxt1);
     });
      browser.frame(null);
      nemoClassLearningPathwayPageObj.waitcheck();
      nemoClassLearningPathwayPageObj.clickcheck();
      nemoClassLearningPathwayPageObj.waitnext();
      nemoClassLearningPathwayPageObj.clicknext();
      //nemoClassLearningPathwayPageObj.waitnextdisappear();

      nemoClassLearningPathwayPageObj.waitForFrame();
                      
       browser.frame('iframe_1528285334091-1528285590109-1540554613329',function()
    {
        nemoClassLearningPathwayPageObj.waitinput2();
        nemoClassLearningPathwayPageObj.enterinput2(inputtxt2);
     });
      browser.frame(null);
      nemoClassLearningPathwayPageObj.waitcheck();
      nemoClassLearningPathwayPageObj.clickcheck();
      nemoClassLearningPathwayPageObj.waitnext();
      nemoClassLearningPathwayPageObj.clicknext();
      

      nemoClassLearningPathwayPageObj.waitForFrame();

       browser.frame('iframe_1528285334091-1528285590109-1540554613329',function()
    {
        nemoClassLearningPathwayPageObj.waitinput3();
        nemoClassLearningPathwayPageObj.enterinput3(inputtxt3);
     });
      browser.frame(null);
      nemoClassLearningPathwayPageObj.waitcheck();
      nemoClassLearningPathwayPageObj.clickcheck();
      nemoClassLearningPathwayPageObj.waitnext();
      nemoClassLearningPathwayPageObj.clicknext();




      nemoClassLearningPathwayPageObj.waitsubmit();
      nemoClassLearningPathwayPageObj.clicksubmit();
      nemoClassLearningPathwayPageObj.waitnextact();
      nemoClassLearningPathwayPageObj.clicknextact();
      nemoClassLearningPathwayPageObj.waitscore(scorablename);
      nemoClassLearningPathwayPageObj.checkscore(function(result)
      {
        browser.verify.equal(result,scorableScore.marks,"Actual result is not as expected");
      },scorablename)
      nemoClassLearningPathwayPageObj.waitstar(scorablename);
   
      nemoClassLearningPathwayPageObj.opennonscore(nonscorename);
     //nemoClassLearningPathwayPageObj.nonscoreprogress();
      nemoClassLearningPathwayPageObj.waitstar(nonscorename);


    
       //Open a PS
       nemoClassLearningPathwayPageObj.openPS(psskill);
       //Wait for PS to load
       nemoClassLearningPathwayPageObj.waitToloadPS();
       //Fill text in text area
       nemoClassLearningPathwayPageObj.fillTextInPS(textn);
       //clickSave
       nemoClassLearningPathwayPageObj.saveText();
       // wait for save to complete
       nemoClassLearningPathwayPageObj.waitForSave(savedmsg);
       //submit
       nemoClassLearningPathwayPageObj.clickSubmit();
       //wait for final submit
       nemoClassLearningPathwayPageObj.waitFinalSubmit();
       //final submit pop-up
       nemoClassLearningPathwayPageObj.clickFinalSubmit();
       //Verify submission
       nemoClassLearningPathwayPageObj.verifySubmit(submitmarking);
        //verify progress icon
        nemoClassLearningPathwayPageObj.progressVisiblePS(psskill);

      //Open Downloadable item
      nemoClassLearningPathwayPageObj.openDownloadable(dwnld);
      //Load downloadable
      nemoClassLearningPathwayPageObj.loadDownloadable();
 
      

    //-------------------------------------------------------------------------------------
        headerPageObj = browser.page['header.page']();
        headerPageObj.clickUserProfileDropdown();
        headerPageObj.waitForLogoutToAppear();
        headerPageObj.clickLogout();
        nemoLaunchPageObj.waitForGetStartedButtonToAppear();
    });

    

    afterEach(function (browser, done) {

        //take screenshot on every test completion
        screenshots.takeScreenshot(browser);

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



