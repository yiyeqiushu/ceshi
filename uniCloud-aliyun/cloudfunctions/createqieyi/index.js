'use strict';
exports.main = async (event, context) => {
    console.log(event);
    const collection = uniCloud.database().collection('qieyi');
    const { title, author, content, timestamp } = event;
    
    // 查询qieyi集合中的文档，按照id降序排列，取第一条
    const maxIdDoc = await collection.orderBy('id', 'desc').limit(1).get();
    
    let newId;

    // 检查是否查询到文档
    if (maxIdDoc.data.length === 0) {
      newId = 1;
    } else {
      newId = maxIdDoc.data[0].id + 1;
    }

    await collection.add({ id: newId, title, author, content, timestamp });
};