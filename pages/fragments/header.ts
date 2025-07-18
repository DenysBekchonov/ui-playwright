import LocatorOrString = CodeceptJS.LocatorOrString;
import Page from '../pages';
import Data from '../../data/itemFactory'

const { I } = inject();

class Header extends Page {

  constructor() {
  super('/')
  }

  //createAnAccountButton : locate ('header li:nth-child(3) a').as('Create an account button'),
  private createAnAccountButton : LocatorOrString = locate ('//a[contains(text(),"Create an Account")]').as('Create an account button');
  private signInButton : LocatorOrString = locate ('li[class="authorization-link"] a').as('Sign in button');
  private cartQuantity : LocatorOrString = locate ('span[class="counter-number"]').as('Cart quantity ').as('Cart quantity');
  private linkToCartSuccessAlet : LocatorOrString = locate ('div[role="alert"]:nth-child(1) a').as('Link to cart');
  private quantityCounter : LocatorOrString = locate ('div.minicart-wrapper span.counter').as('Quantity counter');
  private welcomeLoginElement : LocatorOrString = locate('div.panel span.logged-in').as('Welcome login header');
  private myAccountDropdown : LocatorOrString = locate('header div.header li.customer-welcome button').as('My account dropdown');
  private myAccountOptin : LocatorOrString = locate('div.customer-menu li:nth-child(1)').as('My account option');

  openRegistrationForm() : Header {
    //I.waitForText('Click “Write for us” link in the footer to submit a guest post', this.notLoggedInText)
    //I.waitForClickable(this.createAnAccountButton);
    I.click(this.createAnAccountButton);

    return this
  }

  openSignInPage() : void{
    I.click(this.signInButton);
  }

  checkcartQuantity(items) : void {
    I.waitForVisible(this.quantityCounter);
    I.see(items, this.cartQuantity);
  }

  goToCartAfterAdding() : void {
    I.click(this.linkToCartSuccessAlet);
  }
  
  checkLogin(userData) : Header {
    I.waitForVisible(this.welcomeLoginElement);
    I.seeTextEquals(userData.welcomeLogginText, this.welcomeLoginElement);

    return this;
  }

  openMyAccount() : void {
    I.click(this.myAccountDropdown);
    I.click(this.myAccountOptin);
  }
}

export = new Header;
