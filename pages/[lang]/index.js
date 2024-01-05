import { Landing } from '../../components/landing';
import {getArticles, getDefaultLanguage, getLanguages} from '../../lib/harckCMS';
import * as R from 'ramda';
import Article from '../../consts/models/article';
import { YOUR_WEBSITE_URL } from '../../consts/urls/harckCMS';
import * as Url from '../../consts/urls/harckCMS';

function getFilteredArticles(data, lang){
    const artModels = data?.map(art => new Article(art));
    return artModels?.filter(art => !R.isNil(art.name[lang]) && art.name[lang] !== '');
}

const articlesPerPage = 7;

function Index({data, currentPage, lang, websiteUrl, newsletterSubscribeUrl}) {
    currentPage = currentPage - 1;
    const articlesFiltered = getFilteredArticles(data, lang);
    let getLastEntries = articlesFiltered.length - currentPage * articlesPerPage < articlesPerPage ? articlesFiltered.length - currentPage * articlesPerPage : articlesPerPage;
    const articles = articlesFiltered?.slice(currentPage * articlesPerPage).slice(0,  getLastEntries);
    return (
        <Landing lang={lang} articles={articles} websiteUrl={websiteUrl} newsletterSubscribeUrl={newsletterSubscribeUrl}/>
    )
};

export async function getStaticProps({params}) {
    const languages = await getLanguages();
    const defaultLanguage = await getDefaultLanguage();
    const data = await getArticles(params.lang);
    return {
        props: { data: data, currentPage: 1, revalidate: 1, lang: params.lang, langArray: languages, defaultLanguage: defaultLanguage, websiteUrl: YOUR_WEBSITE_URL, newsletterSubscribeUrl: Url.NEWSLETTER_SUBSCRIBE_URL() }
    }
}

export const getStaticPaths = async () => {
    const languages = await getLanguages();
    const result = languages.map((lang) => { return {params: { lang: lang }} });
    return {
        paths: result,
        fallback: false //indicates the type of fallback
    }
};


export default Index;
