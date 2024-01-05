import { getDefaultLanguage, getLanguages } from '../lib/harckCMS';
import Router from 'next/router';
import * as R from 'ramda';
import {NotFound} from '../components/notfound';

function NotFoundPage({ defaultLanguage, langArray }) {
    let isBrowser = typeof window !== "undefined" ? true : false;
    let hasNavigator = isBrowser === true && !R.isNil(navigator) && !R.isNil(navigator.language);
    let browserLanguage = detectLanguage();

    function detectLanguage() {
        if (hasNavigator) {
            let langStorage = isBrowser ? localStorage.getItem('lang') : undefined;
            if (!R.isNil(langStorage)) {
                return langStorage;
            }
            langArray.forEach(l => {
                if (navigator.language.includes(l)) {
                    return l;
                }
            });
        }
        return defaultLanguage;
    };

    function checkIfUrlStartsByLanguage() {
        for (let i = 0; i < langArray.length; i++) {
            if (Router.asPath.startsWith(`/${langArray[i]}/`)) {
                return true;
            }
        }
        return false;
    };

    if (hasNavigator && !R.isNil(browserLanguage) && checkIfUrlStartsByLanguage() === false) {
        if (checkIfUrlStartsByLanguage() === false) {
            Router.push(`/${browserLanguage}/${Router.asPath}`);
        }

    }
    return hasNavigator && checkIfUrlStartsByLanguage() === true ? <NotFound lang={browserLanguage} />: '';
};

export async function getStaticProps() {
    const languages = await getLanguages();
    const defaultLanguage = await getDefaultLanguage();

    return {
        props: { lang: defaultLanguage, defaultLanguage: defaultLanguage, langArray: languages }
    }
}

export default NotFoundPage;