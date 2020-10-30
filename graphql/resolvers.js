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
        const _quote = await Quote.findById(id);
        if (!_quote) {
            throw new Error('No quote found!');
        }
        _quote.quote = quote;
        _quote.author = author;
        const updatedQuote = await _quote.save();

        return {
            ...updatedQuote._doc,
            _id: updatedQuote._id.toString(),
        }

    },

    deleteQuote: async function ({ id }) {
        const _quote = await Quote.findById(id);
        if (!_quote) {
            throw new Error('No quote found!');
        }

        await _quote.deleteOne();

        return {
            ..._quote._doc,
            _id: _quote._id.toString(),
        }
    }
}