
module.exports = {

    include: function (browser,actual,expected,message)
    {
        if (actual.includes(expected))
        {
            this.assertPass(browser);
        }
        else
        {
            this.assertFail(browser,message);
        }
    },

    isAbove: function (browser,value1,value2,message)
    {
        if (value2>value1)
        {
            this.assertPass(browser);
        }
        else
        {
            this.assertFail(browser,message);
        }
    },

    isBelow: function (browser,value1,value2,message)
    {
        if (value2<value1)
        {
            this.assertPass(browser);
        }
        else
        {
            this.assertFail(browser,message);
        }
    },

    assertPass: function (browser) {
        browser.assert.equal(true,true);
    },

    assertFail: function (browser, message) {
        browser.assert.equal("Fail","Pass",message);
    }

    };

