export async function getServerSideProps({ res }) {
    res.setHeader('Content-Type', 'text/plain');
    if (process.env.ENVIRONMENT !== 'PROD') {
        res.write('User-agent: *\nDisallow: /');
    } else {
        res.write('User-agent: *\nAllow: /');
    }
    res.end();
    return { props: {} };
}

const RobotsTxt = () => null;

export default RobotsTxt;
