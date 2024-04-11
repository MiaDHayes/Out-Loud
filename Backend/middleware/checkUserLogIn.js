

const checkUserLogIn = (req, res, next) => {
    if (req.session.user || req.headers.authorization) {
        next()
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = checkUserLogIn