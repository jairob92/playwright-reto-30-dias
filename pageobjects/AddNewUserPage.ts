import { Locator, Page, expect } from "@playwright/test";
import { userModel } from "../models/userModel";

export class AddNewUserPage {
  private readonly page: Page;
  private readonly addButton: Locator;
  private readonly userRoleSelect: Locator;
  private readonly employeeNameSelect: Locator;
  private readonly statusSelect: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly confirmPasswordInput: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByText("Add");
    this.userRoleSelect = page
      .locator("div.oxd-grid-item--gutters")
      .filter({ has: this.page.getByText("User Role") })
      .locator("div.oxd-select-text-input");
    this.employeeNameSelect=page
      .getByRole("textbox", { name: "Type for hints..." })
    this.statusSelect=page
      .locator("div.oxd-grid-item--gutters")
      .filter({ has: this.page.getByText("Status") })
      .locator("div.oxd-select-text-input")
    this.usernameInput=page
      .locator("div.oxd-grid-item--gutters")
      .filter({ has: this.page.getByText("Username") })
      .getByRole("textbox")
    this.passwordInput=page
      .locator("div.oxd-grid-item--gutters")
      .filter({ has: this.page.getByText("Password", { exact: true }) })
      .getByRole("textbox")
    this.confirmPasswordInput=page
      .locator("div.oxd-grid-item--gutters")
      .filter({ has: this.page.getByText("Confirm Password", { exact: true }) })
      .getByRole("textbox")
    this.saveButton=page.getByRole("button", { name: "Save" })
    
  }

  async clickOnAdd() {
    await this.addButton.click();
  }

  async selectUserRole(userRole: string) {
    await this.userRoleSelect.click();
    await this.page.getByText(userRole, { exact: true }).click();
  }

  async selectEmployeeName(employeeName: string) {
    await this.employeeNameSelect.fill(employeeName);
    await this.page.getByText("Qwerty Qwerty LName").click();
  }

  async selectStatus(status: string) {
    await this.statusSelect.click();
    await this.page.getByText(status).click();
  }

  async enterUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async enterConfirmPassword(password: string) {
    await this.confirmPasswordInput.fill(password);
  }

  async clickOnSave() {
    await this.saveButton.click();
  }

  async checkUserWasAddedMessage() {
    await expect(
      this.page.locator("span.oxd-input-field-error-message"),
    ).toHaveText("Passwords do not match");
  }

  async addNewUser(user:userModel){
    await this.clickOnAdd()
    await this.selectUserRole(user.role)
    await this.selectEmployeeName(user.employee)
    await this.selectStatus(user.status)
    await this.enterUsername(user.username)
    await this.enterPassword(user.password)
    await this.enterConfirmPassword(user.confirmPassword)
    await this.clickOnSave()
  }
}
