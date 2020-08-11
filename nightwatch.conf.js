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
          "args": [ 'disable-dev-shm-usage']
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
