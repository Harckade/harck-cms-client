export default function handler(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.write('User-agent: *\nDisallow: /');
    res.end();
}