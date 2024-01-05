import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/landing.css';
import '../styles/blog.css';
import '../styles/post.css';
import '../styles/landing.sass';
import '../styles/animate.min.css';
import '../styles/contact.css';
import { WebsiteNavbar } from '../components/common/websiteNavbar';
import { CookieBar } from '../components/common/cookieBar';
import * as R from 'ramda';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import * as gtag from '../consts/google/gtag';
import  SSRProvider  from 'react-bootstrap/SSRProvider'

// Notice how we track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => {
  if (window !== undefined && gtag !== undefined) {
    gtag.pageview(url)
  }
})

function MyApp({ Component, pageProps, router }) {
  const err = '/404';
  const errLocal = '/_error';
  let lang = undefined;
  let isBrowser = typeof window !== "undefined" ? true : false;
  let langStorage = isBrowser ? localStorage.getItem('lang') : undefined;
  let hasNavigator = isBrowser === true && !R.isNil(navigator) && !R.isNil(navigator.language);
  let browserLanguage = detectLanguage();

  function detectLanguage() {
    if (hasNavigator) {
      for (let i = 0; i < pageProps.langArray.length; i++) {
        let langOnIndex = pageProps.langArray[i];
        if (navigator.language.includes(langOnIndex) || navigator.language.startsWith(langOnIndex)) {
          return langOnIndex;
        }
      }
    }
    return pageProps.defaultLanguage;
  };

  function setLanguage(language) {
    lang = language;
    if (isBrowser) {
      localStorage.setItem('lang', language);
    }
  };

  function setAndRedirect(language) {
    setLanguage(language);
    Router.push('/' + language);
  };

  function checkIfUrlStartsByLanguage() {
    for (let i = 0; i < pageProps.langArray.length; i++) {
      let l = pageProps.langArray[i];
      if (Router.asPath.startsWith('/' + l)) {
        setLanguage(l);
        break;
      }
    }
  };

  function UrlStartsByLanguage() {
    for (let i = 0; i < pageProps.langArray.length; i++) {
      if (Router.asPath.startsWith(`/${pageProps.langArray[i]}`)) {
        return true;
      }
    }
    return false;
  };

  function redirectToBrowserLanguage() {
    for (let i = 0; i < pageProps.langArray.length; i++) {
      let l = pageProps.langArray[i];
      if (browserLanguage === l) {
        setAndRedirect(l);
        break;
      }
    }
  };

  if (isBrowser && R.isNil(lang)) {

    if (UrlStartsByLanguage() === true) {
      checkIfUrlStartsByLanguage();
    }
    else if (!R.isNil(langStorage)) {
      Router.push(`/${langStorage}`);
    }
    else if (Router.asPath !== err && Router.asPath !== errLocal) {
      redirectToBrowserLanguage();
    }
    else {
      setLanguage(pageProps.defaultLanguage)
    }
  }

  return (
    <SSRProvider>
      <WebsiteNavbar lang={R.isNil(lang) ? pageProps.defaultLanguage : lang} path={router.asPath} post={pageProps.artData} langArray={pageProps.langArray} />
      <CookieBar lang={R.isNil(lang) ? pageProps.defaultLanguage : lang} />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </SSRProvider>
  );
}

export default MyApp;