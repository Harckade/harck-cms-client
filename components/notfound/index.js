import { Helmet } from "react-helmet";
import { Text } from "../../consts/translations/notfound";
import { Animated } from "react-animated-css";

export const NotFound = ({ lang }) => {
    return (
        <div className="text-center">
            <Helmet>
                <title>{Text.Title[lang]}</title>
                <meta name="description" content={Text.TitleDescription[lang]} />
            </Helmet>
            <Animated animationIn="fadeIn" isVisible={true} animationInDuration={2000}>
                <div>
                    <h2>{Text.NotFound[lang]}</h2>
                </div>
            </Animated>
        </div>
    )
}