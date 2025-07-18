import { before } from 'node:test';
import Data from '../data/itemFactory'

Feature('Sign in');

Before(({I, mainPage}) => {
    mainPage.open()
});

Scenario('Crean an account', async ({ I, registrationPage, mainPage}) => {
    let userData = new Data();

    mainPage.openRegistrationForm();

    registrationPage.waitForOpened().registration(userData).createAccount();

    let {successMessageText} = await mainPage.getSuccessMessageText();

    mainPage.checkSuccessMessageText({successMessageText});

}).tag('registration').tag('sign_in')

Scenario('User logins to the system', async ({ I, mainPage, loginPage, userProfilePagePage}) => {
    let userData = new Data();

    mainPage.openSignInPage();
    
    loginPage.waitForOpened().logIn(userData);

}).tag('login').tag('sign_in').tag('1')
