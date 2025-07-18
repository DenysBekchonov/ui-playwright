import LocatorOrString = CodeceptJS.LocatorOrString;
import Page from './pages';
import Data from '../data/itemFactory'

const { I, headerFragment } = inject();

class ProductOrderPage extends Page {

  //products block
  private firstItemFromGrid : LocatorOrString = locate('div[class="column main"] ol li:nth-child(1)').as('First product from ordering');
  private nameFirstItemFromGrid : LocatorOrString = locate('a[class="product-item-link"]:nth-child(1)').as('Item name');
  private priceFirstItemFromGrid : LocatorOrString = locate('span[class="price"]:nth-child(1)').as('Item price');
  private sizeFirstItemFromGrid : LocatorOrString = locate('div[class="swatch-option text"]:nth-child(1)').as('Item size');
  private colorFirstItemFromGrid : LocatorOrString = locate('div[class="swatch-option color"]:nth-child(1)').as('Item color');
  private itemAddToCartButton : LocatorOrString = locate('button[class="action tocart primary"]').as('Add to cart button');
  private categoryTitle : LocatorOrString = locate('span[class="base"]').as('Category titile');

  //cart page
  private cartProductItem : LocatorOrString = locate('tbody[class="cart item"]').as('Cart product items').as('Cart items block');
  private cartProductName : LocatorOrString = locate('tbody[class="cart item"] strong a:nth-child(1)').as('Cart product name');
  private cartSubTotalPrice : LocatorOrString = locate('tr[class="totals sub"] span[class="price"]').as('Cart subtotal price');
  private cartGrandTotalPrice : LocatorOrString = locate('tr[class="grand totals"] span[class="price"]').as('Cart grandtotal price');
  private cartProductSize : LocatorOrString = locate('tbody[class="cart item"] div dd:nth-child(2)').as('Cart product size');
  private cartProductColor : LocatorOrString = locate('tbody[class="cart item"] div dd:nth-child(4)').as('Cart product color');
  private cartProductQuantity : LocatorOrString = locate('div[class="control qty"] input').as('Cart product quantity');
  private cartProceedToCheckoutButton : LocatorOrString = locate('button[data-role="proceed-to-checkout"]').as('Proceed to checkout button');
  private cartSummaryBox : LocatorOrString = locate('div.cart-summary').as('Cart summary box');
  private cartSummaryBoxSubtotal : LocatorOrString = locate('div.cart-totals tr.sub').as('Cart summary subtotal price');

  //shipping page
  private shippingEmail : LocatorOrString = locate('input#customer-email').as('Email Address');
  private shippingFirstName : LocatorOrString = locate('//*[@name="firstname"]').as('First name');
  private shippingLastName : LocatorOrString = locate('//*[@name="lastname"]').as('Last name');
  private shippingCompany : LocatorOrString = locate('//*[@name="company"]').as('Company');
  private shippingStreetAddress1  : LocatorOrString = locate('//*[@name="street[0]"]').as('Street address 1');
  private shippingStreetAddress2  : LocatorOrString = locate('//*[@name="street[1]"]').as('Street address 2');
  private shippingStreetAddress3  : LocatorOrString = locate('//*[@name="street[2]"]').as('Street address 3');
  private shippingCity  : LocatorOrString = locate('//*[@name="city"]').as('City');
  private shippingRegion : LocatorOrString = locate('//*[@name="region_id"]').as('Region');
  private shippingZipCode : LocatorOrString = locate('//*[@name="postcode"]').as('Zip code');
  private shippingCountry : LocatorOrString = locate('//*[@name="country_id"]').as('Country');
  private shippingPhoneNumber : LocatorOrString = locate('//*[@name="telephone"]').as('Phone number');
  private shippingShippingMethod1 : LocatorOrString = locate('//*[@name="ko_unique_1"]').as('Shipping method 1');
  private shippingShippingMethod2 : LocatorOrString = locate('//*[@name="ko_unique_2"]').as('Shipping method 2');
  private shippingNextButton : LocatorOrString = locate('//*[contains(text(),"Next")]').as('Next button');
  private shippingPlaceOrderButton : LocatorOrString = locate('button[title="Place Order"]').as('Place Order');
  private shippingSuccessAlert : LocatorOrString = locate('h1.page-title span.base').as('Success title');
  
  constructor() {
    super('/men.html')
  }
  
  open() : ProductOrderPage {
    super.open();
    I.see('Men', this.categoryTitle);
    return this;
  }
  
  async getProductValue() {
    let name = await I.grabTextFrom(this.nameFirstItemFromGrid);
    let price = await I.grabTextFrom(this.priceFirstItemFromGrid);
    let size = await I.grabTextFrom(this.sizeFirstItemFromGrid);
    //let color = await I.grabCssPropertyFrom(this.colorFirstItemFromGrid,'color');

    return{name,price,size}
  }

  addProductToCart() : void {
    I.scrollTo(this.sizeFirstItemFromGrid);
    I.click(this.sizeFirstItemFromGrid);
    I.click(this.colorFirstItemFromGrid);
    I.click(this.itemAddToCartButton);
  }

  goToCartAfterAdding() : ProductOrderPage {
    headerFragment.goToCartAfterAdding();
    return this;
  }

  checkOrderValue({name,price,size}) : ProductOrderPage {
    I.waitForVisible(this.cartSummaryBoxSubtotal);
    I.see(name.trim(), this.cartProductName);
    I.see(price, this.cartSubTotalPrice);
    I.see(price, this.cartGrandTotalPrice);
    I.see(size, this.cartProductSize);
    return this;
  }

  proceedToCheckout() : ProductOrderPage {
    I.scrollTo(this.cartProceedToCheckoutButton);
    I.click(this.cartProceedToCheckoutButton);
    return this;
  }

  shippingStepProceed(userData : Data) : ProductOrderPage {
    I.waitForVisible(this.shippingFirstName);
    I.fillField(this.shippingEmail, userData.emailRegistration);
    I.fillField(this.shippingFirstName, userData.firstNameRegistration);
    I.fillField(this.shippingLastName, userData.lastNameRegisatrtion);
    I.fillField(this.shippingCompany, userData.companyNameShipping);
    I.fillField(this.shippingStreetAddress1, userData.streetAddressShipping1);
    I.fillField(this.shippingStreetAddress2, userData.streetAddressShipping2);
    I.fillField(this.shippingStreetAddress3, userData.streetAddressShipping3);
    I.fillField(this.shippingCity, userData.cityNameShipping);
    I.selectOption(this.shippingRegion, userData.regionNumberShipping);
    I.fillField(this.shippingZipCode, userData.zipCodeShipping);
    I.selectOption(this.shippingCountry, 'UA');
    I.fillField(this.shippingPhoneNumber, userData.phoneNumber);
    //I.checkOption(this.shippingShippingMethod1);
    I.click(this.shippingNextButton); 
    return this;
  }

  placeOrder() : void {
    I.waitInUrl('/#payment');
    I.waitForVisible(this.shippingPlaceOrderButton)
    I.click(this.shippingPlaceOrderButton);
    I.wait(5)
    I.see('Thank you for your purchase!', this.shippingSuccessAlert);
  }
  // insert your locators and methods here
}

export = new ProductOrderPage;
