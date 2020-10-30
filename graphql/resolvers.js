const Quote = require('../models/quote');

module.exports = {
    quotes: async function () {
        const quotes = await Quote.find();
        return {
            quotes: quotes.map((q) => {
                return {
                    ...q._doc,
                    _id: q._id.toString()
                }
            })
        }
    },
    createQuote: async function ({ quoteInput: { quote, author } }) {
        const quoteData = new Quote({
            quote,
            author
        });

        const createdQuote = await quoteData.save();
        return {
            ...createdQuote._doc,
            _id: createdQuote._id.toString(),
        }
    },

    updateQuote: async function ({ id, quoteInput: { quote, author } }) {
        const quoteFind = await Quote.findById(id);
        if (!quoteFind) {
            throw new Error('No quote found!');
        }
        quote.quote = quote;
        quote.author = author;
        const updatedQuote = await quoteFind.save();

        return {
            ...updatedQuote._doc,
            _id: updatedQuote._id.toString(),
        }
    }
}