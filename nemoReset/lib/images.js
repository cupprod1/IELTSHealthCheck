require('./logging');

module.exports =
{
    //This function is used to detect if there is any broken/not loaded image.

    checkBrokenImage: function (browser,callback)
    {
        //Getting all images
        var broken = 0;
        browser.elements('xpath','//img', function (result)
        {
            testlog.info("Total Images = "+result.value.length);
            {
                result.value.forEach(
                    function(element,i)
                    {
                        /* Get and verify the "Natural Width" of an image. If "Natural Width" is less than or equal
                         to "0" that indicates image loading failed. It also print the source of broken image and
                         total number of broken images.
                         */
                        browser.elementIdAttribute(element.ELEMENT,"naturalWidth",function(resNaturalWidth)
                        {
                            if(resNaturalWidth.value<=0)
                            {
                                browser.elementIdAttribute(element.ELEMENT,"src",function(resSrc)
                                {
                                    testlog.warn("Broken Image Source Path = "+resSrc.value);
                                    broken = broken + 1;
                                    if(i==result.value.length-1)
                                    {
                                        callback(broken)
                                    }
                                });
                            }
                            else{
                                if(i==result.value.length-1)
                                {
                                    callback(broken)
                                }
                            }
                        });
                    }
                )
            }
        });
    }
};