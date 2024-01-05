import { Helmet } from "react-helmet";
import { Text } from "../../consts/translations/about";
import { Animated } from "react-animated-css";

export const About = ({lang}) => {

    return (
        <div>
            <Helmet>
                <title>{Text.Title[lang]}</title>
                <meta name="description" content={Text.TitleDescription[lang]} />
            </Helmet>
            <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>
                <div className='text-center'>
                    <h1>{Text.Title[lang]}</h1>
                    <br />
                    <img src="/logo_cms_3d.svg" className="about-logo" alt="harckade cms logo"/>
                    <h4>{Text.TitleDescription[lang]}</h4>
                    <p>{Text.License[lang]}</p>

                    <p>{Text.Copyright[lang]}</p>
                </div>
                <div className='text-margins'>
                    <p>{Text.Par1[lang]}</p>
                    <p>{Text.Par2[lang]}</p>
                    <p>{Text.Par3[lang]}</p>
                </div>
            </Animated>
        </div>
    );
}