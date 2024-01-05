import { Confirm } from '../../../components/confirm';
import { getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';
import * as Url from '../../../consts/urls/harckCMS';

function ConfirmPageIndex({ confirmationUrl, lang }) {
    return (
        <Confirm confirmationUrl={confirmationUrl} lang={lang} />
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
        props: { lang: params.lang, langArray: languages, confirmationUrl: Url.SUBSCRIBE_CONFIRMATION_URL(), defaultLanguage: defaultLanguage }
    }
};
export default ConfirmPageIndex;