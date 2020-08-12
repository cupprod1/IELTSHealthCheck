// Waits for N rounds for some element to appear
function refreshUntilElementPresent(PageObj,
    element) {
  currentRound = 0;
  return new Promise(function(resolve, reject) {
    /**
     * @arg {string} element
     * @arg {object} options
     * @param {number} options.maxRounds Number of times to refresh before we fail. Default = 10 rounds.
     * @param {number} options.timeout Timeout between refreshes in ms. Default = 60 seconds.
     */

    function checker(
      { maxRounds = 10, timeout = 30000 } = {}
    ) {
      PageObj.api.pause(timeout)
      .element('xpath',element, (result) => {
        //console.log(result.status);
        if (result.status == 0) {
          console.log("Element Found");
          resolve(true);
        } else if (this.currentRound < maxRounds) {
          console.log(
            `ROUND: ${this.currentRound} - not found`
          );
          PageObj.api
            .pause(1000)
            .refresh()
            .perform(() => {
              this.currentRound++;
              // Recursively call our command if we haven't found the element
              checker({ maxRounds, timeout });
            });
        } else {
            PageObj.api.assert.fail(
            result,
            true,
            `Element not Present after ${maxRounds} rounds.`
          );
          resolve(false);
        }
      });
    };
    checker();
  });
}

module.exports = refreshUntilElementPresent;