/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type registrationPage = typeof import('./pages/registrationPage');
type loginPage = typeof import('./pages/loginPage');
type productOrderPage = typeof import('./pages/orderPage');
type mainPage = typeof import('./pages/mainPage');
type headerFragment = typeof import('./pages/fragments/header');
type userProfilePagePage = typeof import('./pages/userProfilePage');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, registrationPage: registrationPage, loginPage: loginPage, productOrderPage: productOrderPage, mainPage: mainPage, headerFragment: headerFragment, userProfilePagePage: userProfilePagePage }
  interface Methods extends Playwright, REST {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
