import { Blog } from '../../../components/blog';
import { getArticles, getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';
import * as R from 'ramda';
import Article from '../../../consts/models/article';

function getFilteredArticles(data, lang) {
    const artModels = data?.map(art => new Article(art));
    return artModels?.filter(art => !R.isNil(art.name[lang]) && art.name[lang] !== '');
}

const articlesPerPage = 4;


function BlogPage({ data, currentPage, lang }) {
    currentPage = currentPage - 1;
    const articlesFiltered = getFilteredArticles(data, lang);
    let getLastEntries = articlesFiltered.length - currentPage * articlesPerPage < articlesPerPage ? articlesFiltered.length - currentPage * articlesPerPage : articlesPerPage;
    const articles = articlesFiltered?.slice(currentPage * articlesPerPage).slice(0, getLastEntries);
    const pages = R.isNil(articlesFiltered) || articlesFiltered.length === 0 ? 0 : Math.ceil(articlesFiltered.length / articlesPerPage);
    return (
        <Blog lang={lang} articles={articles} totalPages={pages} currentPage={currentPage + 1} />
    )
};


export async function getStaticProps({ params }) {
    const languages = await getLanguages();
    const defaultLanguage = await getDefaultLanguage();
    const data = await getArticles(params.lang);
    return {
        props: { data: data, currentPage: 1, revalidate: 1, lang: params.lang, langArray: languages, defaultLanguage: defaultLanguage }
    }
}

export const getStaticPaths = async () => {
    const languages = await getLanguages();
    const result = languages.map((lang) => { return { params: { lang: lang } } });
    return {
        paths: result,
        fallback: false //indicates the type of fallback
    }
};

export default BlogPage;
