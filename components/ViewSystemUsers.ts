import { Page,Locator } from "@playwright/test";

export class ViewSystemUsers{
    readonly page:Page
    readonly userRoleLabel:Locator
    readonly searchButton:Locator

    constructor(page:Page){
        this.page=page
        this.userRoleLabel=page.locator("//label[contains(.,'User Role')]//parent::div/following-sibling::div")
        this.searchButton=page.getByRole("button", { name: "Search" })
    }

    async clickOnUserRoleSelect(){
        await this.userRoleLabel.click()
    }

    async selectRole(role:string){
        await this.page.getByRole("listbox").getByRole("option", { name:role}).click()
    }
    async clickOnSearch(){
        this.searchButton.click()
    }

}