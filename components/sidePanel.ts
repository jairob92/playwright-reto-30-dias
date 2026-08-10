import { expect, Locator, Page } from "@playwright/test";

export class SidePanel{

    readonly page:Page

    readonly menuSearch:Locator
    readonly searchTextbox:Locator
    readonly menuOptionli:Locator

    constructor(page:Page){
        this.page=page
        this.menuSearch=page.locator('div.oxd-main-menu-search')
        this.searchTextbox=page.getByRole('textbox',{name:'Search'})
        this.menuOptionli=page.locator('ul.oxd-main-menu li')
    }

    private menuOption(option:sideMenuOption):Locator{
        return this.page.getByRole('link',{name:option})
    }

    async clickOnOption(option:sideMenuOption){
        await this.menuOption(option).click()
    }

    async menuSearchVisible(){
        await expect(this.menuSearch).toBeVisible()
    }

    async searchMenuOption(option:sideMenuOption){
        await expect(this.menuSearch).toBeVisible()
        await this.searchTextbox.fill(option)
        await expect(this.menuOption(option)).toBeVisible()
        expect(await this.menuOptionli.count()).toEqual(1)
    }

    async menuOptionNotVisible(option:sideMenuOption){
        await this.menuOption(option).isHidden()
    }
    
}

export enum sideMenuOption {
    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE= 'Leave',
    TIME = 'Time',
    RECRUITMENT = 'Recruitment',
    MY_INFO = 'My Info',
    PERFORMANCE ='Performance',
    DASHBOARD ='Dashboard',
    DIRECTORY = 'Directory',
    MAINTENANCE='Maintenance',
    CLAIM ='Claim',
    BUZZ='Buzz'
}