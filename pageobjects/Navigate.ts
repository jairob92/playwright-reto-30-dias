import { Page } from "@playwright/test";
import { sideMenuOption, SidePanel } from "../components/sidePanel";
import { TopBarMenu } from "../components/top-bar-menu/TopBarMenu";

export class Navigate {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async toDashboard() {
    await this.page.goto("/web/index.php/dashboard/index");
  }

  async toUsers() {
    await this.toDashboard()

    const sidePanel = new SidePanel(this.page);
    await sidePanel.clickOnOption(sideMenuOption.ADMIN);

    const topBarMenu = new TopBarMenu(this.page);
    await topBarMenu.userManagement.clickOnUsers();
  }
}