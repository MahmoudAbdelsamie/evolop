const findEnvelopeById = (id, envelopes) => {
    return envelopes.find( envelope => envelope.id === id)
};

const findEnvelopeIndexById = (id, envelopes) => {
    return envelopes.findIndex( envelop => envelop.id === id)
}
 



module.exports = { findEnvelopeById, findEnvelopeIndexById }


