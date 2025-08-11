import {
  setHeadlessWhen,
  setCommonPlugins
} from '@codeceptjs/configure';
import {
  chromium
} from 'playwright';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './scenarios/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://magento.softwaretestingboard.com',
      show: true,
      restart: false,
      timeout: 10000,
      fullPageScreenshots: true,
      uniqueScreenshotNames: false,
      waitForNavigation: 'commit',
      waitForAction: 1000,
      getPageTimeout: 30000,
      waitForTimeout: 30000,
      windowSize: '1280x780'
    },
    REST: {
      endpoint: 'http://site.com/api',
      prettyPrintJson: true,
      onRequest: (request) => {
        request.headers.auth = '123';
      }
    }
  },
  include: {
    I: './steps_file',
    registrationPage: "./pages/registrationPage.ts",
    loginPage: "./pages/loginPage.ts",
    productOrderPage: "./pages/orderPage.ts",
    mainPage: "./pages/mainPage.ts",

    headerFragment: "./pages/fragments/header.ts",

    userProfilePagePage: "./pages/userProfilePage.ts",
  },
  name: 'magento.softwaretestingboard',
    mocha: {
    reporterOptions: {
      "codeceptjs-cli-reporter": {
        "stdout": "-",
        "options": {
          "verbose": true,
          "steps": true,
        }
      },
      "mocha-junit-reporter": {
        "stdout": "-",
        "options": {
          "mochaFile": "./test-reports/result.xml",
          "attachments": true //add screenshot for a failed test
        }
      }
    }
  },
  plugins: {
    allure: {
      enabled: true,
      require: "allure-codeceptjs",
      outputDir: './test-reports/allure',
    },
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}