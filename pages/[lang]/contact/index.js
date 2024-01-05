import { Contact } from '../../../components/contact';
import { getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';
import * as Url from '../../../consts/urls/harckCMS';

function ContactIndex({ lang, contactUrl, websiteUrl }) {
    return (
        <Contact lang={lang} contactUrl={contactUrl} websiteUrl={websiteUrl} />
    )
};

export const getStaticPaths = async () => {
    const languages = await getLanguages();
    const result = languages.map((lang) => { return { params: { lang: lang } } });
    return {
        paths: result,
        fallback: false //indicates the type of fallback
    }
};

export async function getStaticProps({ params }) {
    const languages = await getLanguages();
    const defaultLanguage = await getDefaultLanguage();

    return {
        props: { lang: params.lang, langArray: languages, defaultLanguage: defaultLanguage, contactUrl: Url.CONTACT_URL(), websiteUrl: Url.YOUR_WEBSITE_URL }
    }
};
export default ContactIndex;