// https://medium.freecodecamp.org/how-to-write-a-simple-react-search-plugin-publish-it-to-npm-and-deploy-it-to-github-pages-d8876dff7780
import React, { Component } from 'react';
import DownloadI18nService from 'react-download-i18n';

// Some data from a demo project in phraseapp
const i18n_api = "phraseapp";
const token = "0000000000000000a45c4158e0858dd1";
const project_id = "00000000000000004158e0858d2fa45c";
const file_format = "i18next";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    DownloadI18nService.init(i18n_api, token);
    DownloadI18nService.listLocales(project_id).then(locales => {
      const localeNumber = locales.length;
      this.setState({locales});

      let localeTranslations = {};
      locales.map((locale) => {
        DownloadI18nService.getLocaleTranslations(
          project_id,
          locale.name,
          file_format
        ).then(localeTranslation => {
          localeTranslations[locale.name]=localeTranslation;
          if (Object.keys(localeTranslations).length === localeNumber) {
            this.setState({localeTranslations});
          }
        });
      });
    });

    // DownloadI18nService.getLocale(project_id, locale_id).then(locale => {
    //   console.log(`Locale details: ${JSON.stringify(locale)}`);
    //   this.setState({locale});
    // });

    // DownloadI18nService.getLocaleTranslations(
    //   project_id,
    //   locale_id,
    //   file_format
    // ).then(localeTranslations => {
    //   console.log(`Locale translations: ${JSON.stringify(localeTranslations)}`);
    //   this.setState({localeTranslations});
    // });
  }

  render() {
    const { locales, localeTranslations } = this.state;
    return (
      <div>
        <h1>React DownloadI18n</h1>
        { locales && (
          <div>
            <p>Locales:</p>
            { locales.map( locale => (<li key={locale.id}>{locale.name}</li>))}
          </div>          
        ) }
        { locales && localeTranslations && locales.map( locale => {
          const localeTranslation = localeTranslations[locale.name];
          return (
            <div>
              <div>
                <p>Locale <b>{locale.name}</b>:</p>
                <li>Created at: {locale.created_at}</li>
                <li>Updated at: {locale.updated_at}</li>
              </div>
              <div>
                <p>Locale <b>{locale.name}</b> translations: </p>
                { Object.keys(localeTranslation).map((translationKey) => { return (<li key={1000 * Math.random()}>{translationKey}: {localeTranslation[translationKey]}</li>) } )}
              </div>
            </div>
          );
        }) }
      </div>
    )};    
  }
