const mongodburi = 'mongodb://productuser:products@ds147965.mlab.com:47965/productapp'
module.exports = {
    'database': mongodburi,
    'secret': 'this is a secret passphrase',
    'port': process.env.PORT || 3000
}
