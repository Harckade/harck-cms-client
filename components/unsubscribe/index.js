import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Text as PrivacyText } from '../../consts/translations/privacy';
import { Text } from '../../consts/translations/unsubscribe';
import { Animated } from 'react-animated-css';
import { useSearchParams } from 'next/navigation';
import * as R from 'ramda';
import Subscriber from '../../consts/models/subscriber';
import { Loading } from '../common/loading';
import axios from 'axios';

export const Unsubscribe = ({ unsubscribeUrl, lang }) => {
    const searchParams = useSearchParams();
    const [token, setToken] = useState(undefined);
    const [subscriber, setSubscriber] = useState(undefined);
    const [waitConfirmation, setWaitConfirmation] = useState(true);
    const [unsubscribeSuccessfull, setUnsubscribeSuccessfull] = useState(false);

    async function sendUnsubscribe(subscriber) {
        await axios.post(unsubscribeUrl, subscriber)
            .then(() => {
                setUnsubscribeSuccessfull(true);
            }).catch((error) => {
                setUnsubscribeSuccessfull(false);
                console.log(error.statusText);
            });
        setWaitConfirmation(false);
    };

    useEffect(() => {
        let parameter = searchParams.get('token');
        if (R.isNil(token) && !R.isNil(parameter)) {
            try {
                setToken(searchParams.get('token'));
            } catch (error) {
                setWaitConfirmation(false);
                setUnsubscribeSuccessfull(false);
            }
        }
    }, [searchParams.get('token')]);

    useEffect(() => {
        if (typeof window !== "undefined" && !R.isNil(token) && token !== "") {
            try {
                let undecoded = window.atob(token);
                if (undecoded !== "") {

                    let tmpSubscriber = new Subscriber(JSON.parse(undecoded));
                    setSubscriber(tmpSubscriber);
                }
            } catch (error) {
                setWaitConfirmation(false);
                setUnsubscribeSuccessfull(false);
            }
        }
    }, [token]);

    useEffect(() => {
        if (!R.isNil(subscriber)) {
            sendUnsubscribe(subscriber);
        }
    }, [subscriber]);

    return (
        <>
            <Helmet>
                <title>{PrivacyText.Title[lang]}</title>
                <meta name="description" content={PrivacyText.TitleDescription[lang]} />
            </Helmet>
            <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>
                <Container fluid className='justify-content-md-center center-form'>
                    <Row className="g-2 justify-content-md-center">
                        <Col md="4">
                            <div>
                                {waitConfirmation ? <Alert key="info" variant="info" className='text-center'>
                                    {Text.HangOn[lang]}<br />
                                    <Loading />
                                </Alert> :
                                    <Alert key={unsubscribeSuccessfull ? "success" : "danger"} variant={unsubscribeSuccessfull ? "success" : "danger"} className='text-center'>
                                        {unsubscribeSuccessfull ? Text.Confirmed[lang] : Text.Unsuccess[lang]}<br />
                                        {unsubscribeSuccessfull ? Text.WereSad[lang] : ''}
                                    </Alert>
                                }
                            </div>
                        </Col>
                    </Row>
                    <br />
                </Container>
            </Animated>
        </>
    );
}