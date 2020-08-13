
require('./logging');

module.exports = {
//Function to verify if an element present using css selector
isElementPresent: function(browser,element,callback)
{
    browser.api.element('css selector',element, function(result){
       if(result.status==0)
        {
            callback(true)
        }
        else
        {
            callback(false)
        }
    })
},
    //Function to verify if an element present using xpath
    isElementPresentUsingXpath: function(browser,element,callback)
    {
        browser.api.element('xpath',element, function(result){

            if(result.status==0)
            {
                callback(true)
            }
            else
            {
                callback(false)
            }
        })
    },
//Function to get element's attribute

    getElementAttribute: function(browser,element,attribute,callback) {
        browser.getAttribute(element,attribute,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
            callback(result.value);
        });
    },
//Function to get text inside an element.
    getElementText: function(browser,element,callback)
    {
        browser.getText(element,function(result){

            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
            callback(result.value);
        });
    },
//Function to get element's size/ total number of child
    getElementSize: function(browser,element,callback) {
        this.getElements(browser,element,function(result)
        {
            callback(result.value.length);
        })
    },
    //Function to get array of element's child names
    getElementsText: function(browser,element,callback)
    {
         this.getElements(browser,element,function(result)
            {
                var chapters = [];
                var chapterlooop = function(k,chaptercallbaack){
                    browser.api.elementIdText(result.value[k].ELEMENT, function (result1) {
                        chapters.push(result1.value);
                        if(++k < result.value.length)
                            chapterlooop(k,chaptercallbaack);
                        else
                            chaptercallbaack(chapters);
                    });

                };

                chapterlooop(0,function(result){
                   callback(result)
                });
            })
    },

//Generic function to be used as part of other functions.
getElements: function(browser,element,callback)
{
    browser.api.elements('css selector',element,function(result)
        {
            if(result.status!=0)
            {
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
            callback(result)
        }
       )
},
//Function to search and element in an element's child names
    clickChildOfElement: function(browser,childName, element) {
        this.getElements(browser,element,function(result)
            {
                result.value.forEach(
                    function(element1,i)
                    {
                        browser.api.elementIdText(element1.ELEMENT,function(textResult)
                            {
                                if(textResult.value==childName)
                                {

                                    browser.api.elementIdClick(element1.ELEMENT);
                                    result.value.length=0;

                                }
                                else
                                {
                                    if(i==result.value.length-1)
                                    {
                                        console.log("Item Not Found");
                                    }
                                }
                            }
                        );
                    }

                )
            }
        );
    },

    //Click function
    click: function(browser,element)
    {
        browser.click(element,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        });
    },

    //Function to get element's css property
    getElementCssProperty: function(browser,element,cssProperty,callback) {
        browser.getCssProperty(element,cssProperty,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
            callback(result.value);
        });
    },

    //Function to click multiple times on an element
    clickMultipleTimes: function(browser,element,noOfClicks)
    {
        for (var i = 0; i < noOfClicks; i++) {
            browser.click(element,function(result){
                browser.waitForElementVisible(element,5000, 'page not loaded in %d ms');
                if(result.status!=0){
                    testlog.error("Element '"+element+"' could not be located on the page.");
                    throw new Error("Element '"+element+"' could not be located on the page.");
                }
            })
        }
    },

    //Function to clear text present inside an input text box.
    clearValue: function(browser,element)
    {
        browser.clearValue(element,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        });
    },

    //Function to enter text inside an input text box
    setValue: function(browser,element,value)
    {
        browser.setValue(element,value,function(result){            
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        });
    },

    //Function to press enter after entering text inside an input text box.
    pressEnter: function(browser,element){
        browser.sendKeys(element, browser.api.Keys.ENTER)
    },

    //Wait for an element to be present
    waitForElementPresent: function(browser,element,timeout){
        browser.waitForElementPresent(element,timeout,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        });
    },

    //Wait for an element to disappear
    waitForElementNotPresent: function(browser,element,timeout){
        browser.waitForElementNotPresent(element,timeout,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' is still present on the page.");
                throw new Error("Element '"+element+"' is still present on the page.");
            }
        });
    },

    //Wait for an element to disappear
    waitForElementNotVisible: function(browser,element,timeout){
        browser.waitForElementNotVisible(element,timeout,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' is still visible on the page.");
                throw new Error("Element '"+element+"' is still visible on the page.");
            }
        });
    },

    waitForTextToBePresent: function(browser,element,getter,checker,timeout,callback){
        //console.log(browser.WaitForExpr.toString())
        browser.WaitForExpr(element,getter,checker,timeout,callback);
    },

    //Wait for an element to be visible
    waitForElementVisible: function(browser,element,timeout){
        browser.waitForElementVisible(element,timeout,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        });
    },

    //Function to get text present inside an input text box.
    getInputValue: function(browser,element,callback)
    {
        browser.getValue(element,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
            callback(result.value)
        })
    },

    

    //Function to move cursor over an element
    moveToElement: function(browser,element)
    {
        browser.moveToElement(element,50,50,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        })
    },

    //Function to click at particular position of an element
    clickAtParticularPosition: function(browser,element,x,y)
    {
        browser.moveToElement(element,x,y,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
        });
        browser.api.mouseButtonClick();
    },

    //Function to check element's presence on the page
    isElementVisible: function(browser,element,callback)
    {
        browser.isVisible(element,function(result){
            if(result.status!=0){
                testlog.error("Element '"+element+"' could not be located on the page.");
                throw new Error("Element '"+element+"' could not be located on the page.");
            }
            callback(result.value)
        });
    }

};

