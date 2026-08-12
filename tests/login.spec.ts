import { expect, test } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { sideMenuOption, SidePanel } from '../components/sidePanel';

test('Login to HRM 1', async ({ page }) => {

    //const loginPage = new LoginPage(page)
    //await loginPage.loginAsAdmin()

    await page.goto('/web/index.php/dashboard/index')
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(sideMenuOption.ADMIN)
    await sidePanel.clickOnOption(sideMenuOption.BUZZ)
    await sidePanel.clickOnOption(sideMenuOption.DASHBOARD)
});

test('Login to HRM with wrong Credentials',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','123456')
    await expect(page.getByText('Invalid credentials')).toBeVisible()
})

test('Login to HRM as employee',async({page})=>{
    //const loginPage = new LoginPage(page)
    //await loginPage.loginAsEmployee()
    await page.goto('/web/index.php/dashboard/index')
    const sidePanel = new SidePanel(page)
    await sidePanel.menuOptionNotVisible(sideMenuOption.ADMIN)
})
