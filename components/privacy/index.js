import React from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Text } from '../../consts/translations/privacy';
import { Animated } from 'react-animated-css';

export const Privacy = ({ lang, privacyEmailAddress }) => {

    return (
        <>
            <Helmet>
                <title>{Text.Title[lang]}</title>
                <meta name="description" content={Text.TitleDescription[lang]} />
            </Helmet>
            <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>

                <div className="post-content">
                    <div className="post-inner">
                    <h1 style={{ textAlign: 'center' }}>{Text.Title[lang]}</h1>
                    <h6 style={{ textAlign: 'center' }}>{Text.IValueYouPrivacy[lang]}</h6>
                    <br />
                    <h3 style={{ textAlign: 'center' }}>{Text.GdprTitle[lang]}</h3>
                    <p>
                        {Text.AboutGdpr[lang]}<br />
                        {Text.MoreInfoGDPR[lang]} <a href={`https://eur-lex.europa.eu/legal-content/${lang.toUpperCase()}/TXT/?uri=CELEX%3A32016R0679`}>{`https://eur-lex.europa.eu/legal-content/${lang.toUpperCase()}/TXT/?uri=CELEX%3A32016R0679`}</a>
                    </p>

                    <br/>
                    <h3 style={{ textAlign: 'center' }}>{Text.Reason[lang]}</h3>
                    <p>
                        {Text.WhyNeedCookies[lang]}<br />
                        {Text.AdditionalCookie[lang]}
                    </p>
                    <p>{Text.WhyNeedCookies2[lang]}</p>
                    <p>{Text.FindOutMore[lang]}<a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a> & <a href="https://policies.google.com/technologies/cookies">https://policies.google.com/technologies/cookies</a></p>
                   
                    <br/>
                    <h3 style={{ textAlign: 'center' }}>{Text.ReachMeOut[lang]}</h3>
                    <p>{Text.ContactForm[lang]}</p>
                    <p>{Text.EmailProcess[lang]}</p>
                    <p>{Text.RetentionPeriod[lang]}</p>
                    <p>{Text.DeleteMyContact[lang]}</p>

                    <br />
                    <h3 style={{ textAlign: 'center' }}>{Text.YourRights[lang]}</h3>
                    <p>{Text.MoreInfo[lang]} <a href={`mailto:${privacyEmailAddress}`}>{privacyEmailAddress}</a></p>
                </div>
                <br/>
                <div className='text-center'>
                    <h3>{Text.ToDefault[lang]}</h3>
                    <Button variant='outline-dark' onClick={() => {
                        function deleteCookie(cookiename) {
                            var d = new Date();
                            d.setDate(d.getDate() - 1);
                            var expires = ";expires=" + d;
                            var name = cookiename;
                            var value = "";
                            document.cookie = name + "=" + value + expires + "; path=/acc/html";
                        }
                        var cookies = document.cookie.split(";");
                        if (cookies.length > 0) {
                            for (var i = 0; i < cookies.length; i++) {
                                var spcook = cookies[i].split("=");
                                console.log('cookies: ' + spcook[0]);
                                document.cookie = spcook[0] + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                            }
                            setTimeout(() => {
                                window.location.reload();
                            }, 100);
                        }
                    }}>{Text.CookiesReset[lang]}</Button><br />
                    <span style={{ fontSize: '10px' }}>{Text.ResetDisclaimer[lang]}</span>
                    </div>
                </div>
            </Animated>
        </>
    );
}