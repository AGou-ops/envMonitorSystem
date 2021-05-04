const fetch = require('node-fetch');
const util = require('util')
const fs = require('fs')
const streamPipeline = util.promisify(require('stream').pipeline)

async function download () {
  const response = await fetch("http://typhoon.zjwater.gov.cn/Api/TyphoonInfo/202102?callback=jQuery18306516087624672682_1618832805570&_=1618832806343", {
"headers": {
"accept": "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01",
"accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,hy;q=0.6,zh-TW;q=0.5",
"cache-control": "no-cache",
"pragma": "no-cache",
"x-requested-with": "XMLHttpRequest",
"cookie": "acw_tc=76b20ffc16188327615663841e0aa32f6365e42fa3a8a232c896da7315ea19; SERVERID=45bc7a02595016f900fa47b483257f17|1618832806|1618832761"
},
"referrer": "http://typhoon.zjwater.gov.cn/",
"referrerPolicy": "origin",
"body": null,
"method": "GET",
"mode": "cors"
})
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
  await streamPipeline(response.body, fs.createWriteStream('./test.json'))
}
download()
