import {Locator, Page, test,expect} from '@playwright/test'
export class CheckoutPage {
    constructor(private page: Page) {}

    async fillShippingAddress(data: {
        email: string;
        firstname: string;
        lastname: string;
        street: string;
        city: string;
        region: string;
        postcode: string;
        country: string;
        telephone: string;
    }) {
        const fillField = async (selector: string, value: string) => {
            const field = this.page.locator(selector);
            await field.first().waitFor();
            await field.first().fill(value);
        };

        await fillField('#customer-email', data.email);
        await fillField('[name="firstname"]', data.firstname);
        await fillField('[name="lastname"]', data.lastname);
        await fillField('[name="street[0]"]', data.street);
        await fillField('[name="city"]', data.city);
        await this.page.locator('[name="region_id"]').selectOption(data.region);
        await fillField('[name="postcode"]', data.postcode);
        await this.page.locator('[name="country_id"]').selectOption(data.country);
        await fillField('[name="telephone"]', data.telephone);

        await this.page.keyboard.press('PageDown');
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForResponse(resp =>
            resp.url().includes('/estimate-shipping-methods') && resp.status() === 200
        );

        await this.page.locator('.button.action.continue.primary').click();
        await this.page.locator('.payment-group').waitFor();
    }

    async finishCheckout() {
        await this.page.locator('.payment-group [title="Place Order"]').click();
        await this.page.locator('.base').waitFor();
    }
}
