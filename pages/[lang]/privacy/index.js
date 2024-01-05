import { Privacy } from '../../../components/privacy';
import { getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';
import { YOUR_PRIVACY_EMAIL } from '../../../consts/urls/harckCMS';

function PrivacyPageIndex({ lang, privacyEmailAddress }) {
    return (
        <Privacy lang={lang} privacyEmailAddress={privacyEmailAddress}/>
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
        props: { lang: params.lang, langArray: languages, defaultLanguage: defaultLanguage, privacyEmailAddress: YOUR_PRIVACY_EMAIL }
    }
};
export default PrivacyPageIndex;