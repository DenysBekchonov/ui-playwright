import LocatorOrString = CodeceptJS.LocatorOrString;
import Page from './pages';
import Data from '../data/itemFactory'

const { I, headerFragment } = inject();

class Login extends Page {

  private userEmailField : LocatorOrString = locate('input[type="email"]').as('User email field');
  private userPasswordField : LocatorOrString = locate('input[type="password"]').as('User password field');
  private signInButtom : LocatorOrString = locate('button[class="action login primary"]').as('SignIn button');
  private loginPageTitle : LocatorOrString = locate('span[class="base"]').as('Login page title');

  constructor() {
    super('/customer/account/login/referer/')
  }

  open() : Login {
    super.open();
    I.see('Customer Login', this.loginPageTitle);
    return this;
  }

  waitForOpened(): Login {
    super.waitForOpened();
    I.see('Customer Login', this.loginPageTitle);
    return this;
  }

  logIn(userData : Data) : Login {
    I.fillField(this.userEmailField, userData.emailLogin);
    I.fillField(this.userPasswordField, userData.passwordLogin);
    I.scrollTo(this.signInButtom);
    I.click(this.signInButtom);
    headerFragment.checkLogin(userData);
    //headerFragment.openMyAccount();
    return this;
  }
  
}

export = new Login;