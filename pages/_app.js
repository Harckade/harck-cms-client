import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/landing.css';
import '../styles/blog.css';
import '../styles/post.css';
import '../styles/animate.min.css';
import '../styles/contact.css';
import { WebsiteNavbar } from '../components/common/websiteNavbar';
import { CookieBar } from '../components/common/cookieBar';
import * as R from 'ramda';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';
import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google';

function MyApp({ Component, pageProps, router }) {
  let lang = undefined;
  let isBrowser = typeof window !== "undefined" ? true : false;

  function UrlStartsByLanguage() {
    for (let i = 0; i < pageProps.langArray.length; i++) {
      if (Router.asPath.startsWith(`/${pageProps.langArray[i]}`)) {
        return true;
      }
    }
    return false;
  };


  function setLanguage(language) {
    lang = language;
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

  if (isBrowser && R.isNil(lang)) {
    if (UrlStartsByLanguage() === true && lang === undefined) {
      checkIfUrlStartsByLanguage();
    }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var consent = isBrowser ? getCookie("CookieConsent") : false;
  var GA_TRACKING_ID = isBrowser ? document.querySelector('meta[name="ga-tracking-id"]').content : '';


  return (
    <>
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

      {/* //waiting for NextJs to fix this for SSG https://github.com/vercel/next.js/discussions/54907 */}
      {consent === "true" && GA_TRACKING_ID !== undefined ? <GoogleTagManager gtmId={GA_TRACKING_ID} dataLayer={[{ 'anonymizeIp': true }]}/> : ''}
      {consent === "true" && GA_TRACKING_ID !== undefined ? <GoogleAnalytics gaId={GA_TRACKING_ID} /> : ''}
    </>
  );
}

export default MyApp;