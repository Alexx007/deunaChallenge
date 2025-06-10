import {Locator, Page ,expect} from '@playwright/test'

export class HomePage {
    private searchInput:Locator;
    private page: Page

    constructor( page: Page) {
        this.page = page
        this.searchInput = this.page.locator('#search');
    }

    async navigate(){
       await this.page.goto('/');
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.page.keyboard.press('Enter');
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.page.locator('#toolbar-amount').first()).toBeVisible();
    }
}
