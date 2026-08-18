import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageobjects/LoginPage";
import { sideMenuOption, SidePanel } from "../components/sidePanel";
import { TopBarMenu } from "../components/top-bar-menu/TopBarMenu";
import { AddNewUserPage } from "../pageobjects/AddNewUserPage";
import { Navigate } from "../pageobjects/Navigate";
import { UserModel, userModel } from "../models/UserModel";
import { UserFactory } from "../factory/UserFactory";
import { UsersTable } from "../components/UserTable";
import { ViewSystemUsers } from "../components/ViewSystemUsers";

test("Get all usernames registered", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();
  await page
    .getByRole("navigation", { name: "Topbar menu" })
    .getByText("User Management")
    .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const rows = page.getByRole("table").getByRole("row");
  const usernames: string[] = [];
  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) {
    const cell = rows.nth(i).getByRole("cell").nth(1);
    const username = await cell.textContent();

    if (username) {
      usernames.push(username);
    }
  }
  console.log(usernames);
});

test("Get all employees name", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();
  await page
    .getByRole("navigation", { name: "Topbar menu" })
    .getByText("User Management")
    .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const rows = page.getByRole("table").getByRole("row");
  const employess: string[] = [];
  const rowCount = await rows.count();

  for (let i = 1; i < rowCount; i++) {
    const cell = rows.nth(i).getByRole("cell").nth(3);
    const employeName = await cell.textContent();

    if (employeName) {
      employess.push(employeName);
    }
  }
  console.log(employess);
});

test("Select specific user for edition", async ({ page }) => {
  const userForEdition = "FMLName";

  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();

  await page
    .getByRole("navigation", { name: "Topbar menu" })
    .getByText("User Management")
    .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const pencilToEdit = page
    .getByRole("table")
    .getByRole("row")
    .filter({ hasText: userForEdition })
    .locator("button")
    .filter({ has: page.locator("i.bi-pencil-fill") });

  await pencilToEdit.click();

  const currentUsername = await page
    .locator(
      "//label[contains(., 'Username')]/parent::div/following-sibling::div/input",
    )
    .inputValue();

  expect(currentUsername).toEqual(userForEdition);

  expect(
    page.locator(
      "//label[contains(., 'Username')]/parent::div/following-sibling::div/input",
    ),
  ).toHaveValue(currentUsername);
});

test("Select random user for edition", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.doLogin("Admin", "admin123");

  await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

  await page.getByRole("link", { name: "Admin" }).click();

  await page
    .getByRole("navigation", { name: "Topbar menu" })
    .getByText("User Management")
    .click();
  await page.getByRole("menuitem", { name: "Users" }).click();

  const tableCard = page
    .locator(".oxd-table-card")
    .filter({ hasNot: page.getByRole("cell", { name: "Admin" }) });
  const totalTableCards = await tableCard.count();
  const randomIndex = Math.floor(Math.random() * totalTableCards);
  const selectedRow = tableCard.nth(randomIndex);

  const username = (
    await selectedRow.getByRole("cell").nth(1).textContent()
  )?.trim();
  const pencilToEdit = selectedRow
    .getByRole("cell")
    .nth(5)
    .locator("button")
    .filter({ has: page.locator("i.bi-pencil-fill") });
  await pencilToEdit.click();

  const currentUsername = await page
    .locator(
      "//label[contains(., 'Username')]/parent::div/following-sibling::div/input",
    )
    .inputValue();

  expect(currentUsername).toEqual(username);
  expect(
    page.locator(
      "//label[contains(., 'Username')]/parent::div/following-sibling::div/input",
    ),
  ).toHaveValue(currentUsername);
});

test("Check User role options", async ({ page }) => {
  const expectedRoleOptions = ["-- Select --", "Admin", "ESS"];

  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();

  const sidePanel = new SidePanel(page);
  await sidePanel.clickOnOption(sideMenuOption.ADMIN);

  await page
    .locator(
      "//label[contains(.,'User Role')]//parent::div/following-sibling::div",
    )
    .click();
  const currentUserRoleOptions = await page
    .getByRole("listbox")
    .getByRole("option")
    .allInnerTexts();
  expect(currentUserRoleOptions).toEqual(expectedRoleOptions);
});

test("Check status role options", async ({ page }) => {
  const expectedStatusOptions = ["-- Select --", "Enabled", "Disabled"];

  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();

  const sidePanel = new SidePanel(page);
  await sidePanel.clickOnOption(sideMenuOption.ADMIN);

  await page
    .locator(
      "//label[contains(.,'Status')]//parent::div/following-sibling::div",
    )
    .click();
  const currentStatusOptions = await page
    .getByRole("listbox")
    .getByRole("option")
    .allInnerTexts();
  console.log(currentStatusOptions);
  expect(currentStatusOptions).toEqual(expectedStatusOptions);
});

test("Filter by user admin", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.loginAsAdmin();

  const sidePanel = new SidePanel(page);
  await sidePanel.clickOnOption(sideMenuOption.ADMIN);

  const viewSystemUsers= new ViewSystemUsers(page)

  const usersTable = new UsersTable(page)

  const expectedAdminCount = await usersTable.getTotalAdminsRegistered();

  console.log("Admin users before filtering: ", expectedAdminCount);

  await viewSystemUsers.clickOnUserRoleSelect()
  await viewSystemUsers.selectRole('Admin')
  await viewSystemUsers.clickOnSearch()

  //La tabla filtrada deberia tener exactamente la misma cantidad de encontramos
  await expect(usersTable.getAllbodyRows()).toHaveCount(expectedAdminCount);

  for (let i = 0; i < expectedAdminCount; i++) {
    await expect(usersTable.getAllbodyRows().nth(i).getByRole("cell").nth(2)).toContainText(
      "Admin",
    );
  }
});

test("capture all amounts", async ({ page }) => {
  await page.goto("/web/index.php/claim/viewAssignClaim");
  const allbodyRows = page
    .getByRole("table")
    .getByRole("rowgroup")
    .nth(1)
    .getByRole("row");
  const amounts: number[] = [];

  const rowCount = await allbodyRows.count();
  console.log("filas totales", rowCount);

  for (let i = 0; i < rowCount; i++) {
    const amountCell = allbodyRows.nth(i).getByRole("cell").nth(7);
    const amounText = await amountCell.textContent();
    console.log("Monto total el texto", amounText);

    if (amounText === null) {
      continue;
    }
    const convertedNumber = parseFloat(amounText?.replace(/,/g, "").trim());
    amounts.push(convertedNumber);
  }
  console.log(amounts);

  let total = 0;

  for (let amount of amounts) {
    total += amount;
  }
  const promedio: number = amounts.length > 0 ? total / amounts.length : 0;
  const valorMaximo = Math.max(...amounts);
  console.log("promedio", promedio);
  console.log("valor maximo", valorMaximo);
});

test("Add new user using diferent passwords", async ({ page }) => {
  // const randomUsername = 'goku'+crypto.randomUUID()
  // const password = 'R4mdom45..'
  // const employeeToSearch='Qwerty LName'

  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clickOnOption(sideMenuOption.ADMIN);

  const topBarMenu = new TopBarMenu(page);
  await topBarMenu.userManagement.clickOnUsers();


  /*const userToAdd:UserModel= {
        username:randomUsername,
        employee:employeeToSearch,
        password:password,
        confirmPassword:'password',
        role:'ESS',
        status:'Enabled'
    }*/

  const adminUser = UserFactory.createAdmin({
    employee: "FirstNameTest A LastNameTest",
  });

  const addNewUserPage = new AddNewUserPage(page);
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasntAddedMessage();
});

test("Add new user admin", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toDashboard();

  const sidePanel = new SidePanel(page);
  await sidePanel.clickOnOption(sideMenuOption.ADMIN);

  const topBarMenu = new TopBarMenu(page);
  await topBarMenu.userManagement.clickOnUsers();

  const usersTable = new UsersTable(page)

  const addNewUserPage = new AddNewUserPage(page);

  await usersTable.editFirstAdminOnTable()

  const fullUserToSearch= await addNewUserPage.getEmployeeName()

  const adminUser = UserFactory.createAdmin({
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();
});

test("Add new user employee", async ({ page }) => {
  const navigate = new Navigate(page);
  await navigate.toUsers()

  const addNewUserPage = new AddNewUserPage(page);

  const usersTable = new UsersTable(page)

  await usersTable.editFirstEmployeeOnTable()

  const fullUserToSearch= await addNewUserPage.getEmployeeName()

  const employeeUser = UserFactory.createEmployeeESS({
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(employeeUser);
  await addNewUserPage.checkUserWasAddedMessage();

});

test('Delete user admin',async({page})=>{

  //Arrange
  const navigate = new Navigate(page);
  await navigate.toUsers()

  const addNewUserPage = new AddNewUserPage(page);

  const usersTable = new UsersTable(page)

  await usersTable.editFirstEmployeeOnTable()

  const fullUserToSearch= await addNewUserPage.getEmployeeName()

  const adminUser = UserFactory.createAdmin({
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();

  //Act
  await usersTable.clickOnDeleteActionByUsername(adminUser.username)
  await usersTable.acceptDeleteUser()
  await usersTable.checkUserDeleted(adminUser.username)

  //Assert
  await addNewUserPage.checkUserWasDeletedMessage()

})


test('Cancel delete action on user admin',async({page})=>{

  //Arrange
  const navigate = new Navigate(page);
  await navigate.toUsers()

  const addNewUserPage = new AddNewUserPage(page);

  const usersTable = new UsersTable(page)

  await usersTable.editFirstEmployeeOnTable()

  const fullUserToSearch= await addNewUserPage.getEmployeeName()

  const adminUser = UserFactory.createAdmin({
    employee: fullUserToSearch,
  });

  await page.goBack();
  await addNewUserPage.addNewUser(adminUser);
  await addNewUserPage.checkUserWasAddedMessage();

  //Act
  await usersTable.clickOnDeleteActionByUsername(adminUser.username)
  await usersTable.cancelDeleteUser()
  
  //Assert
 await usersTable.checkUserAvailable(adminUser.username)

})
