import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { sideMenuOption, SidePanel } from '../components/sidePanel';

test('Get all usernames registered',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')
    
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()

    await page.getByRole('link',{name:'Admin'}).click()
    await page.getByRole('navigation',{name:'Topbar menu'}).getByText('User Management').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const rows = page.getByRole('table').getByRole('row')
    const usernames:string[]=[]
    const rowCount = await rows.count()

    for (let i=1; i<rowCount; i++){
        const cell= rows.nth(i).getByRole('cell').nth(1)
        const username=await cell.textContent()

        if(username){
            usernames.push(username)
        }
    }
    console.log(usernames)
})


test('Get all employees name',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')
    
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()

    await page.getByRole('link',{name:'Admin'}).click()
    await page.getByRole('navigation',{name:'Topbar menu'}).getByText('User Management').click()
    await page.getByRole('menuitem',{name:'Users'}).click()

    const rows = page.getByRole('table').getByRole('row')
    const employess:string[]=[]
    const rowCount = await rows.count()

    for (let i=1; i<rowCount; i++){
        const cell= rows.nth(i).getByRole('cell').nth(3)
        const employeName=await cell.textContent()

        if(employeName){
            employess.push(employeName)
        }
    }
    console.log(employess)
})

test('Select specific user for edition',async({page})=>{

    const userForEdition = 'FMLName'

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const pencilToEdit = page
        .getByRole('table')
        .getByRole('row')
        .filter({ hasText: userForEdition })
        .locator('button')
        .filter({ has: page.locator('i.bi-pencil-fill') })


    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input")
        .inputValue()

    expect(currentUsername).toEqual(userForEdition)

    expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
        .toHaveValue(currentUsername)
})


test('Select random user for edition',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const tableCard= page.locator('.oxd-table-card').filter({hasNot:page.getByRole('cell',{name:'Admin'})})
    const totalTableCards=await tableCard.count()
    const randomIndex=Math.floor(Math.random()*totalTableCards)
    const selectedRow=tableCard.nth(randomIndex)

    const username= (await selectedRow.getByRole('cell').nth(1).textContent())?.trim()
    const pencilToEdit= selectedRow.getByRole('cell').nth(5).locator('button').filter({ has: page.locator('i.bi-pencil-fill') })
    await pencilToEdit.click()

    const currentUsername = await page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input")
        .inputValue()

    expect(currentUsername).toEqual(username)
    expect(page.locator("//label[contains(., 'Username')]/parent::div/following-sibling::div/input"))
        .toHaveValue(currentUsername)
})

test('Check User role options',async({page})=>{

    const expectedRoleOptions=[ '-- Select --', 'Admin', 'ESS','EMPLOYE' ]

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(sideMenuOption.ADMIN)

    await page.locator("//label[contains(.,'User Role')]//parent::div/following-sibling::div").click()
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()
    expect(currentUserRoleOptions).toEqual(expectedRoleOptions)

    

})