import { Locator, Page } from "@playwright/test";

export class OrganizationsMenu {

    private readonly page:Page
    private readonly organizationOption:Locator

    constructor(page:Page){
        this.page=page
        this.organizationOption = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Organization')
    }

    private async clickOrganization(){
       await this.organizationOption.click()
    }

    private menuOrganizationOptions(option:OrganizationOption):Locator{
        return this.page.getByRole('menuitem',{name:option})
    }

    async clickOnOrganizationOption(option:OrganizationOption){
        await this.clickOrganization()
        await this.menuOrganizationOptions(option).click()
    }

}

export enum OrganizationOption {
    GENERAL_INFORMATION='General Information',
    LOCATIONS='Locations',
    STRUCTURE='Structure'
}

