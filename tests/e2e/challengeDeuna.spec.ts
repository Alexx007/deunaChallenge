import {BasePage} from '../../pages/BasePage'
import { test, expect } from '@playwright/test';

test.describe('Buscar,comprar un producto específico', () => {

    test('Debe permitir buscar y comprar el producto', async ({ page }) => {

        const basePage = new BasePage(page);
        const PRODUCT_NAME = 'Didi Sport Watch';

        await test.step('Navegar y buscar producto', async () => {
            await basePage.navigate();
            await basePage.searchProductByName(PRODUCT_NAME);
            await expect(page.locator(`text=${PRODUCT_NAME}`).first()).toBeVisible();
        });

        await test.step('Seleccionar producto y avanzar al checkout', async () => {
            await basePage.selectProduct(PRODUCT_NAME);
            await basePage.goToCheckout();
            await expect(page).toHaveURL(/.*checkout/);
        });

        await test.step('Llenar dirección de envío', async () => {
            await basePage.fillShippingAddress();
            await expect(page.locator('.shipping-information-content').first()).toBeVisible();
        });

        await test.step('Finalizar compra', async () => {
            await basePage.finishCheckOut();
            await expect(page.locator('.page-title')).toBeVisible();
        });
    });

});

