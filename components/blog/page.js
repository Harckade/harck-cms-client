import React from 'react';
import * as R from 'ramda';
import { Badge } from 'react-bootstrap';
import { format } from 'date-fns'
import Link from 'next/link';
import { Animated } from "react-animated-css";

export const Page = ({ articles, lang }) => {

    return (
        <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>
            <div className="blog-entry-list">
                {!R.isNil(articles) && articles.length > 0 && articles.map((art, index) => {
                    return (
                        <div key={index} className="blog-entry">
                            <Link href={`/${lang}/post/${art.links[lang]}`}>
                                <section className="on-top-img" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${art.imageUrl[lang]}')` }}>
                                    <div className="blog-entry-date">
                                        <Badge className="blog-date-badge" style={{ borderRadius: '0', color: 'white', fontSize: '15px' }}>{format(art.publishDate, 'yyyy-MM-dd')}</Badge>
                                    </div>
                                    <div className="blog-entry-title-desc">
                                        <h1 className="text-center blog-entry-title">{!R.isNil(art.name[lang]) ? art.name[lang] : ''}</h1>
                                        {!R.isNil(art.description[lang]) ? <p className="blog-entry-description">{art.description[lang].length > 790 ? `${art.description[lang].substring(0, 790)}...` : art.description[lang]}</p> : ''}
                                    </div>
                                </section>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </Animated>
    );
}