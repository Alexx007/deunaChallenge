import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Buscar y comprar un producto específico', () => {
  test('Debe permitir buscar y comprar el producto', async ({ page }) => {
    const PRODUCT_NAME = 'Didi Sport Watch';

    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);


    await test.step('Buscar el producto por nombre', async () => {
      await home.navigate();
      await home.searchProduct(PRODUCT_NAME);
      await expect(page.locator(`text=${PRODUCT_NAME}`).first()).toBeVisible();
    });

    await test.step('Seleccionar producto e ir a checkout', async () => {
      await product.selectProduct(PRODUCT_NAME);
      await cart.goToCheckout();
      await expect(page).toHaveURL(/.*checkout/);
    });


    await test.step('Llenar la información de envío', async () => {
      await checkout.fillShippingAddress({
        email: 'alexx07862@gmail.com',
        firstname: 'Nelson',
        lastname: 'Rodriguez',
        street: 'Res Venecia',
        city: 'Tegucigalpa',
        region: 'Arizona',
        postcode: '504',
        country: 'Honduras',
        telephone: '32288505'
      });
      await expect(page.locator('.shipping-information-content').first()).toBeVisible();
    });

    await test.step('Finalizar compra', async () => {
      await checkout.finishCheckout();
      await expect(page.locator('.page-title')).toBeVisible();
    });
  });

  //-------------
  test('Mock testing para envio y pago de producto', async ({ page }) => {
    const PRODUCT_NAME = 'Endeavor Daytrip Backpack';

  
    const home = new HomePage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
  
    await test.step('Buscar el producto por nombre', async () => {
      await home.navigate();
      await home.searchProduct(PRODUCT_NAME);
      await expect(page.locator(`text=${PRODUCT_NAME}`).first()).toBeVisible();
    });
  
    await test.step('Seleccionar producto e ir a checkout', async () => {
      const responsePromise = page.waitForResponse(response =>
        response.url().includes('/checkout/cart/add') &&
        response.request().method() === 'POST'
      );
  
      await product.selectProduct(PRODUCT_NAME);
  
      const response = await responsePromise;
      expect(response.status()).toBe(200);
  
      const body = await response.json();
      console.log('Respuesta al agregar al carrito:', body);
      expect(body).toBeDefined();
  
      await cart.goToCheckout();
      await expect(page).toHaveURL(/.*checkout/);
    });
  
    await test.step('Llenar la información de envío', async () => {
      await checkout.fillShippingAddress({
        email: 'alexx07862@gmail.com',
        firstname: 'Nelson',
        lastname: 'Rodriguez',
        street: 'Res Venecia',
        city: 'Tegucigalpa',
        region: 'Arizona',
        postcode: '504',
        country: 'Honduras',
        telephone: '32288505'
      });
  
      await expect(page.locator('.shipping-information-content').first()).toBeVisible();
    });
  
    await test.step('Finalizar compra', async () => {

      const responsePromise = page.waitForResponse(response =>
        response.url().includes('/rest/default/V1/guest-carts') &&
        response.url().includes('/payment-information') &&
        response.request().method() === 'POST'
      );
  
      await checkout.finishCheckout();
  
      const response = await responsePromise;
      expect(response.status()).toBe(200);
  
    
      await expect(page.locator('.page-title')).toBeVisible();
    });
  });
  
});
