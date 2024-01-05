import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Footer } from '../components/common/footer';
import { GA_TRACKING_ID } from '../consts/google/gtag';

class MyDocument extends Document {

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.query.lang}>
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link
            href="https://fonts.googleapis.com/css?family=PT+Sans:300,400,700,800&display=optional"
            rel="stylesheet"
          />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
          <script dangerouslySetInnerHTML={{
            __html: `
            function getCookie(cname) {
              var name = cname + "=";
              var decodedCookie = decodeURIComponent(document.cookie);
              var ca = decodedCookie.split(';');
              for(var i = 0; i < ca.length; i++) {
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
            var consent = getCookie("CookieConsent");
         
            if(consent === "true"){
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {'anonymize_ip': true});
            }`,
          }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Footer props={this.props} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;