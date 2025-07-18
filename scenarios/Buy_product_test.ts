import Data from '../data/itemFactory'

Feature('But product');

Before(({I, mainPage}) => {
    mainPage.open()
});

Scenario('User buys product', async ({ I, mainPage, productOrderPage}) => {
    let userData = new Data();

    mainPage.openMenSection().selectCategory('3');
    let {name,price,size} = await productOrderPage.getProductValue();

    productOrderPage.addProductToCart();

    let {successMessageText} = await mainPage.getSuccessMessageText();
    mainPage.checkSuccessMessageText({successMessageText}).checkcartQuantity('1');

    productOrderPage.goToCartAfterAdding().checkOrderValue({name,price,size}).proceedToCheckout().
    shippingStepProceed(userData).placeOrder();
}).tag('buy').tag('1')