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
      locales.map((locale) =>
        DownloadI18nService.getLocaleTranslations(
          project_id,
          locale.name,
          file_format
        ).then(localeTranslation => {
          localeTranslations[locale.name]=localeTranslation;
          if (Object.keys(localeTranslations).length === localeNumber) {
            this.setState({localeTranslations});
          }
        })
      );
    });
  }

  render() {
    const { locales, localeTranslations } = this.state;
    return (
      <div>
        <h1>React DownloadI18n</h1>
        <p>Translations downloaded from phraseapp.</p>
        <p>Edit translations <a href="https://demo.phraseapp.com">here</a>.</p>
        { locales && localeTranslations && (
          <table>
            <thead>
              <tr>
                { locales.map( locale => (<th key={locale.id}>{locale.name}</th>)) }
              </tr>
            </thead>
            <tbody>
              <tr>
              { locales.map( locale => {
                    return (
                      <td>
                        <li key={1}>Created at: {locale.created_at}</li>
                        <li key={2}>Updated at: {locale.updated_at}</li>
                      </td>
                    );
                }) }
              </tr>
              <tr>
                { locales.map( locale => {
                    const localeTranslation = localeTranslations[locale.name];
                    return (
                      <td>
                        { Object.keys(localeTranslation).map((translationKey) => { return (<li key={1000 * Math.random()}>{translationKey}: {localeTranslation[translationKey]}</li>) } )}
                      </td>
                    );
                }) }
              </tr>
            </tbody>
          </table>
        ) }
      </div>
    )};    
  }
