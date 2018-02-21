import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { reactI18nextModule } from 'react-i18next';
// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(reactI18nextModule)
  .init({
    //fallbackLng: 'en-US', //unnecessary with LanguageDetector
    appendNamespaceToCIMode: true,
    saveMissing: false,
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',

    debug: false,
    keySeparator: false,

    backend: {
      loadPath: lng => {
        const langs = {'en': 'en-US', 'pt': 'pt-BR', 'dev': 'pt-BR'};
        lng = langs[lng] ? langs[lng] : lng;
        return `/locales/${lng}/{{ns}}.json`;
      },
      // projectId: '1470e567-6152-4952-bb29-f180a5f953b4',
      // apiKey: 'aca67193-2830-46ea-adca-ebee3f60429f',
      referenceLng: 'pt-BR'
    },

    interpolation: {
      formatSeparator: ',',
      format: function(value, format) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    },

    wait: true //need to fix server side render when use Backend
  });


export default i18n;