import { About } from '../../../components/about';
import { getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';

function AboutIndex({ lang }) {
    return (
        <About lang={lang} />
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
        props: { lang: params.lang, langArray: languages, defaultLanguage }
    }
}

export default AboutIndex;