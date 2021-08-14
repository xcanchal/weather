const defaultLanguage = 'en';

export default class Language {
  constructor() {
  }

  private static getBrowserLanguage(): string {
    try {
      const { locale } = new Intl.DateTimeFormat().resolvedOptions();
      const [language] = locale.split('-');
      return language;
    } catch (err) {
      return navigator.language;
    }
  }

  private static getUrlLanguage(): string | null {
    let urlLang = null;
    const result = new RegExp('[?&]lang=([^&#]*)').exec(window.location.href);
    if (result) {
      [, urlLang] = result;
    }
    return urlLang;
  }

  public static determineLanguage(providedLanguage?: string): string {
    let language = defaultLanguage;

    const browserLanguage = Language.getBrowserLanguage();
    if (browserLanguage) {
      language = browserLanguage;
    }

    if (providedLanguage) {
      language = providedLanguage;
    }

    const urlLanguage = Language.getUrlLanguage();
    if (urlLanguage) {
      language = urlLanguage;
    }

    return language;
  }
}