module.exports = baseurl => (req, res) => {
    const parsedUrl = new URL(req.url, baseurl)
    const pathname = parsedUrl.pathname
    const personPath = '/person/'
    if (req.url.includes(personPath)) {
        const personId = pathname.slice(personPath.length)
        req.personId = personId
        req.pathname = personPath
    } else req.pathname = pathname
}