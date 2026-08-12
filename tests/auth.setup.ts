 import {test as setup, expect} from '@playwright/test'
 import { LoginPage } from '../pageobjects/LoginPage'

 setup('Authentication as admin',async({page})=>{

    console.log('Autenticacion iniciada usando el setup')
    //iniciar sesion
    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    //nos aseguraamos que el inicio de sesion es exitoso
    
    await expect(page.getByRole('link',{name:'Admin'})).toBeVisible()
    await page.context().storageState({path:'.auth/admin.json'})

    console.log('Autenticacion completada usando setup')

 })

setup('Authentication as employee',async({page})=>{

    console.log('Autenticacion iniciada usando el setup')
    //iniciar sesion
    const loginPage = new LoginPage(page)
    await loginPage.loginAsEmployee()

    //nos aseguraamos que el inicio de sesion es exitoso
    
    await expect(page.getByRole('link',{name:'Admin'})).toBeHidden()
    await page.context().storageState({path:'.auth/employee.json'})

    console.log('Autenticacion completada usando setup')

 })