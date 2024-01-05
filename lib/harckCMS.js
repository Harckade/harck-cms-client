import axios from 'axios';
import * as Url from '../consts/urls/harckCMS';
import * as fs from 'fs';
import path from 'path';

const fileExists = async filePath => !!(await fs.promises.stat(filePath).catch(e => false));

export async function getArticles(lang) {
    const defaultLanguage = await getDefaultLanguage();
    const ARTICLES_CACHE_PATH = path.join(__dirname, '.articles');
    let cacheExists = false;
    //wait for the index page to create a cache file
    do {
        cacheExists = await fileExists(ARTICLES_CACHE_PATH);
        if (cacheExists) {
            //Read articles from cache file
            let fileData = fs.readFileSync(ARTICLES_CACHE_PATH, 'utf-8');
            return JSON.parse(fileData);
        }
    } while (cacheExists === false && lang !== defaultLanguage);

    const data = await fetchArticlesData();
    fs.writeFileSync(ARTICLES_CACHE_PATH, JSON.stringify(data), 'utf-8');
    return data;
}

export async function getLanguages() {
    const LANG_CACHE_PATH = path.join(__dirname, '.languages');
    let cacheExists = false;
    //wait for the index page to create a cache file

    cacheExists = await fileExists(LANG_CACHE_PATH);
    if (cacheExists) {
        //Read articles from cache file
        let fileData = fs.readFileSync(LANG_CACHE_PATH, 'utf-8');
        return JSON.parse(fileData);
    }
    else {
        const data = await fetchLanguages();
        fs.writeFileSync(LANG_CACHE_PATH, JSON.stringify(data), 'utf-8');
        return data;
    }
}

export async function getDefaultLanguage() {
    const DEF_LANG_CACHE_PATH = path.join(__dirname, '.defaultLanguage');
    let cacheExists = false;
    //wait for the index page to create a cache file

    cacheExists = await fileExists(DEF_LANG_CACHE_PATH);
    if (cacheExists) {
        //Read articles from cache file
        let fileData = fs.readFileSync(DEF_LANG_CACHE_PATH, 'utf-8');
        return JSON.parse(fileData);
    }
    else {
        const data = await fetchDefaultLanguage();
        fs.writeFileSync(DEF_LANG_CACHE_PATH, JSON.stringify(data), 'utf-8');
        return data;
    }
}

export async function fetchLanguages() {
    const response = await axios.get(Url.LANGUAGES_URL());
    return response.data.map(lang => lang.charAt(0).toLowerCase() + lang.slice(1));
}

export async function fetchDefaultLanguage() {
    const response = await axios.get(Url.DEFAULT_LANGUAGE_URL());
    return response.data.charAt(0).toLowerCase() + response.data.slice(1);
}

export async function fetchArticlesData() {
    const response = await axios.get(Url.ARTICLES_URL());
    return response.data;
}

export async function getArticleById(id) {
    const response = await axios.get(Url.ARTICLE_BY_ID(id));
    return response.data;
}

export async function getArticleByTitle(lang, title) {
    const response = await axios.get(Url.ARTICLE_BY_TITLE(lang, title));
    return response.data;
}

export async function getArticleContentById(id, lang) {
    const response = await axios.get(Url.ARTICLE_BY_ID_CONTENT(id), { params: { lang: lang } });
    return response.data;
}