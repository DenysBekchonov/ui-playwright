import LocatorOrString = CodeceptJS.LocatorOrString;
import Page from './pages';
import Data from '../data/itemFactory'

const { I } = inject();

class RegistrationPage extends Page {

  private registrationPageTitle : LocatorOrString = locate("span[class='base']").as('Registration title');
  private userFirstName : LocatorOrString = locate("input[name='firstname']").as('User first name');
  private userLasttName : LocatorOrString = locate("input[name='lastname']").as('User last name');
  private userEmail : LocatorOrString = locate("input[name='email']").as('User email address');
  private userPassword : LocatorOrString = locate("input[name='password']").as('User password');
  private userConfirmPassword : LocatorOrString = locate("input[name='password_confirmation']").as('User confirm password');
  private userPasswordStrenght : LocatorOrString = locate("div#password-strength-meter span").as('Check password strenght');
  private createAnAccountButton : LocatorOrString = locate('//main//*[contains(text(),"Create an Account")]');

  constructor() {
    super('/customer/account/create/')
  }

  open() : RegistrationPage {
    super.open();
    I.see('Create New Customer Account', this.registrationPageTitle);
    return this;
  }

  waitForOpened(): RegistrationPage {
    super.waitForOpened();
    I.see('Create New Customer Account', this.registrationPageTitle);
    return this;
  }

  registration(userData : Data) : RegistrationPage {
    let password = userData.passwordRegistration
    I.fillField(this.userFirstName, userData.firstNameRegistration);
    I.fillField(this.userLasttName, userData.lastNameRegisatrtion);
    I.fillField(this.userEmail, userData.emailRegistration);
    I.fillField(this.userPassword, password);
    I.seeTextEquals('Very Strong', this.userPasswordStrenght);
    I.fillField(this.userConfirmPassword, password);
    return this;
  }

  createAccount() : void {
    I.click(this.createAnAccountButton);
  }
  
}

export = new RegistrationPage;