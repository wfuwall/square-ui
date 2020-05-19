const Koa = require('koa')
const Router = require('@koa/router')
const multer = require('@koa/multer')

var cors = require('koa-cors')
const app = new Koa()
app.use(cors())
const router = new Router()
const upload = multer({
  dest: 'uploads/'
}) // note you can pass `multer` options here

// add a route for uploading multiple files
router.post(
  '/upload',
  upload.fields([{
    name: 'avatar', // 这里的名字1和下面的名字2和input传入的name名字必须是一样的，才能上传成功，暂时不知道为什么
    maxCount: 5
  }]),
  ctx => {
    console.log('ctx.request.files', ctx.request.files)
    console.log('ctx.files', ctx.files)
    console.log('ctx.request.body', ctx.request.body)
    console.log(ctx.request.files)
    const r = ctx.request.files.avatar.map(item => ({ // 这里的 avatar 名字2
      url: item.path,
      name: item.originalname
    }))
    ctx.body = r
  }
)

// add the router to our app
app.use(router.routes())
app.use(router.allowedMethods())

// start the server
app.listen(3000)
