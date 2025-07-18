import LocatorOrString = CodeceptJS.LocatorOrString;
import Page from './pages';
import Data from '../data/itemFactory';

const { I, headerFragment } = inject();

class MainPage extends Page {
  private logo : LocatorOrString = locate('a[class="logo"]').as('Logo');
  private loginInFullName : LocatorOrString = locate('span[class="logged-in"]').as('Login in full name');
  private notLoggedInText : LocatorOrString = locate('span[class="not-logged-in"]').as('Not logged text');
  private productGrid : LocatorOrString = locate('div[class="block-content"] ol').as('Product grid');
  private firstItemFromProductGrid : LocatorOrString = locate('ol li:nth-child(1)').as('First item from product grid');
  private menuWomenCategory : LocatorOrString = locate('//*[contains(text(),"Women")]').as('Women section');
  private menuMenCategory : LocatorOrString = locate('//*[contains(text(),"Men")]').as('Men section');
  private menTopCategory : LocatorOrString = locate('dl[class="options"] li:nth-child(1) a').as('Top category');
  private menBottomCategory : LocatorOrString = locate('dl[class="options"] li:nth-child(2) a').as('Bottom category');
  private successAlertText : LocatorOrString = locate('div[role="alert"] div div').as('Success alert text');
  private menHeader : LocatorOrString = locate('h1.page-title span.base').as('Men header on products list');

  constructor() {
    super('/')
  }

  open(userData?: Data) : MainPage {
    super.open();
    I.seeElement(this.logo);
    //I.see('Click “Write for us” link in the footer to submit a guest post', this.notLoggedInText);
    if (userData) I.see(userData.fullNameLogin, this.loginInFullName);
    return this;
  }

  waitForOpened(userData?: Data) : MainPage {
    I.seeElement(this.logo);
    //I.see('Click “Write for us” link in the footer to submit a guest post', this.notLoggedInText);
    if (userData) I.see(userData.fullNameLogin, this.loginInFullName);
    return this;
  }

  openSignInPage() : void {
    headerFragment.openSignInPage();
  }

  openRegistrationForm() : void {
    headerFragment.openRegistrationForm();
  }

  openMenSection() : MainPage {
    I.click(this.menuMenCategory);
    I.seeInCurrentUrl('/men.html');
    I.seeTextEquals('Men', this.menHeader);
    return this;
  }

  selectCategory(value) : void {
    if (value === '1') {
      I.click(this.menTopCategory);
    } 
    else if (value === '2') {
      I.click(this.menBottomCategory);
      I.seeElementInDOM('div#ad_position_box')
    }
    else {
      /*I.dontSee('Correct value');
      I.closeCurrentTab();*/
    }
  }

  checkcartQuantity(items) : void {
    headerFragment.checkcartQuantity(items);
  }

  async getSuccessMessageText() {
    let successMessageText = await I.grabTextFrom(this.successAlertText);

    return {successMessageText}
  }

  checkSuccessMessageText({successMessageText}) : MainPage {
    I.see(successMessageText.trim(), this.successAlertText)
    return this;
  }

  checkLogin() : MainPage {
    
    return this
  }

}

export = new MainPage;


/*  async getNotLoggedInText() {
    let text = await I.grabTextFrom(this.notLoggedInText);
    return {text}
  }, */
