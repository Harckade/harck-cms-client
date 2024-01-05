import Link from 'next/link';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Text} from '../../consts/translations/footer';
import {FaLinkedinIn, FaYoutube, FaGithub, FaFacebook, FaInstagram, FaFacebookMessenger} from 'react-icons/fa';

export const Footer = ({props}) => {
    const lang = props.__NEXT_DATA__.query.lang;

    return (
        <footer className='footer'>
            <Container fluid className='justify-content-md-center'>
                <Row className="justify-content-md-center text-center">
                    <Col xs lg="1">
                    <a href="#" className="icon-link"><FaInstagram/></a>
                    </Col>
                    <Col xs lg="1">
                    <a href="#" className="icon-link"><FaFacebook/></a>
                    </Col>
                    <Col xs lg="1">
                    <a href="#" className="icon-link"><FaGithub/></a>
                    </Col>
                    <Col xs lg="1">
                    <a href="#" className="icon-link"><FaYoutube/></a>
                    </Col>
                    <Col xs lg="1">
                    <a href="#" className="icon-link"><FaLinkedinIn/></a>
                    </Col>
                    <Col xs lg="1">
                        <Link  className="icon-link" href={`/${lang}/contact`}><FaFacebookMessenger/></Link>
                    </Col>
                </Row>
                <Row className="justify-content-md-center text-center">
                    <Col md="auto">
                        <span className="text-center"><a href="https://www.harckade.com/">© Harckade 2021</a></span>
                    </Col>
                </Row>
                <Row className="justify-content-md-center text-center">
                    <Link style={{ fontSize: '12px' }} href={`/${lang}/privacy`}>{Text.PrivacyPolicy[lang]}</Link>
                </Row>
            </Container>
            <br/>
        </footer>
    );
}