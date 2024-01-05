const SERVER_ADDRESS = process.env.SERVER_ADDRESS;

export const ARTICLES_URL = () =>  `${SERVER_ADDRESS}/articles`;
export const ARTICLE_BY_ID = (id) =>  `${SERVER_ADDRESS}/articles/${id}`;
export const ARTICLE_BY_ID_CONTENT = (id) =>  `${SERVER_ADDRESS}/articles/${id}/content`;
export const ARTICLE_BY_TITLE = (lang, title) =>  `${SERVER_ADDRESS}/articles/title/${lang}/${title}`;
export const ARTICLE_BY_TITLE_CONTENT = (lang, title) =>  `${SERVER_ADDRESS}/articles/title/ ${lang}/${title}/content`;
export const FILE_URL = (fileType, name) => `${SERVER_ADDRESS}/files/${fileType}/${name}`;
export const CONTACT_URL = () => `${SERVER_ADDRESS}/contact`;
export const DEFAULT_IMG_URL = "";
export const LANGUAGES_URL = () => `${SERVER_ADDRESS}/languages`;
export const DEFAULT_LANGUAGE_URL = () => `${SERVER_ADDRESS}/languages/default`;
export const NEWSLETTER_SUBSCRIBE_URL = () => `${SERVER_ADDRESS}/newsletter`;
export const SUBSCRIBE_CONFIRMATION_URL = () => `${SERVER_ADDRESS}/newsletter/confirm`;
export const UNSUBSCRIBE_URL = () => `${SERVER_ADDRESS}/newsletter/unsubscribe`;
export const YOUR_WEBSITE_URL = process.env.YOUR_WEBSITE_URL;
export const YOUR_PRIVACY_EMAIL = process.env.YOUR_PRIVACY_EMAIL;