import React, { Component } from 'react';
import DownloadI18nService from 'react-download-i18n';

const myToken = "c3b94567a19b117b219dbff853bf1c1e754abfe0f81b3dbc02c3fdafd9f237cf";
const project_id = "0f1404d500f3f4b7ae12e17d8e943807";
const locale_id = "es";
const file_format = "i18next";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    DownloadI18nService.init("phraseapp", myToken);
    DownloadI18nService.listLocales(project_id).then(locales => {
      console.log(`Locales: ${JSON.stringify(locales)}`);
      this.setState({locales});
    });

    DownloadI18nService.getLocale(project_id, locale_id).then(locale => {
      console.log(`Locale details: ${JSON.stringify(locale)}`);
      this.setState({locale});
    });

    DownloadI18nService.getLocaleTranslations(
      project_id,
      locale_id,
      file_format
    ).then(localeTranslations => {
      console.log(`Locale translations: ${JSON.stringify(localeTranslations)}`);
      this.setState({localeTranslations});
    });
  }

  render() {
    const { locales, locale, localeTranslations } = this.state;
    return (
      <div>
        <h1>React DownloadI18n</h1>
        { locales && (
          <div>
            <p>Locales:</p>
            { locales.map( locale => (<li key={locale.id}>{locale.name}</li>))}
          </div>          
        ) }
        { locale && (
          <div>
            <p>Locale {locale.name}:</p>
            <li>Created at: {locale.created_at}</li>
            <li>Updated at: {locale.updated_at}</li>
          </div>          
        ) }
        { locale && localeTranslations && (
          <div>
            <p>Locale {locale.name} translations</p>
            { Object.keys(localeTranslations).map((translationKey) => { return (<li key={1000 * Math.random()}>{translationKey}: {localeTranslations[translationKey]}</li>) } )}
          </div>
        )}
      </div>
    )};    
  }
