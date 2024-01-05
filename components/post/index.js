import React from 'react';
import * as R from 'ramda';
import { Badge, Col, Container, Row } from 'react-bootstrap';
import { format } from 'date-fns'
import { FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import Link from 'next/link';
import rehypeSanitize from "rehype-sanitize";
import ReactMarkdown from 'react-markdown'

export const Post = ({lang, article, content, websiteUrl}) => {
    if(article === undefined){
        return '';
    }
  
    return (
        <>
            <Helmet>
                <title>{article.name[lang]}</title>
                <meta name="description" content={article.description[lang]} />
            </Helmet>
            <div className="post-content">
                <br />
                <div className="post-background">
                    <h1 className="post-inner">{article.name[lang]}</h1>
                    <Badge className="post-date blog-date-badge" style={{ borderRadius: '0', color: 'white', fontSize: '15px' }}>{format(article.publishDate, 'yyyy-MM-dd')}</Badge>
                    <div fluid className="post-inner text-left">
                        <Link href={`https://twitter.com/intent/tweet?url=${websiteUrl}/${lang}/post/${article.links[lang]}/&text=`}><span style={{cursor: 'pointer'}}><FaTwitter size={'20px'} /></span></Link>
                        <span> </span>
                        <Link href={`https://www.linkedin.com/sharing/share-offsite/?url=${websiteUrl}/${lang}/post/${article.links[lang]}`}><span style={{cursor: 'pointer'}}><FaLinkedin size={'20px'} /></span></Link>      
                        <span> </span>
                        <Link href={`https://www.facebook.com/sharer/sharer.php?u=${websiteUrl}/${lang}/post/${article.links[lang]}`}><span style={{cursor: 'pointer'}}><FaFacebook size={'20px'} /></span></Link>
                    </div>
                    <br />
                    <Container fluid className='justify-content-md-center'>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <img src={article.imageUrl[lang]} className="responsive-image" alt={!R.isNil(article.imageDescription[lang]) ? article.imageDescription[lang] : 'article main image'} />
                                {!R.isNil(article.imageDescription[lang]) ? <div className='img-description'>{article.imageDescription[lang]}</div> : ''}
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <ReactMarkdown className="post-inner" rehypePlugins={[rehypeSanitize({ attributes: ['video'] })]}>{content}</ReactMarkdown>
                </div>
            </div>
        </>
    );
};
