import { Locator, Page, expect } from "@playwright/test";

export class UsersTable{

    readonly page:Page

    constructor(page:Page){
        this.page=page
    }

    getAllbodyRows(): Locator {
      return this.page.getByRole("table").getByRole("rowgroup").nth(1).getByRole("row");
    }

    getAdminRows():Locator{
        const allbodyRows = this.getAllbodyRows()
        const currentAdminRoles = allbodyRows.filter({has: this.page.getByRole("cell").nth(2).getByText("Admin")})
        return currentAdminRoles
    }

    private getEmployeeRows():Locator{
        const allbodyRows = this.getAllbodyRows()
        const currentAdminRoles = allbodyRows.filter({has: this.page.getByRole("cell").nth(2).getByText("ESS")})
        return currentAdminRoles
    }

    async getTotalAdminsRegistered():Promise<number>{
        const currentAdminRows=this.getAdminRows()
        return await currentAdminRows.count()
    }

    private async getFirstAdminFromTable():Promise<Locator>{
        const currentAdminRows=this.getAdminRows()
        const firstAdminToSearch = currentAdminRows.first();
        await expect(firstAdminToSearch,"no admin users found in the table",).toHaveCount(1);
        return firstAdminToSearch
    }

    private async getFirstEmployeeFromTable():Promise<Locator>{
        const currentEmployeeRows=this.getEmployeeRows()
        const firstEmployeeToSearch = currentEmployeeRows.first();
        await expect(firstEmployeeToSearch,"no empoyee users found in the table",).toHaveCount(1);
        return firstEmployeeToSearch
    }

    async editFirstAdminOnTable(){
        const firstAdminToEdit=await this.getFirstAdminFromTable()
        await firstAdminToEdit.locator("button").filter({ has: this.page.locator("i.bi-pencil-fill") }).click();
    }

    async editFirstEmployeeOnTable(){
        const firstEmployeeToEdit=await this.getFirstEmployeeFromTable()
        await firstEmployeeToEdit.locator("button").filter({ has: this.page.locator("i.bi-pencil-fill") }).click();
    }

    async clickOnDeleteActionByUsername(username:string){
        const allbodyRows= this.getAllbodyRows()
        const filteredRowsByUsername=allbodyRows.filter({has: this.page.getByRole('cell').nth(1).getByText(username)})
        await expect(filteredRowsByUsername,`No rows contain username: ${username} were found`).toHaveCount(1)
        await filteredRowsByUsername.locator('button').filter({has: this.page.locator('i.bi-trash')}).click()

    }
    async acceptDeleteUser(){
        await this.page.getByRole('button',{name:/Yes, Delete/}).click()
    }

    async cancelDeleteUser(){
        await this.page.getByRole('button',{name:'No, Cancel'}).click()
    }

    async checkUserDeleted(username:string){
        const allbodyRows= this.getAllbodyRows()
        const filteredRowsByUsername=allbodyRows.filter({hasNot: this.page.getByRole('cell').nth(1).getByText(username)})
        await expect(filteredRowsByUsername,`No rows contain username: ${username} were found`).toHaveCount(0)
    }
    async checkUserAvailable(username:string){
        const allbodyRows= this.getAllbodyRows()
        const filteredRowsByUsername=allbodyRows.filter({has: this.page.getByRole('cell').nth(1).getByText(username)})
        await expect(filteredRowsByUsername,`No rows contain username: ${username} were found`).toHaveCount(1)
    }
}
