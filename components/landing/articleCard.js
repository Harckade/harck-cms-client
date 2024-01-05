import React from 'react';
import * as R from 'ramda';
import { format } from 'date-fns'

export const ArticleCard = ({ title, date, url, imageUrl, description, idx }) => {

    return (
        <div className={`item-${idx + 1}`}>
            <a href={url} className="card-portfolio">
                <div className="thumb">
                    <img src={imageUrl} />
                </div>
                <article>
                    <h1>{title}</h1>
                    {!R.isNil(description) ? <p>{description.length > 400 ? `${description.substring(0, 400)}...` : description}</p> : ''}
                    <span>{format(date, 'yyyy-MM-dd')}</span>
                </article>
            </a>
        </div>
    );  
}