const Koa=require('koa')
const Router=require('koa-router')
const cors=require('koa2-cors')
const koaBody=require('koa-body')

const app=new Koa()
const router=new Router()

//跨域问题
app.use(cors({
    origin:['http://localhost:9528'],
    credentials:true
}))

//接受post参数
app.use(koaBody({
    multipart:true,
}))

const userList=require('./controller/getUsers.js')
const teacherList=require('./controller/getTeachers.js')
const yuekeList=require('./controller/getYueke.js')
const login=require('./controller/getLogin.js')
const swiper=require('./controller/swiper.js')

router.use('/userlist',userList.routes())
router.use('/createUse',userList.routes())

router.use('/teacherList',teacherList.routes())
router.use('/yuekeList',yuekeList.routes())

router.use('/login',login.routes())

router.use('/swiper',swiper.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx)=>{
    ctx.body='hello world'
})

app.listen(3000,()=>{
    console.log('服务开启在3000')
})