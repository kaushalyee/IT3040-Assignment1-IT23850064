// tests/translator.spec.js
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

// Since your testData.js is inside /tests, this path is correct:
const cases = require("./testData");

const RESULTS_DIR = path.join(__dirname, "..", "results");
const RESULTS_FILE = path.join(RESULTS_DIR, "results.tsv");

// ✅ Sinhala output DIV selector you provided
const OUTPUT_SELECTOR =
  "#root > div > div > div.grid.grid-cols-12.gap-4.px-2.md\\:px-4 > div.col-span-12.md\\:col-span-9.transition-all.duration-300 > div > div:nth-child(1) > div > div.flex.flex-col.md\\:flex-row.gap-4.items-stretch > div:nth-child(3) > div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap.overflow-y-auto.flex-grow.bg-slate-50";

function normalizeText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

test.setTimeout(420000); // enough time for 34+ cases

test("SwiftTranslator - run all scenarios and capture Sinhala output", async ({ page }) => {
  // Ensure results folder exists
  fs.mkdirSync(RESULTS_DIR, { recursive: true });

  // Reset results file each run (TSV opens nicely in Excel)
  fs.writeFileSync(
    RESULTS_FILE,
    "TC_ID\tType\tInput\tActualOutput\tRunStatus\tScreenshot\n"
  );

  await page.goto("https://www.swifttranslator.com/", {
    timeout: 90000,
    waitUntil: "domcontentloaded",
  });

  // Input: first textarea on the page
  const inputBox = page.locator("textarea").first();

  // Output: the Sinhala output DIV (your selector)
  const outputBox = page.locator(OUTPUT_SELECTOR);

  // Sanity checks
  await expect(inputBox).toHaveCount(1);
  await expect(outputBox).toHaveCount(1);

  for (const tc of cases) {
    const tcId = tc.id || "UNKNOWN_ID";
    const tcType = tc.type || "unknown";
    const tcInput = String(tc.input ?? "");
    const safeInput = normalizeText(tcInput);

    const screenshotName = `${tcId}.png`;
    const screenshotPath = path.join(RESULTS_DIR, screenshotName);

    try {
      // Baseline output before typing
      const beforeOut = normalizeText(await outputBox.textContent());

      // Clear and type input
      await inputBox.fill("");
      if (safeInput.length > 0) {
        await inputBox.type(tcInput, { delay: 25 });
      }

      // Wait for output to change from baseline OR become non-empty
      // (Sometimes baseline might be empty or already something)
      await expect
        .poll(
          async () => normalizeText(await outputBox.textContent()),
          { timeout: 25000 }
        )
        .not.toBe(beforeOut);

      const actualOut = normalizeText(await outputBox.textContent());

      // Screenshot evidence
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Run status (this is just automation run status, not "pass/fail vs expected")
      const runStatus = safeInput.length === 0 ? "REVIEW_EMPTY_INPUT" : "OK";

      // Write row to results file
      fs.appendFileSync(
        RESULTS_FILE,
        `${tcId}\t${tcType}\t${safeInput}\t${actualOut}\t${runStatus}\t${screenshotName}\n`
      );

      console.log(`✅ ${tcId} completed`);
    } catch (err) {
      // Error screenshot
      const errShotName = `${tcId}_ERROR.png`;
      const errShotPath = path.join(RESULTS_DIR, errShotName);
      await page.screenshot({ path: errShotPath, fullPage: true }).catch(() => {});

      fs.appendFileSync(
        RESULTS_FILE,
        `${tcId}\t${tcType}\t${safeInput}\t\tFAILED\t${errShotName}\n`
      );

      console.log(`❌ ${tcId} failed`);
    }

    // Prevent carry-over between test cases
    await inputBox.fill("");
    await page.waitForTimeout(400);
  }
});
