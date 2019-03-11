import * as queryString from 'query-string';

const BASE_URL = "https://api.phraseapp.com/api/v2";

export type LocaleFileFormat =
  | "angular_translate"
  | "csv"
  | "ember_js"
  | "episerver"
  | "gettext"
  | "gettext_mo"
  | "gettext_template"
  | "go_i18n"
  | "i18next"
  | "ini"
  | "json"
  | "laravel"
  | "mozilla_properties"
  | "nested_json"
  | "node_json"
  | "php_array"
  | "play_properties"
  | "plist"
  | "properties"
  | "properties_xml"
  | "qph"
  | "react_nested_json"
  | "react_simple_json"
  | "resx"
  | "resx_windowsphone"
  | "simple_json"
  | "strings"
  | "stringsdict"
  | "symfony_xliff"
  | "tmx"
  | "ts"
  | "windows8_resource"
  | "xlsx"
  | "xlf"
  | "xml"
  | "yml"
  | "yml_symfony"
  | "yml_symfony2"
  | "zendesk_csv";

export type LocalePluralForm = "zero" | "one" | "other";

export type LocaleEncoding = "UTF-8" | "UTF-16" | "ISO-8859-1";

export type LocaleBasePathParams = {
  project_id: string;
};

export type ListLocalesPathParams = LocaleBasePathParams;

export type GetLocalePathParams = LocaleBasePathParams & {
  locale_id: string;
};

export type DownloadLocalePathParams = LocaleBasePathParams & {
  locale_id: string;
};

export type LocaleBaseQuery = {
  branch?: string;
};

export type ListLocalesQuery = LocaleBaseQuery;

export type GetLocaleQuery = LocaleBaseQuery;

export type DownloadLocaleQuery = LocaleBaseQuery & {
  file_format: LocaleFileFormat;
  tags?: string[];
  include_empty_translations?: boolean;
  include_translated_keys?: boolean;
  keep_notranslate_tags?: boolean;
  convert_emoji?: boolean;
  format_options?: string; // Specify format options like this: ...&format_options[foo]=bar
  encoding?: LocaleEncoding;
  include_unverified_translations?: boolean;
  use_last_reviewed_version?: boolean;
  fallback_locale_id?: boolean;
};

export type LocaleDetail = {
  id: string;
  name: string;
  code: string;
  default: boolean;
  main: boolean;
  rtl: boolean;
  plural_forms: LocalePluralForm[];
  created_at: string; // datetime format 2019-03-07T23:58:31Z
  updated_at: string;
  statistics: {
    keys_total_count: number;
    keys_untranslated_count: number;
    words_total_count: number;
    translations_completed_count: number;
    translations_unverified_count: number;
    unverified_words_count: number;
    missing_words_count: number | null;
  };
  source_locale: string;
};

export class PhraseappService {
  public static async listLocales(
    token: string,
    pathParams: ListLocalesPathParams,
    query?: ListLocalesQuery
  ): Promise<LocaleDetail[]> {
    const path = `projects/${pathParams.project_id}/locales`;
    const url = `${BASE_URL}/${path}${
      query ? "?" + queryString.stringify(query) : ""
    }`;

    const res = await fetch(url, { headers: this.getHeaders(token) });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const resJson = (await res.json()) as LocaleDetail[];

    return Promise.resolve(resJson);
  }

  public static async getLocale(
    token: string,
    pathParams: GetLocalePathParams,
    query?: GetLocaleQuery
  ): Promise<LocaleDetail> {
    const path = `projects/${pathParams.project_id}/locales/${
      pathParams.locale_id
    }`;
    const url = `${BASE_URL}/${path}${
      query ? "?" + queryString.stringify(query) : ""
    }`;

    const res = await fetch(url, { headers: this.getHeaders(token) });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const resJson = (await res.json()) as LocaleDetail;

    return Promise.resolve(resJson);
  }

  public static async downloadLocale(
    token: string,
    pathParams: DownloadLocalePathParams,
    query: DownloadLocaleQuery
  ): Promise<any> {
    const path = `projects/${pathParams.project_id}/locales/${
      pathParams.locale_id
    }/download`;
    const url = `${BASE_URL}/${path}?${queryString.stringify(query)}`;

    const res = await fetch(url, { headers: this.getHeaders(token) });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  }

  private static getHeaders(token: string): Headers {
    const base64EncodedCredentials = btoa(token);
    const headers = new Headers({
      Authorization: `Basic ${base64EncodedCredentials}`,
      "Content-Type": "application/json"
    });
    return headers;
  }
}
