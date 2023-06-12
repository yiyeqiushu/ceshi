'use strict';
exports.main = async (event, context) => {
  const collection = uniCloud.database().collection('qieyi');
  
  let query;
  const search = event.search;
  if (search.type === '标题') {
    query = { title: new RegExp(search.text, 'i') };
  } else if (search.type === '作者') {
    query = { author: new RegExp(search.text, 'i') };
  } else {
    query = { content: new RegExp(search.text, 'i') };
  }

  // 显式地返回时间字段（timestamp）
  return await collection
    .field({title: true,author: true,content: true,timestamp: true,}).where(query).get();
};