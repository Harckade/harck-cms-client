import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Text } from "../../consts/translations/contact";
import { Container, Row, Col, InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import { IoMdPerson } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { SiMinutemailer } from 'react-icons/si';
import { BsPencilSquare } from 'react-icons/bs';
import { CgWebsite } from 'react-icons/cg';
import axios from 'axios';
import { Animated } from "react-animated-css";
import { toast } from 'react-toastify';

const toastMessageSentSuccess = () => toast.success(`Message successfully sent ✔`, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const toastMessageSentError = () => toast.error(`😭 An error occured. Message was not sent`, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
});

export const Contact = ({ lang, contactUrl, websiteUrl }) => {
    let isBrowser = typeof window !== "undefined" ? true : false;
    const [isSmallWindow, setIsSmallWindow] = useState(isBrowser ? window.innerWidth <= 990 : false);
    const [isSending, setIsSending] = useState(false);
    const [validated, setValidated] = useState(false);
    const [contactData, setContactData] = useState({
        email: '',
        name: '',
        website: '',
        message: '',
        subject: 'feedback from website'
    });

    async function sendContactForm(message) {
        setIsSending(true);
        await axios.post(contactUrl, message)
            .then((response) => {
                if (response.status === 200) {
                    toastMessageSentSuccess();
                } else {
                    toastMessageSentError();
                }
                setIsSending(false);
            }).catch((error) => {
                setIsSending(false);
                toastMessageSentError();
                throw error.statusText;
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else{
            sendContactForm(contactData);
        }

        setValidated(true);
    };


    useEffect(() => {
        if (isBrowser) {
            window.addEventListener("resize", () => {
                setIsSmallWindow(window.innerWidth <= 990);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isBrowser) {
            if (window.innerWidth <= 990 && isSmallWindow === false) {
                setIsSmallWindow(true);
            }
            else if (window.innerWidth > 990 && isSmallWindow === true) {
                setIsSmallWindow(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <React.Fragment>
            <Helmet>
                <title>{Text.Title[lang]}</title>
                <meta name="description" content={Text.TitleDescription[lang]} />
            </Helmet>
            <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>
                <Container fluid className='justify-content-md-center center-form'>
                    <Row className='justify-content-md-center'>
                        <Col md={6} className='text-center'><h4>{Text.Description[lang]}</h4></Col>
                    </Row>
                    <br />
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="g-2 justify-content-md-center">
                            <Col md="4">
                                <InputGroup className="mb-3" >
                                    <span className="input-group-text">@</span>
                                    <FormControl
                                        required={true}
                                        placeholder={Text.Email[lang]}
                                        aria-label="email"
                                        aria-describedby="contactEmail"
                                        type="email"
                                        onInput={(e) => {
                                            setContactData({ ...contactData, email: e.target.value });
                                        }}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <span className="input-group-text"><IoMdPerson /></span>
                                    <FormControl
                                        required={true}
                                        placeholder={Text.Name[lang]}
                                        aria-label="name"
                                        aria-describedby="contactName"
                                        onInput={(e) => {
                                            setContactData({ ...contactData, name: e.target.value });
                                        }}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <span className="input-group-text"><CgWebsite /></span>
                                    <FormControl
                                        placeholder={Text.Website[lang]}
                                        aria-label="website"
                                        aria-describedby="website"
                                        onInput={(e) => {
                                            setContactData({ ...contactData, website: e.target.value });
                                        }}
                                    />
                                </InputGroup>

                                <InputGroup className="mb-3">
                                    <span className="input-group-text"><BsPencilSquare /></span>
                                    <FormControl
                                        placeholder={Text.Subject[lang]}
                                        aria-label="subject"
                                        aria-describedby="subject"
                                        onInput={(e) => {
                                            setContactData({ ...contactData, subject: e.target.value });
                                        }}
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <span className="input-group-text"><MdEmail /></span>
                                    <FormControl onInput={(e) => {
                                        setContactData({ ...contactData, message: e.target.value });
                                    }} required={true} as="textarea" aria-label="Mensagem" placeholder={Text.Placeholder[lang]} style={{ width: (isSmallWindow ? window.innerWidth : '450px'), minHeight: '180px', maxHeight: '180px', height: '180px', resize: 'none' }} />
                                </InputGroup>

                                <Form.Check className="d-flex agree-policy">
                                    <div>
                                        <Form.Check.Input id="consent" required={true} type="checkbox" />
                                        <Form.Check.Label>{` ${Text.Consent[lang]} `}<a href={`${websiteUrl}/${lang}/privacy`}>{Text.PrivacyPolicy[lang]}</a>.</Form.Check.Label>
                                    </div>
                                    <Button variant={isSending ? "secondary" : "light"} disabled={isSending} className={isSending ? 'progress-bar-striped progress-bar-animated' : ''} type="submit">{`${Text.Send[lang]} `}<SiMinutemailer /></Button>
                                </Form.Check>
                            </Col>
                        </Row>
                    </Form>
                    <br />
                </Container>
            </Animated>
        </React.Fragment>
    );
}