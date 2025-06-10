import {Locator, Page, test,expect} from '@playwright/test'

export class BasePage{
        private page: Page;
        private searchProduct: Locator;
        private goToCart: Locator;
        private itemsMatchProduct: Locator;
        private addToCartBtn : Locator;
        private slideCartBtn: Locator;
        quantity : Locator;
        proceedCheckout :Locator;
        Email:Locator;
        constructor(page:Page){
            this.page = page;
            this.searchProduct = this.page.locator('#search');
            this.goToCart = this.page.locator('.counter-number');
            this.itemsMatchProduct = this.page.locator('.product-item-name');
            this.addToCartBtn = this.page.locator('#product-addtocart-button');
            
            this.slideCartBtn = this.page.locator('#bundle-slide');
            this.quantity = this.page.locator('#qty')
        }

        async searchProductByName(productName:string){
            await this.searchProduct.fill(productName);
            await this.page.keyboard.press('Enter');
            await this.page. waitForLoadState('domcontentloaded');
            await expect(this.page.locator('#toolbar-amount').first()).toBeVisible();
        }

        async navigate(){
            await this.page.goto('/');
        }

        async selectProduct(productName:string){
            const openProduct = this.itemsMatchProduct.filter({hasText:productName});
            await openProduct.click();
            await this.page.locator('[data-ui-id="page-title-wrapper"]').waitFor()
            //await this.slideCartBtn.click();
            await this.addToCartBtn.waitFor()
            await this.addToCartBtn.click();
        }

        async goToCheckout(){
            await this.goToCart.click()
             this.proceedCheckout = await this.page.locator('#top-cart-btn-checkout');
            await this.proceedCheckout.waitFor();
            await this.proceedCheckout.click();
            await this.page.locator('[data-role="title"]').first().waitFor()
        }

        async fillShippingAddress(){
             this.Email =  this.page.locator('[type="email"]')
             await this.Email.fill('Alexx07862@gmail.com');
             await this.page.locator('[name="firstname"]').fill('Nelson');
             await this.page.locator('[name="lastname"]').fill('Rodriguez');
             await this.page.locator('[name="street[0]"]').fill('Res Venecia');
             await this.page.locator('[name="city"]').fill('Tegucigalpa');
             await this.page.locator('[name="region_id"]').selectOption('Arizona');
             await this.page.locator('[name="postcode"]').fill('504')

        }
}