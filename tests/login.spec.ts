import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';

test('Login to HRM', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
});

test('Login to HRM with wrong Credentials',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','123456')

    await expect(page.getByText('Invalid credentials')).toBeVisible()
})
