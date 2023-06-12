'use strict';
exports.main = async (event, context) => {
	const collection = uniCloud.database().collection('qieyi');
	const { id } = event;
	return await collection.doc(id).remove();
};