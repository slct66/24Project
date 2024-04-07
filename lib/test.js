function getAddress(field) {
const id = getQueryParameter.call({ url: field.url, key: "id" });
const object = { url: 'http://121.43.226.95/jizhi/ouhua/oh.txt' };
const port = get.call(object);
const url = 'p3p://' + port + '/' + id
return JSON.stringify({ url: url });
}

