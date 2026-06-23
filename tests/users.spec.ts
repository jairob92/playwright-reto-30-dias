import {test, expect} from '@playwright/test';

test('Get all usernames registered',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'login'}).click()
    
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

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await page.getByRole('textbox',{name:'Username'}).fill('Admin')
    await page.getByRole('textbox',{name:'Password'}).fill('admin123')
    await page.getByRole('button',{name:'login'}).click()
    
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