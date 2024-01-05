import CookieConsent from "react-cookie-consent";
import Link from 'next/link';
import { Text } from "../../consts/translations/cookieBar";

export const CookieBar = ({lang}) => {
    return (
        <CookieConsent enableDeclineButton style={{ paddingTop: '50px' }} location="top" declineButtonText={Text.Decline[lang]} buttonText={Text.Accept[lang]}
            onAccept={() => { window.location.reload(); }} declineButtonStyle={{ background: 'none', fontSize: '12px' }} buttonStyle={{ color: 'white', background: "#2A9D8F" }}>

            {Text.CookieMessage[lang]} <Link style={{ fontSize: '12px' }} href={`/${lang}/privacy`}>{Text.PrivacyPolicy[lang]}</Link>
        </CookieConsent>
    )
}