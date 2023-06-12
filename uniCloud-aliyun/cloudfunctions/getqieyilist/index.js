'use strict';
exports.main = async (event, context) => {
	const collection = uniCloud.database().collection('qieyi');
	return await collection.get();
};