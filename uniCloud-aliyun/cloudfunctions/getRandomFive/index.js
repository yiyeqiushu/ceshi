'use strict';
exports.main = async (event, context) => {
  const db = uniCloud.database();
  const collection = db.collection("qieyi");

  const randomFiveDocs = await collection.aggregate()
    .sample({
      size: 5
    })
    .end();

  console.log("Random Five docs:", randomFiveDocs.data);

  return randomFiveDocs.data;
};