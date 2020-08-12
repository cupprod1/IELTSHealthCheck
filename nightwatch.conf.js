module.exports = {
  "src_folders" : ["tests"],
  "page_objects_path" : ["./pages"],

  "webdriver" : {
    "start_process": true,
    "server_path": require('chromedriver').path,
    "port": 9515
  },

  "test_settings" : {
    "default" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [ 'disable-dev-shm-usage', 'no-sandbox', 'headless']
        }
      },

      "test_runner" : {
        "type" : "mocha",
        "options" : {
          "ui" : "bdd",
          "reporter" : "list"
        }
      }
    }
  }
}

const argv = require('yargs').argv
if (!argv.testEnv) {
  argv.testEnv = "thor"
}
global.testEnv = argv.testEnv
