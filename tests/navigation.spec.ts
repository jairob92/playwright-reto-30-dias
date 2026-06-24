import{expect, test} from '@playwright/test'

test('check left menu options',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'login'}).click()

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