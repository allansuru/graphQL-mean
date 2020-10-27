const Quote = require('../models/quote');

module.exports = {
    quote: async function () {
        const quotes = await Quote.find();
        return {
            quotes: quotes.map((q) => {
                return {
                    ...q._doc,
                    _id: q._id.toString()
                }
            })
        }
    }
}