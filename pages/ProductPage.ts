import {Page } from '@playwright/test'

export class ProductPage {
    constructor(private page: Page) {}

    private get productList() {
        return this.page.locator('.product-item-name');
    }

    async selectProduct(productName: string) {
        const openProduct = this.productList.filter({ hasText: productName });
        await openProduct.click();
        await this.page.locator('[data-ui-id="page-title-wrapper"]').waitFor();
        await this.page.locator('#product-addtocart-button').click();
        await this.page.locator('.message-success').waitFor();
        await this.page.waitForLoadState('networkidle');
    }
}

