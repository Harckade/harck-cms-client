import { getArticleByTitle, getArticleContentById, getArticles, getDefaultLanguage, getLanguages } from '../../../lib/harckCMS';
import { Post } from '../../../components/post';
import Article from '../../../consts/models/article';
import * as R from 'ramda';
import { YOUR_WEBSITE_URL } from '../../../consts/urls/harckCMS';

function getFilteredArticles(data, lang){
  const artModels = data?.map(art => new Article(art));
  return artModels?.filter(art => !R.isNil(art.links[lang]) && art.links[lang] !== '');
}


function PostPage({ artData, contentData, lang, websiteUrl }) {
  let art = undefined;
  if (artData !== 'undefined' && artData !== undefined && artData !== '') {
    art = new Article(artData);
  }

  return (
    <Post lang={lang} article={art} content={contentData} websiteUrl={websiteUrl} />
  )
};


export async function getStaticPaths() {
  const languages = await getLanguages();
  const tmpResult = await Promise.all(languages.map(async (lang) => {
    const data = await getArticles(lang);
    const posts = getFilteredArticles(data, lang);
    return posts?.map((post) => ({
      params: { title: post.links[lang], lang: lang }
    }));
  }));
  const result = tmpResult.reduce((o, m) => m.concat(o), []);
  return { paths: result, fallback: false }
}

export async function getStaticProps({ params }) {
  const languages = await getLanguages();
  const defaultLanguage = await getDefaultLanguage();
  const artData = await getArticleByTitle(params.lang, params.title);

  let errorCode = artData.ok ? false : artData.statusCode;
  if (errorCode) {
    artData.statusCode = errorCode;
  }
  const contentData = await getArticleContentById(artData.id, params.lang);
  if (errorCode == false && !contentData.ok) {
    contentData.statusCode = errorCode;
  }

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: { artData: artData, contentData: contentData, revalidate: 1, lang: params.lang, langArray: languages, defaultLanguage: defaultLanguage, websiteUrl: YOUR_WEBSITE_URL}
  }
}


export default PostPage;
