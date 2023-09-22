import { test, expect } from "@playwright/test";

test("simple test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  const deleteUser = page.getByText("Delete user");
  if (await deleteUser.isVisible()) {
    await deleteUser.click();
  }
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Test user");
  await page.getByPlaceholder("Name").press("Tab");
  await page.getByPlaceholder("Current account balance").fill("2000");
  await page.getByText("Register information").click();
  await page.getByText("NAME: Test user").click();
  await page.getByText("BALANCE: 2000€").click();
  await page.getByText("Check user").click();
  await page.getByRole("button", { name: "Add Movement" }).click();
  await page.getByPlaceholder("Description").click();
  await page.getByPlaceholder("Description").fill("Movement");
  await page.getByPlaceholder("Amount").click();
  await page.getByPlaceholder("Amount").fill("500");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByRole("button", { name: "Add Expense" }).click();
  await page.getByPlaceholder("Name").click();
  await page.getByPlaceholder("Name").fill("Expenses");
  await page.getByPlaceholder("Description").click();
  await page.getByPlaceholder("Description").fill("expense");
  await page.getByPlaceholder("Amount").click();
  await page.getByPlaceholder("Amount").fill("200");
  await page.getByRole("button", { name: "Add", exact: true }).click();
  await page.getByText("2500€").click();
  await page.getByText("200€").click();
});
