import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Footer } from '../components/common/footer';
import { GA_TRACKING_ID } from '../consts/google/gtag';

class MyDocument extends Document {

  render() {
    return (
      <Html lang={this.props.__NEXT_DATA__.query.lang}>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link
            href="https://fonts.googleapis.com/css?family=PT+Sans:300,400,700,800&display=optional"
            rel="stylesheet"
          />
          <meta name="ga-tracking-id" content={GA_TRACKING_ID} />
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