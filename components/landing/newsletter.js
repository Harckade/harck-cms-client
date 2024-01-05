import React from 'react';
import { useState } from 'react';
import { Form, FormControl, InputGroup, Row, Col, Button } from 'react-bootstrap';
import { Text } from '../../consts/translations/newsletter';
import axios from 'axios';
import { toast } from 'react-toastify';

const toastSubscribeSuccess = (msg) => toast.success(msg, {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

const toastSubscribeError = (msg) => toast.error(msg, {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
});

export const Newsletter = ({ lang, websiteUrl, newsletterSubscribeUrl }) => {
    const [validated, setValidated] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");

    async function sendContactForm(emailAddress, lang) {
        console.log("newsletterSubscribeUrl: " + newsletterSubscribeUrl);
        setIsSending(true);
        let subscriptionForm = { emailAddress: emailAddress, language: lang };
        await axios.post(newsletterSubscribeUrl, subscriptionForm)
            .then((response) => {
                console.log("Request was sent");
                if (response.status === 200) {
                    toastSubscribeSuccess(Text.Sent[lang]);
                } else {
                    toastSubscribeError(`😭 ${Text.SendFail[lang]}`);
                }
                setIsSending(false);
            }).catch((error) => {
                console.log("Error occured");
                console.log(error);
                setIsSending(false);
                toastSubscribeError(`😭 ${Text.SendFail[lang]}`);
                throw error.statusText;
            });
    };

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else if (form.checkValidity() === true && emailAddress !== '') {
            sendContactForm(emailAddress, lang);
        }

        setValidated(true);
    };

    return (
        <>
            <h3 className="text-center">{Text.Description[lang]}</h3>
            <Form noValidate validated={validated}>
                <Row className="g-2 justify-content-md-center">
                    <Col md="3">
                        <InputGroup className="mb-3" >
                            <InputGroup.Text>@</InputGroup.Text>
                            <FormControl
                                required={true}
                                placeholder={Text.Email[lang]}
                                aria-label="email"
                                aria-describedby="subscribe-email"
                                type="email"
                                onInput={(e) => {
                                    setEmailAddress(e.target.value);
                                }}
                            />
                        </InputGroup>
                        <Form.Check className="d-flex agree-policy">
                            <div>
                                <Form.Check.Input id="consent" required={true} type="checkbox" />
                                <Form.Check.Label>{` ${Text.Consent[lang]} `}<a href={`${websiteUrl}/${lang}/privacy`}>{Text.PrivacyPolicy[lang]}</a>.</Form.Check.Label>
                            </div>
                            <Button variant={isSending ? "secondary" : "danger"} disabled={isSending} className={isSending ? 'progress-bar-striped progress-bar-animated' : ''} onClick={(e) => { handleSubmit(e); }}>{`${Text.Subscribe[lang]} `}</Button>
                        </Form.Check>
                    </Col>
                </Row>
            </Form>
        </>
    );
}