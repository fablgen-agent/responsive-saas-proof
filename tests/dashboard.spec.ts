import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 360, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`${viewport.name}: responsive inventory and accessibility`, async ({ page }) => {
    await page.setViewportSize(viewport);
    const consoleErrors: string[] = [];
    page.on("console", message => message.type() === "error" && consoleErrors.push(message.text()));
    await page.goto(".");
    await expect(page.getByRole("heading", { name: "Find the right vehicle" })).toBeVisible();
    await expect(page.locator("body")).toHaveJSProperty("scrollWidth", viewport.width);

    if (viewport.width < 1024) {
      const trigger = page.getByRole("button", { name: "Open navigation" });
      await trigger.click();
      await expect(page.getByRole("navigation").getByText("Inventory")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("navigation").getByText("Inventory")).not.toBeVisible();
    } else {
      await expect(page.getByRole("button", { name: "Open navigation" })).not.toBeVisible();
      await expect(page.getByRole("navigation").getByText("Inventory")).toBeVisible();
    }

    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

test("search and filters expose result and empty states", async ({ page }) => {
  await page.goto(".");
  await page.getByRole("textbox", { name: "Search stock" }).fill("Civic");
  await expect(page.getByRole("heading", { name: "1 vehicle available" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "2023 Honda Civic Sport" })).toBeVisible();
  await page.getByRole("textbox", { name: "Search stock" }).fill("no such vehicle");
  await expect(page.getByRole("heading", { name: "No vehicles match those filters" })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("heading", { name: "6 vehicles available" })).toBeVisible();
});

test("loading and error states provide clear recovery", async ({ page }) => {
  await page.goto(".");
  await page.getByLabel("Demo state").selectOption("loading");
  await expect(page.getByRole("status", { name: "Loading inventory" })).toBeVisible();
  await page.getByLabel("Demo state").selectOption("error");
  await expect(page.getByRole("heading", { name: "Inventory could not be loaded" })).toBeVisible();
  await page.getByRole("button", { name: "Retry inventory" }).click();
  await expect(page.getByRole("heading", { name: "6 vehicles available" })).toBeVisible();
});

test("enquiry validates locally without transmitting data", async ({ page }) => {
  const nonAssetRequests: string[] = [];
  page.on("request", request => { if (!["document", "script", "stylesheet", "font"].includes(request.resourceType())) nonAssetRequests.push(request.url()); });
  await page.goto(".");
  await page.getByRole("button", { name: "Enquire about 2024 Toyota RAV4 Hybrid" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("Demo Buyer");
  await page.getByRole("textbox", { name: "Email" }).fill("demo@example.com");
  await page.getByRole("button", { name: "Validate demo enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Nothing was transmitted or stored");
  expect(nonAssetRequests).toEqual([]);
});

test("admin preview exposes inventory operations", async ({ page }) => {
  await page.goto(".");
  await page.getByRole("button", { name: "Admin preview" }).click();
  await expect(page.getByRole("heading", { name: "Inventory operations" })).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Enquiry queue" })).toBeVisible();
});

test("local favicon is published", async ({ request }) => {
  const response = await request.get("./favicon.svg");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("image/svg+xml");
});

test("crawl metadata points to the canonical deployment", async ({ request }) => {
  const robots = await request.get("./robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(
    "Sitemap: https://fablgen-agent.github.io/responsive-saas-proof/sitemap.xml",
  );

  const sitemap = await request.get("./sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain(
    "<loc>https://fablgen-agent.github.io/responsive-saas-proof/</loc>",
  );
});
