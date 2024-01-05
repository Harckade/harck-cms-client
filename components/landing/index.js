import { Helmet } from "react-helmet";
import { Text } from "../../consts/translations/landing";
import * as R from 'ramda';
import { useRef } from "react";
import { ArticleCard } from './articleCard';
import { Animated } from "react-animated-css";
import { DEFAULT_IMG_URL } from '../../consts/urls/harckCMS';
import { Newsletter } from "./newsletter";

export const Landing = ({ lang, articles, websiteUrl, newsletterSubscribeUrl }) => {
    const images = useRef(null);
    const getInTouch = useRef(null);

    const scrollTo = (el) => {
        return (

            <span style={{ cursor: 'pointer' }} onClick={() => {
                if (!R.isNil(el) && !R.isNil(el.current)) {
                    el.current.scrollIntoView({ behavior: 'smooth' });
                }
            }}>
                <div className="mouse_scroll">
                    <div>
                        <span className="m_scroll_arrows unu"></span>
                        <span className="m_scroll_arrows doi"></span>
                        <span className="m_scroll_arrows trei"></span>
                    </div>
                </div>
            </span>
        )
    }

    return (
        <div>
            <Helmet>
                <title>{Text.Title[lang]}</title>
                <meta name="description" content={Text.TitleDescription[lang]} />
            </Helmet>
            <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>
                <div id='land'>
                    <div id='title'>
                        <span>
                            {!R.isNil(Text.PresentationTextPart1[lang]) ? Text.PresentationTextPart1[lang].toUpperCase() : ''}
                        </span>
                        <br />
                        <span>
                            {!R.isNil(Text.PresentationTextPart2[lang]) ? Text.PresentationTextPart2[lang].toUpperCase() : ''}
                        </span>
                        <br />
                        {scrollTo(images)}
                    </div>
                    <br />
                    <div id='stars'></div>
                    <div id='stars2'></div>
                    <div id='stars3'></div>
                </div>
            </Animated>
            <div ref={images} id="portfolio">
                <header>
                    <h1 className="text-center">{Text.Recent[lang]}</h1>
                </header>
                <div className="band">
                    {
                        R.isNil(articles) || articles.length === 0 ? '' : articles.map((el, index) => {
                            return (
                                <ArticleCard key={'article-' + index} idx={index} date={el.publishDate} title={!R.isNil(el.name[lang]) ? el.name[lang] : ''} description={!R.isNil(el.description[lang]) ? el.description[lang] : ''} imageUrl={!R.isNil(el.imageUrl[lang]) ? el.imageUrl[lang] : DEFAULT_IMG_URL} url={`${websiteUrl}/${lang}/post/${el.links[lang]}`} />
                            )
                        })
                    }
                </div>
                <br />
                <Newsletter lang={lang} websiteUrl={websiteUrl} newsletterSubscribeUrl={newsletterSubscribeUrl} />
                <br />
                <h1 className="text-center">{scrollTo(getInTouch)}</h1>
            </div>
            <div id="get-in-touch-section" ref={getInTouch}>
                <span id={`get-in-touch-${lang.toLowerCase()}`}><a href={`${websiteUrl}/${lang}/contact`}></a></span>
            </div>
        </div>
    )
}