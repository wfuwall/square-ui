// 封装的 ajax 函数
export default function ajax (options) {
  const xhr = new XMLHttpRequest()
  const action = options.action // 请求地址
  const fd = new FormData() // 创建一个 FormData 对象
  fd.append(options.filename, options.file)
  // 异步发送 post 请求
  xhr.open('post', action, true)
  // xhr 失败
  xhr.onerror = function (err) {
    options.onError(err)
  }
  // xhr 成功
  xhr.onload = function () {
    const text = xhr.responseText || xhr.response
    console.log(text, 'text')
    options.onSuccess(text)
  }
  // 上传进度
  xhr.upload.onprogress = function (event) {
    if (event.total) {
      event.percent = event.loaded / event.total * 100
    }
    options.onProgress(event)
  }
  xhr.send(fd)
  return xhr
}
