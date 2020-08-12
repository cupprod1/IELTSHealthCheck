var helper = require('./helper');

module.exports = {

//Screenshot will be created with the default name i.e test description + current datetime
    takeScreenshot:function(browser)
    {
        var save_dir = browser.options.screenshotsPath;
        browser.saveScreenshot(save_dir + '/' + browser.currentTest.module+"/"+browser.currentTest.name+"_"+helper.getTimeStamp()+Math.random()+".png")
    },

//Screenshot will be created with the name passed by test.
    takeScreenshotWithName:function(browser,screenshotname)
    {
        var save_dir = browser.options.screenshotsPath;
        browser.saveScreenshot(save_dir + '/'+ browser.currentTest.module+"/"+screenshotname+".png");
    }
};
