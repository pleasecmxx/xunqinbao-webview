

/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}


/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * 
 */
const timeoutFetch = (original_fetch: any, timeout = 60000) => {
  let timeoutBlock = () => { }
  let timeout_promise = new Promise((resolve, reject) => {
    timeoutBlock = () => {
      // 请求超时处理
      reject('请求超时');
    }
  })

  // Promise.race(iterable)方法返回一个promise
  // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
  let abortable_promise = Promise.race([
    original_fetch,
    timeout_promise
  ])

  setTimeout(() => {
    timeoutBlock()
  }, timeout)

  return abortable_promise
}

const BaseUrl = 'https://xqb.yuncshop.com'
/**
 * 基于fetch 的 POST 请求
 * @param url 请求的URL
 * @param params 请求参数
 * @returns {Promise}
 */
const postRequrst = (url: String, params: any) => {
  params.yzdl = 'test'
  console.log(params)
  console.log(JSON.stringify(params))
  let fetchUrl = BaseUrl + url
  return timeoutFetch(fetch(fetchUrl, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(params)
  })).then(response => {
    return response.json()
  }).then(response => {
    if (response && response.code === 1) {
      return response
    } else if (response && response.code === 101) {  //被顶号了
      alert('监测到您的账号在别处登录')
      // setTimeout(() => {
      //   reset('login')
      // }, 200)
    } else {
      // toast(res.msg);
      return response
    }
  }).catch(error => {
    alert(JSON.stringify(error))
  })
}


function GetQueryString(url: String) {
  var reg = new RegExp("(^|&)" + url + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

export {
  postRequrst,
  GetQueryString
}