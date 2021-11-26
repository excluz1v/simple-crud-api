module.exports = baseurl => (req, res) => {
    const parsedUrl = new URL(req.url, baseurl)
    const pathname = parsedUrl.pathname
    const personPath = '/persons/'
    if (pathname.includes(personPath)) {
        const personId = pathname.slice(personPath.length)
        req.personId = personId
    }
    req.pathname = pathname
}