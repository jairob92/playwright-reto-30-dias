import { Locator, Page } from "@playwright/test";

export class QualificationsMenu {

    private readonly page:Page
    private readonly qualificationOption:Locator

    constructor(page:Page){
        this.page=page
        this.qualificationOption = page.getByRole('navigation', { name: 'Topbar menu' }).getByText('Qualification')
    }

    private async clickOnQualification(){
       await this.qualificationOption.click()
    }

    private menuQualificationOptions(option:QualificationsOption):Locator{
        return this.page.getByRole('menuitem',{name:option})
    }

    async clickOnQualificationOption(option:QualificationsOption){
        await this.clickOnQualification()
        await this.menuQualificationOptions(option).click()
        await this.page.waitForLoadState('networkidle')
    }

}

export enum QualificationsOption {
    SKILLS='Skills',
    EDUCATION='Education',
    LICENSES='Licenses',
    LANGUAGES='Languages',
    MEMBERSHIP='Memberships'
}