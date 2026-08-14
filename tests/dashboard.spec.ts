import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`${viewport.name}: responsive layout and accessibility`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const consoleErrors: string[] = [];
    page.on("console", message => message.type() === "error" && consoleErrors.push(message.text()));
    await page.goto(".");
    await expect(page.getByRole("heading", { name: "Operations overview" })).toBeVisible();
    await expect(page.locator("body")).toHaveJSProperty("scrollWidth", viewport.width);

    if (viewport.width < 1024) {
      const trigger = page.getByRole("button", { name: "Open navigation" });
      await expect(trigger).toBeVisible();
      await trigger.click();
      await expect(page.getByRole("navigation").getByText("Customers")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("navigation").getByText("Customers")).not.toBeVisible();
    } else {
      await expect(page.getByRole("button", { name: "Open navigation" })).not.toBeVisible();
      await expect(page.getByRole("navigation").getByText("Customers")).toBeVisible();
    }

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

test("reporting period control updates its accessible state", async ({ page }) => {
  await page.goto(".");
  const quarter = page.getByRole("button", { name: "Quarter" });
  await quarter.click();
  await expect(quarter).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("region", { name: "Key metrics for Quarter" })).toBeVisible();
});
