import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
    private goToCartBtn: Locator;
    private checkoutBtn: Locator;

    constructor(private page: Page) {
        this.goToCartBtn = page.locator('.counter-number');
        this.checkoutBtn = page.locator('#top-cart-btn-checkout');
    }

    async goToCheckout() {
        await this.goToCartBtn.click();
        await this.checkoutBtn.waitFor();
        await this.checkoutBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
