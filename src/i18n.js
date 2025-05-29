import { i18n } from "@lingui/core";

export const locales = {
  vi: "Vietnamese",
  en: "English",
};
export const defaultLocale = "vi";

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale) {
  const { messages } = await import(`./locales/${locale}/messages.po`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
