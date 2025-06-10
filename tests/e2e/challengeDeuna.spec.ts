import {BasePage} from '../../pages/BasePage'
import { test, expect } from '@playwright/test';

test.describe('Pruebas DEUNA', async() =>{
    

    test('buscar producto',async({page}) =>{
        const basePage = new BasePage(page);
        await basePage.navigate();
        await basePage.searchProductByName('Didi Sport Watch');
       
        await test.step('seleccionar producto', async() =>{
            await basePage.selectProduct('Didi Sport Watch');
            await basePage.goToCheckout();
            await basePage.fillShippingAddress();
            await page.pause()
        });
    });

});
