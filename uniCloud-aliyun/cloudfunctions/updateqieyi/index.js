'use strict';
exports.main = async (event, context) => {
    const collection = uniCloud.database().collection('qieyi');
    const { id, title, author, content, timestamp } = event;
    return await collection.doc(id).update({ title, author, content, timestamp });
};