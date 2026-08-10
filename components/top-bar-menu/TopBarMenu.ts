import { Page } from "@playwright/test";
import { UserManagementMenu } from "./UserManagementMenu";
import { JobMenu } from "./JobMenu";
import { OrganizationsMenu } from "./OrganizationsMenu";
import { QualificationsMenu } from "./Qualifications";

export class TopBarMenu{

    readonly page:Page
    readonly userManagement: UserManagementMenu
    readonly job: JobMenu
    readonly organization:OrganizationsMenu
    readonly qualifications:QualificationsMenu

    constructor(page:Page){
        this.page=page
        this.userManagement = new UserManagementMenu(page)
        this.job= new JobMenu(page)
        this.organization= new OrganizationsMenu(page)
        this.qualifications= new QualificationsMenu(page)
    }
}