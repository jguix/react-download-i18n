/**
 * @class DownloadI18nService
 */
import { DownloadLocaleQuery, PhraseappService } from './lib/phraseapp.service';

export type I18nAPI = "phraseapp" | "custom";

export type LocaleDetail = {
  id: string;
  name: string;
  code: string;
  created_at: string; // datetime format 2019-03-07T23:58:31Z
  updated_at: string; // datetime format 2019-03-07T23:58:31Z
};

export default class DownloadI18nService {
  private static i18nAPI: I18nAPI;
  private static token: string;

  public static init(i18nApi: I18nAPI, token: string): void {
    this.i18nAPI = i18nApi;
    this.token = token;
  }

  public static async listLocales(project_id: string): Promise<LocaleDetail[]> {
    if (this.i18nAPI === "phraseapp") {
      return (await PhraseappService.listLocales(this.token, {
        project_id
      })).map(localeDetail => {
        const { id, name, code, created_at, updated_at } = localeDetail;
        return { id, name, code, created_at, updated_at };
      });
    }
    return Promise.resolve([]);
  }

  public static async getLocale(
    project_id: string,
    locale_id: string
  ): Promise<LocaleDetail | undefined> {
    if (this.i18nAPI === "phraseapp") {
      const localeDetail = await PhraseappService.getLocale(this.token, {
        project_id,
        locale_id
      });
      const { id, name, code, created_at, updated_at } = localeDetail;
      return { id, name, code, created_at, updated_at };
    }
    return Promise.resolve(undefined);
  }

  public static async getLocaleTranslations(
    project_id: string,
    locale_id: string,
    file_format: string
  ): Promise<LocaleDetail | undefined> {
    if (this.i18nAPI === "phraseapp") {
      return await PhraseappService.downloadLocale(
        this.token,
        {
          project_id,
          locale_id
        },
        { file_format } as DownloadLocaleQuery
      );
    }
    return Promise.resolve(undefined);
  }
}
