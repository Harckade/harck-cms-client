import { Landing } from '../components/landing';
import { getDefaultLanguage, getLanguages } from '../lib/harckCMS';

function Home({lang}) {
    return (
        <Landing lang={lang} />
    )
};

export async function getStaticProps() {
    const defaultLanguage = await getDefaultLanguage();
    const languages = await getLanguages();
    return {
        props: {lang: defaultLanguage, defaultLanguage: defaultLanguage, langArray: languages}
    }
}

export default Home;