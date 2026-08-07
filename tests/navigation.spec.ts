import{expect, test} from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('check left menu options',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    const leftMenuItem=page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount= await leftMenuItem.count()
    console.log('Current menu items count', currentMenuItemsCount)

    const currentMenuItems:string[]=[]

    for(let i=0; i<currentMenuItemsCount; i++){
        
        const menuText= await leftMenuItem.nth(i).innerText()
        currentMenuItems.push(menuText)
    }
    console.log(currentMenuItems)

    const expectedItemsMenu=[
    'Admin',       'PIM',
    'Leave',       'Time',
    'Recruitment', 'My Info',
    'Performance', 'Dashboard',
    'Directory',   'Maintenance',
    'Claim',       'Buzz'
    ]
    expect(currentMenuItems).toEqual(expectedItemsMenu)
    expect(currentMenuItems[0]).toEqual('Admin')
})

test('Navigate throught left panel',async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    const leftMenuItem=page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount= await leftMenuItem.count()
    console.log('Current menu items count', currentMenuItemsCount)

    for(let i=0; i<currentMenuItemsCount; i++){
        
        const menuItem=  leftMenuItem.nth(i)
        const menuText= await menuItem.innerText()
        await menuItem.click({timeout:5000})
        if(menuText=='Maintenance'){
            await expect(page).toHaveURL(/maintenance\/purgeEmployee/)
            await page.goBack()
            await expect(page.getByLabel('Sidepanel')).toBeVisible();
        }
    }
})

test('check all the qualification links',async({page})=>{

    const expectedPages=[
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        },
        {
            menu: 'Languages',
            url: '/web/index.php/admin/viewLanguages'
        },
        {
            menu: 'Memberships',
            url: '/web/index.php/admin/membership'
        }
    ]

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')
    
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    await page.getByRole('link',{name:'Admin'}).click()
    await page.getByRole('navigation',{name:'Topbar menu'}).getByText('Qualifications').click()

    const qualificationOptions= page.getByRole('menu').locator('li')

    for(let expectedPage of expectedPages){
        const menuOption=qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation',{name:'Topbar menu'}).getByText('Qualifications').click()
    }
})

test('check all the Organization links',async({page})=>{

    const expectedPages=[
        {
            menu: 'General Information',
            url: '/web/index.php/admin/viewOrganizationGeneralInformation'
        },
        {
            menu: 'Locations',
            url: '/web/index.php/admin/viewLocations'
        },
        {
            menu: 'Structure',
            url: '/web/index.php/admin/viewCompanyStructure'
        }
    ]

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')
    
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    await page.getByRole('link',{name:'Admin'}).click()
    await page.getByRole('navigation',{name:'Topbar menu'}).getByText('Organization').click()

    const qualificationOptions= page.getByRole('menu').locator('li')

    for(let expectedPage of expectedPages){
        const menuOption=qualificationOptions.filter({hasText: expectedPage.menu})
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation',{name:'Topbar menu'}).getByText('Organization').click()
    }
})