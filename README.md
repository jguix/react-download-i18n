# react-download-i18n

> A library for downloading and caching remote tranlations

[![NPM](https://img.shields.io/npm/v/react-download-i18n.svg)](https://www.npmjs.com/package/react-download-i18n) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-download-i18n
```

## Usage

```tsx
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    DownloadI18nService.init("phraseapp", myToken);
    DownloadI18nService.listLocales(project_id).then(locales => {
      this.setState({locales});
    });

    DownloadI18nService.getLocale(project_id, locale_id).then(locale => {
      this.setState({locale});
    });

    DownloadI18nService.getLocaleTranslations(
      project_id,
      locale_id,
      file_format
    ).then(localeTranslations => {
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
```

## License

MIT © [jguix](https://github.com/jguix)
