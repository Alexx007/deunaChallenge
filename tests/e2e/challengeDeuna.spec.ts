import {BasePage} from '../../pages/BasePage'
import { test, expect } from '@playwright/test';

test.describe('Buscar,comprar un producto específico', () => {

    test('Debe permitir buscar y comprar el producto', async ({ page }) => {

        const basePage = new BasePage(page);
        const PRODUCT_NAME = 'Didi Sport Watch';

        await test.step('Buscar producto', async () => {
            await basePage.navigate();
            await basePage.searchProductByName(PRODUCT_NAME);
            await expect(page.locator(`text=${PRODUCT_NAME}`).first()).toBeVisible();
        });

        await test.step('Seleccionar producto y  checkout', async () => {
            await basePage.selectProduct(PRODUCT_NAME);
            await basePage.goToCheckout();
            await expect(page).toHaveURL(/.*checkout/);
        });

        await test.step('Llenar shipping address', async () => {
            await basePage.fillShippingAddress();
            await expect(page.locator('.shipping-information-content').first()).toBeVisible();
        });

        await test.step('Finalizar compra', async () => {
            await basePage.finishCheckOut();
            await expect(page.locator('.page-title')).toBeVisible();
        });
    });

    test('Mock testing para envio y pago de producto', async ({ page }) => {
        const basePage = new BasePage(page);
        const PRODUCT_NAME = 'Endeavor Daytrip Backpack';
    
        await test.step('Buscar producto y agregarlo al carrito', async () => {
            await basePage.navigate();
            await basePage.searchProductByName(PRODUCT_NAME);
            await expect(page.locator(`text=${PRODUCT_NAME}`).first()).toBeVisible();
    
            const responsePromise = page.waitForResponse(response =>
                response.url().includes('/checkout/cart/add') &&
                response.request().method() === 'POST'
            );
    
            await basePage.selectProduct(PRODUCT_NAME);
    
            const response = await responsePromise;
    
            expect(response.status()).toBe(200); 
    
            const body = await response.json();
            expect(Array.isArray(body)).toBeTruthy();  
            expect(body.length).toBe(0);            
    
            console.log('Respuesta de agregar al carrito:', body);
        });
    });
    

});

