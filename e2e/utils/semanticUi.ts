export const dropdownSelect = async (selector: string, value: string) => {
  (await $(selector)).click();

  await browser.waitUntil(async () => {
    const s = await $(selector);

    if (!s) {
      return false;
    }

    const expanded = await s.getAttribute('aria-expanded');

    return expanded === 'true';
  });

  const expandedOptions = await $(selector);
  const opts = await expandedOptions.$$('div[role=option]');

  let targetEl;

  for (const opt of opts) {
    const childSpan = await opt.$('span');
    const optionValue = await childSpan.getText();

    if (optionValue === value) {
      targetEl = opt;
    }
  }

  if (!targetEl) {
    throw new Error(`Didn't find dropdown option: ${value}`);
  }

  await targetEl.click();

  await browser.waitUntil(async () => {
    const s = await $(selector);

    if (!s) {
      return false;
    }

    const expanded = await s.getAttribute('aria-expanded');

    return expanded === 'false';
  });
};
