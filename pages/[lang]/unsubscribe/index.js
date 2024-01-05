import { Unsubscribe } from '../../../components/unsubscribe';
import { getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';
import * as Url from '../../../consts/urls/harckCMS';

function UnsubscribePageIndex({ unsubscribeUrl, lang }) {
    return (
        <Unsubscribe unsubscribeUrl={unsubscribeUrl} lang={lang} />
    )
};

export const getStaticPaths = async () => {
    const languages = await getLanguages();
    const result = languages.map((lang) => { return { params: { lang: lang } } });
    return {
        paths: result,
        fallback: false
    }
};

export async function getStaticProps({ params }) {
    const languages = await getLanguages();
    const defaultLanguage = await getDefaultLanguage();

    return {
        props: { lang: params.lang, langArray: languages, unsubscribeUrl: Url.UNSUBSCRIBE_URL(), defaultLanguage: defaultLanguage }
    }
};
export default UnsubscribePageIndex;