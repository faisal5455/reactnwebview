import ar from '../translation/ar.json'
import de from '../translation/de.json'
import en from '../translation/en.json'
import es from '../translation/es.json'
import fr from '../translation/fr.json'
import hi from '../translation/hi.json'
import ja from '../translation/ja.json'
import ko from '../translation/ko.json'
import pt from '../translation/pt.json'
import ru from '../translation/ru.json'
import tr from '../translation/tr.json'
import ur from '../translation/ur.json'
import zh from '../translation/zh.json'
import i18next from 'i18next';
import MyStorage from '../storage/storage'

export const setupLanguage = async () => {
    console.log('setupLanguage');
    let lang = await MyStorage.getLang()
    console.log('lang: '+lang);
    i18next.init({
        compatibilityJSON: 'v3',
        interpolation: {
            escapeValue: false
        },
        lng: lang,
        resources: {
            ar: {
                translation: ar
            },
            de: {
                translation: de
            },
            es: {
                translation: es
            },
            fr: {
                translation: fr
            },
            hi: {
                translation: hi
            },
            ja: {
                translation: ja
            },
            ko: {
                translation: ko
            },
            pt: {
                translation: pt
            },
            ru: {
                translation: ru
            },
            tr: {
                translation: tr
            },
            zh: {
                translation: zh
            },
            en: {
                translation: en
            },
            ur: {
                translation: ur
            },
        }
    })
};