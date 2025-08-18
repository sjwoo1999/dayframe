import { test, expect } from '@playwright/test';

async function runAxe(page: import('@playwright/test').Page) {
  // Inject axe-core from CDN
  await page.addScriptTag({ url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js' });
  const results = await page.evaluate(async () => {
    // @ts-expect-error axe is injected
    const r = await (window as any).axe.run({
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    });
    return { violations: r.violations.map((v: any) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })) };
  });
  return results as { violations: { id: string; impact: string; nodes: number }[] };
}

test.describe('Accessibility smoke', () => {
  const paths = ['/today', '/capture', '/share/123'];
  for (const p of paths) {
    test(`axe: ${p}`, async ({ page }) => {
      await page.goto(p);
      await page.waitForLoadState('networkidle');
      const { violations } = await runAxe(page);
      // Fail on serious/critical
      const blockers = violations.filter(v => v.impact === 'serious' || v.impact === 'critical');
      if (blockers.length) {
        console.log('A11y violations:', blockers);
      }
      expect(blockers, `Serious/critical a11y violations on ${p}`).toHaveLength(0);
    });
  }
});
