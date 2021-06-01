const Router=require('koa-router')
const router=new Router()
const getAccessToken=require('../untils/getAccessToken.js')

const rp=require('request-promise')
const { routes } = require('./getUsers.js')

let dates={}

let dateCount={}
let state={}

let dateU={}
let timeU={}
let teacherIdU={}

let timeMark=''
let timeTeacherCount=''
let teacherName=''
let addClassCheck=''

let time8_9Date=''
let time9_10Date=''
let time10_11Date=''
let time11_12Date=''
let time12_13Date=''
let time13_14Date=''
let time14_15Date=''
let time15_16Date=''
let time16_17Date=''
let time17_18Date=''
let time18_19Date=''
let time19_20Date=''


let oldDate=''
let oldTime=''
let oldClassType=''
let oldSetCount=''
let oldUseCount=''
//获得约课日期信息列表
router.get('/list',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    var options={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,

        body:{

            query:`db.collection('yuekev1').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    var array=[]
     await rp(options)
       .then((res)=>{
           console.log(res)
           
           for(var i=0;i<res.data.length;i++){

               array.push(JSON.parse(res.data[i]))

           }
       
           return array

          

          
       })
       .catch(function (err) {
           // POST failed...
       });

       ctx.body={
        array,
        code:20000
    }

})


//获得选择的日期
router.get('/getDate',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    const data=await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        dates=(JSON.parse(res.data)).date

        
        return JSON.parse(res.data)
    })

    ctx.body={
        data,
        code:20000
    }

})


//获得8:00---9：00时段教练员信息
router.get('/time8_9',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time8_9Date=(JSON.parse(res.data)).date
    })

    console.log(time8_9Date)


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time8_9Date}',time:'time8_9'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得9:00---10：00时段教练员信息
router.get('/time9_10',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time9_10Date=(JSON.parse(res.data)).date
    })

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time9_10Date}',time:'time9_10'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得10:00---11：00时段教练员信息
router.get('/time10_11',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time10_11Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time10_11Date}',time:'time10_11'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得11:00---12：00时段教练员信息
router.get('/time11_12',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time11_12Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time11_12Date}',time:'time11_12'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得12:00---13：00时段教练员信息
router.get('/time12_13',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time12_13Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time12_13Date}',time:'time12_13'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得13:00---14：00时段教练员信息
router.get('/time13_14',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time13_14Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time13_14Date}',time:'time13_14'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得14:00---15：00时段教练员信息
router.get('/time14_15',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time14_15Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time14_15Date}',time:'time14_15'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得15:00---16：00时段教练员信息
router.get('/time15_16',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time15_16Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time15_16Date}',time:'time15_16'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得16:00---17：00时段教练员信息
router.get('/time16_17',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time16_17Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time16_17Date}',time:'time16_17'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得17:00---18：00时段教练员信息
router.get('/time17_18',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time17_18Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time17_18Date}',time:'time17_18'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得18:00---19：00时段教练员信息
router.get('/time18_19',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time18_19Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time18_19Date}',time:'time18_19'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})


//获得19:00---20：00时段教练员信息
router.get('/time19_20',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(dates)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        time19_20Date=(JSON.parse(res.data)).date
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({date:'${time19_20Date}',time:'time19_20'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]

    await rp(options).then(res=>{
        console.log(res)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    })

    ctx.body={
        array,
        code:20000
    }

})

//获得某一个教练排课信息

router.get('/fetchById',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    const data=await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        oldDate=JSON.parse(res.data).date
        oldTime=JSON.parse(res.data).times
        oldClassType=JSON.parse(res.data).class_name
        oldSetCount=JSON.parse(res.data).io_1
        oldUseCount=JSON.parse(res.data).io_2

        console.log(oldDate)
        console.log(oldTime)
        console.log(oldClassType)

        return JSON.parse(res.data)
    })

    ctx.body={
        data,
        code:20000
    }


})

//获得教练排课后，已预约该教练的学员信息
router.get('/UserCourseList',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data))

        dateU=(JSON.parse(res.data)).date
        timeU=(JSON.parse(res.data)).time
        teacherIdU=JSON.parse(res.data).teacher_id
        teacherNameU=JSON.parse(res.data).teacher_name
    })


    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('course').where({teacher_id:'${teacherIdU}',date:'${dateU}',time:'${timeU}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    var array=[]
    await rp(options)
       .then((res)=>{
           console.log(res)
           
           for(var i=0;i<res.data.length;i++){

               array.push(JSON.parse(res.data[i]))

           }
       
           return array

          
       })
       .catch(function (err) {
           // POST failed...
       });


       ctx.body={
           array,
           code:20000
       }

})

router.get('/createDay',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var createtime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params = ctx.request.query
    console.log(params.date)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('yuekev1').where({date:'${params.date}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        dateCount=res.data.length
        console.log(res.data.length)
        
    })

    if(dateCount==0){
        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('yuekev1').add({
                    data:[{
                        create_time:'${createtime}',
                        date:'${params.date}',
                        io_1:'编辑',
                        io_2:'',
                        io_3:'',
                        update_time:'${createtime}',
                    }]
                })`,  

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        const da=await rp(options).then(res=>{
    
            console.log(res)

            state=res.errmsg
            console.log(state)
    
            return res
    
        })

    }else if(dateCount!=0){
        state=dateCount

    }

    ctx.body={
        state,
        code:20000

    }

})

router.post('/createClass',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var createtime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const params=ctx.request.body

    console.log(params)

    if(params.times=="8:00--9:00时段"){

        timeMark="time8_9"

    }else if(params.times=="9:00--10:00时段"){

        timeMark="time9_10"

    }else if(params.times=="10:00--11:00时段"){

        timeMark="time10_11"

    }else if(params.times=="11:00--12:00时段"){

        timeMark="time11_12"

    }else if(params.times=="12:00--13:00时段"){

        timeMark="time12_13"

    }else if(params.times=="13:00--14:00时段"){

        timeMark="time13_14"

    }else if(params.times=="14:00--15:00时段"){

        timeMark="time14_15"

    }else if(params.times=="15:00--16:00时段"){

        timeMark="time15_16"

    }else if(params.times=="16:00--17:00时段"){

        timeMark="time16_17"

    }else if(params.times=="17:00--18:00时段"){

        timeMark="time17_18"

    }else if(params.times=="18:00--19:00时段"){

        timeMark="time18_19"

    }else if(params.times=="19:00--20:00时段"){

        timeMark="time19_20"

    }

    console.log(timeMark)

    //通过id获得教练姓名
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('teacher').doc('${params.teacher}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(JSON.parse(res.data).name)

        teacherName=JSON.parse(res.data).name  
    })

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({teacher_id:'${params.teacher}',date:'${params.date}',time:'${timeMark}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        timeTeacherCount=res.data.length
        console.log(timeTeacherCount)
        
    })

    if(timeTeacherCount==0){

        const ACCESS_TOKEN=await getAccessToken()
        //创建一个课程
        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('userclass').add({
                    data:[{
                        class_name:'${params.class_name}',
                        count:'${params.userCount}',
                        create_time:'${createtime}',
                        date:'${params.date}',
                        io_1:'${params.userCount}',
                        io_2:0,
                        io_3:'',
                        teacher_id:'${params.teacher}',
                        time:'${timeMark}',
                        teacher_name:'${teacherName}',
                        times:'${params.times}'

                    }]
                })`,  

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        await rp(options).then(res=>{

            addClassCheck=res.errmsg
            console.log(res)
        })

    }else if(timeTeacherCount!=0){
        addClassCheck=timeTeacherCount

    }

    ctx.body={
        addClassCheck,
        code:20000

    }


})


//更新约课日期发布状态
router.get('/updateState',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(params)
    console.log(params.yekeId)
    console.log(params.state)

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body:{
            query:`db.collection('yuekev1').doc('${params.yekeId}').update({
                data:{
                    io_1:'${params.state}',  
                    update_time:'${updatetime}'                 
                }
            })`,

            env: 'tcbb-service-2gy2i43m2d84f05d',
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    const data= await rp(options).then(res=>{
        console.log(res)

        return res
    })

    ctx.body={
        data,
        code:20000
    }

})


//删除time8_9时段课程
router.get('/classDel',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params = ctx.request.query

    const dates=params.date
    const time=params.time
    const teacherId=params.teacher_id
    const _id=params._id

    let mark=''
    

    console.log(params)
    console.log(dates)
    console.log(time)
    console.log(teacherId)
    console.log(_id)

    //预先判断该教练员是否还有学员
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('course').where({date:'${dates}',time:'${time}',teacher_id:'${teacherId}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        mark=res.data.length
        console.log(res.data.length)
        
    })

    if(time8_9M==0){
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('userclass').doc('${_id}').remove()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res.deleted)
            mark=res.errmsg
        })

    }

    ctx.body={
        mark,
        code:20000

    }

})

//手动消课，判断旷课消课等
router.get('/userClassClose',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var createtime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    let child_name=''
    let classMark=''
    let dates=''
    let order=''
    let teacher_id=''
    let teacher_name=''
    let userMarkID=''
    let time_mark=''
    let times=''
    let buycourse_order=''
    let p_count=''

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    const _id=JSON.parse(params.data).id
    const marks=JSON.parse(params.data).mark

    console.log(params)

    console.log(_id)
    console.log(marks)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('course').doc('${_id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{

        console.log(res.data)

        child_name=(JSON.parse(res.data)).child_name
        classMark=(JSON.parse(res.data)).class_name
        dates=(JSON.parse(res.data)).date
        order=(JSON.parse(res.data)).order
        teacher_id=(JSON.parse(res.data)).teacher_id
        teacher_name=(JSON.parse(res.data)).teacher_name
        userMarkID=(JSON.parse(res.data)).user_id
        time_mark=(JSON.parse(res.data)).mark
        times=(JSON.parse(res.data)).time
        buycourse_order=(JSON.parse(res.data)).buycourse_order
        
        

        
    })

    //添加log记录
    console.log(child_name)
    console.log(classMark)
    console.log(dates)
    console.log(order)
    console.log(teacher_id)
    console.log(teacher_name)
    console.log(userMarkID)
    console.log(time_mark)
    console.log(times)
    console.log(buycourse_order)

    

    
    var options={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

        body:{
            query:`db.collection('yuekelog').add({
                data:[{
                    child_name:'${child_name}',
                    classMark:'${classMark}',
                    create:'${createtime}',
                    date:'${dates}',
                    order:'${order}',
                    state:'${marks}',
                    teacher_id:'${teacher_id}',
                    teacher_name:'${teacher_name}',
                    userMarkID:'${userMarkID}',
                    time:'${time_mark}',
                    times:'${times}',
                    buycourse_order:'${buycourse_order}',
                }]
            })`,  

            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    await rp(options).then(res=>{
        console.log(res)

    })


    //添加教练绩效
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('performance').where({teacher_id:'${teacher_id}',date:'${dates}',times:'${times}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(res)
        console.log(res.data.length)
        p_count=res.data.length
 
    })

    const dateV=Date.parse(createtime)
    console.log(dateV)

    if(p_count==0){
        //添加教练绩效
        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('performance').add({
                    data:[{
                        teacher_id:'${teacher_id}',
                        teacher_name:'${teacher_name}',
                        time:'${time_mark}',
                        times:'${times}',
                        classMark:'${classMark}',
                        create:'${createtime}',
                        date:'${dates}',
                        datev:'${dateV}',
                    }]
                })`,  

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        await rp(options).then(res=>{
            console.log(res)
              
        })

    }else if(p_count>0){
        //忽略不处理数据
    }


    //删除course里的记录
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('course').doc('${_id}').remove()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res.deleted)
        mark=res.deleted
    })


    ctx.body={
        mark,
        code:20000

    }

    

})


//排课时更换教练日期

router.get('/changeDate',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    console.log(params)
    console.log(params.teacher_name)
    console.log(params.date)
    console.log(params.time)
    console.log(params.teacher_id)
    console.log(params._id)

    console.log(oldDate)

    let count=''
    let mark=''
    var array=[]
    var course_id=''


    //判断该教练此日期和时间段是否有重复排课

    var options= {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        console.log(res.data.length)

        count=res.data.length

    })

    if(count>0){
        mark=-1
        console.log(mark)

    }else if(count==0){

        //更新已预约学员的日期

        var options= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${oldDate}',time:'${params.time}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)

            for(var i=0;i<res.data.length;i++){

                array.push(JSON.parse(res.data[i]))
    
            }
        })

        console.log(array)
        console.log(array.length)

        for(var i=0;i<array.length;i++){
            const course_id=array[i]._id
            console.log(course_id)

            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('course').doc('${course_id}').update({
                        data:{
                            date:'${params.date}',                       
                            create_time:'${updatetime}',
                        }
        
                    })`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };
    
            await rp(options).then(res=>{
                console.log(res)
                 
            })
        }



            //更新排课教练日期
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('userclass').doc('${params._id}').update({
                    data:{
                        date:'${params.date}',
                        create_time:'${updatetime}',
                    }
    
                })`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{

            mark=res.modified
            console.log(res)
        })


    }

    ctx.body={
        mark,
        code:20000
    }


})




//更换教练排课时间段
router.get('/changeTime',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    console.log(params)
    console.log(params.teacher_name)
    console.log(params.date)
    console.log(params.times)
    console.log(params.teacher_id)
    console.log(params._id)

    console.log(oldTime)

    let count=''
    let mark=''
    var array=[]
    var timemark=''

    var options= {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({teacher_name:'${params.teacher_name}',date:'${params.date}',times:'${params.times}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        console.log(res.data.length)

        count=res.data.length

    })

    if(count>0){
        mark=-1
        console.log(mark)

    }else if(count==0){

                //更新已预约学员的日期

                var options= {
                    method: 'POST',
                    uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
                  
                    body: {
                        query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',mark:'${oldTime}'}).get()`,
                        env: 'tcbb-service-2gy2i43m2d84f05d',
                        
                    },
            
                    json: true // Automatically stringifies the body to JSON
                };

                await rp(options).then(res=>{
                    console.log(res)
        
                    for(var i=0;i<res.data.length;i++){
        
                        array.push(JSON.parse(res.data[i]))
            
                    }
                })

                console.log(array)
                console.log(array.length)

                for(var i=0;i<array.length;i++){
                    const course_id=array[i]._id
                    console.log(course_id)

                    if(params.times=="8:00--9:00时段"){
                        timemark="time8_9"
                    }else if(params.times=="9:00--10:00时段"){
                        timemark="time9_10"
                    }else if(params.times=="10:00--11:00时段"){
                        timemark="time10_11"
                    }else if(params.times=="11:00--12:00时段"){
                        timemark="time11_12"
                    }else if(params.times=="12:00--13:00时段"){
                        timemark="time12_13"
                    }else if(params.times=="13:00--14:00时段"){
                        timemark="time13_14"
                    }else if(params.times=="14:00--15:00时段"){
                        timemark="time14_15"
                    }else if(params.times=="15:00--16:00时段"){
                        timemark="time15_16"
                    }else if(params.times=="16:00--17:00时段"){
                        timemark="time16_17"
                    }else if(params.times=="17:00--18:00时段"){
                        timemark="time17_18"
                    }else if(params.times=="18:00--19:00时段"){
                        timemark="time18_19"
                    }else if(params.times=="19:00--20:00时段"){
                        timemark="time19_20"

                    }

                    var options = {
                        method: 'POST',
                        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                      
                        body: {
                            query:`db.collection('course').doc('${course_id}').update({
                                data:{
                                    time:'${timemark}',                       
                                    mark:'${params.times}',
                                    create_time:'${updatetime}',
                                }
                
                            })`,
                            env: 'tcbb-service-2gy2i43m2d84f05d',
                            
                        },
                
                        json: true // Automatically stringifies the body to JSON
                    };

                    await rp(options).then(res=>{
                        console.log(res)
                         
                    })
            
                }


                //更新排课教练日期
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('userclass').doc('${params._id}').update({
                    data:{
                        time:'${timemark}',                       
                        times:'${params.times}',
                        create_time:'${updatetime}',
                    }
    
                })`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };


        await rp(options).then(res=>{

            mark=res.modified
            console.log(res)
        })


    }


    ctx.body={
        mark,
        code:20000
    }

})


//更换教练课程类型
router.get('/changeClassType',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    console.log(params)
    console.log(params.class_name)

    let mark=''
    var array=[]
    
    const classType=params.class_name
    const useClass=params.io_2

    if(classType=="四到六人班"){

        if(parseInt(useClass)>=6){
            mark=-1

        }else if(parseInt(useClass)<6){
            //可以更改课程类型，修改约课信息，修改教练排课信息
            var options= {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
    
                for(var i=0;i<res.data.length;i++){
    
                    array.push(JSON.parse(res.data[i]))
        
                }
            })

            console.log(array)
            console.log(array.length)

            for(var i=0;i<array.length;i++){
                const course_id=array[i]._id
                console.log(course_id)

                var options = {
                    method: 'POST',
                    uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                  
                    body: {
                        query:`db.collection('course').doc('${course_id}').update({
                            data:{
                                class_name:'${params.class_name}',                       
                                create_time:'${updatetime}',
                            }
            
                        })`,
                        env: 'tcbb-service-2gy2i43m2d84f05d',
                        
                    },
            
                    json: true // Automatically stringifies the body to JSON
                };

                await rp(options).then(res=>{
                    console.log(res)
                     
                })
            }

            const value=parseInt(6)-parseInt(useClass)
            //更改教练员信息
            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('userclass').doc('${params._id}').update({
                        data:{
                            io_1:'6',
                            count:'${value}',
                            class_name:'${params.class_name}',                       
                            create_time:'${updatetime}',
                        }
        
                    })`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{

                mark=res.modified
                console.log(res)
            })

        }

        ctx.body={
            mark,
            code:20000
        }


    }else if(classType=="一对三人班"){

        if(parseInt(useClass)>3){
            mark=-1

        }else if(parseInt(useClass)<=3){
                        //可以更改课程类型，修改约课信息，修改教练排课信息
                        var options= {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
                            console.log(res)
                
                            for(var i=0;i<res.data.length;i++){
                
                                array.push(JSON.parse(res.data[i]))
                    
                            }
                        })
            
                        console.log(array)
                        console.log(array.length)
            
                        for(var i=0;i<array.length;i++){
                            const course_id=array[i]._id
                            console.log(course_id)
            
                            var options = {
                                method: 'POST',
                                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                              
                                body: {
                                    query:`db.collection('course').doc('${course_id}').update({
                                        data:{
                                            class_name:'${params.class_name}',                       
                                            create_time:'${updatetime}',
                                        }
                        
                                    })`,
                                    env: 'tcbb-service-2gy2i43m2d84f05d',
                                    
                                },
                        
                                json: true // Automatically stringifies the body to JSON
                            };
            
                            await rp(options).then(res=>{
                                console.log(res)
                                 
                            })
                        }

                        const value=parseInt(3)-parseInt(useClass)
            
                        //更改教练员信息
                        var options = {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('userclass').doc('${params._id}').update({
                                    data:{
                                        io_1:'3',
                                        count:'${value}',
                                        class_name:'${params.class_name}',                       
                                        create_time:'${updatetime}',
                                    }
                    
                                })`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
            
                            mark=res.modified
                            console.log(res)
                        })

        }
        ctx.body={
            mark,
            code:20000
        }

    }else if(classType=="一对二人班"){

        if(parseInt(useClass)>2){
            mark=-1

        }else if(parseInt(useClass)<=2){

                        //可以更改课程类型，修改约课信息，修改教练排课信息
                        var options= {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
                            console.log(res)
                
                            for(var i=0;i<res.data.length;i++){
                
                                array.push(JSON.parse(res.data[i]))
                    
                            }
                        })
            
                        console.log(array)
                        console.log(array.length)
            
                        for(var i=0;i<array.length;i++){
                            const course_id=array[i]._id
                            console.log(course_id)
            
                            var options = {
                                method: 'POST',
                                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                              
                                body: {
                                    query:`db.collection('course').doc('${course_id}').update({
                                        data:{
                                            class_name:'${params.class_name}',                       
                                            create_time:'${updatetime}',
                                        }
                        
                                    })`,
                                    env: 'tcbb-service-2gy2i43m2d84f05d',
                                    
                                },
                        
                                json: true // Automatically stringifies the body to JSON
                            };
            
                            await rp(options).then(res=>{
                                console.log(res)
                                 
                            })
                        }
            
                        const value=parseInt(2)-parseInt(useClass)
                        //更改教练员信息
                        var options = {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('userclass').doc('${params._id}').update({
                                    data:{
                                        io_1:'2',
                                        count:'${value}',
                                        class_name:'${params.class_name}',                       
                                        create_time:'${updatetime}',
                                    }
                    
                                })`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
            
                            mark=res.modified
                            console.log(res)
                        })

        }

        ctx.body={
            mark,
            code:20000
        }

    }else if(classType=="一对一人班"){

        if(parseInt(useClass)>1){
            mark=-1

        }else if(parseInt(useClass)<=1){

                        //可以更改课程类型，修改约课信息，修改教练排课信息
                        var options= {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
                            console.log(res)
                
                            for(var i=0;i<res.data.length;i++){
                
                                array.push(JSON.parse(res.data[i]))
                    
                            }
                        })
            
                        console.log(array)
                        console.log(array.length)
            
                        for(var i=0;i<array.length;i++){
                            const course_id=array[i]._id
                            console.log(course_id)
            
                            var options = {
                                method: 'POST',
                                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                              
                                body: {
                                    query:`db.collection('course').doc('${course_id}').update({
                                        data:{
                                            class_name:'${params.class_name}',                       
                                            create_time:'${updatetime}',
                                        }
                        
                                    })`,
                                    env: 'tcbb-service-2gy2i43m2d84f05d',
                                    
                                },
                        
                                json: true // Automatically stringifies the body to JSON
                            };
            
                            await rp(options).then(res=>{
                                console.log(res)
                                 
                            })
                        }
            
                        const value=parseInt(1)-parseInt(useClass)
                        //更改教练员信息
                        var options = {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('userclass').doc('${params._id}').update({
                                    data:{
                                        io_1:'1',
                                        count:'${value}',
                                        class_name:'${params.class_name}',                       
                                        create_time:'${updatetime}',
                                    }
                    
                                })`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
            
                            mark=res.modified
                            console.log(res)
                        })

        }

        ctx.body={
            mark,
            code:20000
        }

        

    }

})


//更换设定人数
router.get('/changeUserCount',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    console.log(params)

    let mark=''
    var array=[]
    
    const classType=params.class_name
    const useClass=params.io_2
    const setingCount=params.io_1

    if(classType=="四到六人班"){

        if((parseInt(setingCount)>=useClass)&&(parseInt(setingCount)<=6)){
            //满足后修改course的课时并且计算出剩余有效课时

            var options= {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
    
                for(var i=0;i<res.data.length;i++){
    
                    array.push(JSON.parse(res.data[i]))
        
                }
            })

            console.log(array)
            console.log(array.length)

            for(var i=0;i<array.length;i++){
                const course_id=array[i]._id
                console.log(course_id)

                var options = {
                    method: 'POST',
                    uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                  
                    body: {
                        query:`db.collection('course').doc('${course_id}').update({
                            data:{
                                class_name:'${params.class_name}',                       
                                create_time:'${updatetime}',
                            }
            
                        })`,
                        env: 'tcbb-service-2gy2i43m2d84f05d',
                        
                    },
            
                    json: true // Automatically stringifies the body to JSON
                };

                await rp(options).then(res=>{
                    console.log(res)
                     
                })
            }

            const value=parseInt(setingCount)-parseInt(useClass)
            //更改教练员信息
            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('userclass').doc('${params._id}').update({
                        data:{
                            class_name:'${params.class_name}',
                            io_1:'${setingCount}',
                            count:'${value}',                                            
                            create_time:'${updatetime}',
                        }
        
                    })`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{

                mark=res.modified
                console.log(res)
            })
        }else{
            mark=-1
        }

        ctx.body={
            mark,
            code:20000
        }

    }else if(classType=="一对三人班"){

        if((parseInt(setingCount)>=useClass)&&(parseInt(setingCount)<=3)){

                        //满足后修改course的课时并且计算出剩余有效课时

                        var options= {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
                            console.log(res)
                
                            for(var i=0;i<res.data.length;i++){
                
                                array.push(JSON.parse(res.data[i]))
                    
                            }
                        })
            
                        console.log(array)
                        console.log(array.length)
            
                        for(var i=0;i<array.length;i++){
                            const course_id=array[i]._id
                            console.log(course_id)
            
                            var options = {
                                method: 'POST',
                                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                              
                                body: {
                                    query:`db.collection('course').doc('${course_id}').update({
                                        data:{
                                            class_name:'${params.class_name}',                       
                                            create_time:'${updatetime}',
                                        }
                        
                                    })`,
                                    env: 'tcbb-service-2gy2i43m2d84f05d',
                                    
                                },
                        
                                json: true // Automatically stringifies the body to JSON
                            };
            
                            await rp(options).then(res=>{
                                console.log(res)
                                 
                            })
                        }
            
                        const value=parseInt(setingCount)-parseInt(useClass)
                        //更改教练员信息
                        var options = {
                            method: 'POST',
                            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                          
                            body: {
                                query:`db.collection('userclass').doc('${params._id}').update({
                                    data:{
                                        class_name:'${params.class_name}',
                                        io_1:'${setingCount}',
                                        count:'${value}',                                            
                                        create_time:'${updatetime}',
                                    }
                    
                                })`,
                                env: 'tcbb-service-2gy2i43m2d84f05d',
                                
                            },
                    
                            json: true // Automatically stringifies the body to JSON
                        };
            
                        await rp(options).then(res=>{
            
                            mark=res.modified
                            console.log(res)
                        })

        }else{
            mark=-1
        }

        ctx.body={
            mark,
            code:20000
        }

    }else if(classType=="一对二人班"){

        if((parseInt(setingCount)>=useClass)&&(parseInt(setingCount)<=2)){

            var options= {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
    
                for(var i=0;i<res.data.length;i++){
    
                    array.push(JSON.parse(res.data[i]))
        
                }
            })

            console.log(array)
            console.log(array.length)

            for(var i=0;i<array.length;i++){
                const course_id=array[i]._id
                console.log(course_id)

                var options = {
                    method: 'POST',
                    uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
                  
                    body: {
                        query:`db.collection('course').doc('${course_id}').update({
                            data:{
                                class_name:'${params.class_name}',                       
                                create_time:'${updatetime}',
                            }
            
                        })`,
                        env: 'tcbb-service-2gy2i43m2d84f05d',
                        
                    },
            
                    json: true // Automatically stringifies the body to JSON
                };

                await rp(options).then(res=>{
                    console.log(res)
                     
                })
            }

            const value=parseInt(setingCount)-parseInt(useClass)
            //更改教练员信息
            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('userclass').doc('${params._id}').update({
                        data:{
                            class_name:'${params.class_name}',
                            io_1:'${setingCount}',
                            count:'${value}',                                            
                            create_time:'${updatetime}',
                        }
        
                    })`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{

                mark=res.modified
                console.log(res)
            })
            

        }else{
            mark=-1
        }

        ctx.body={
            mark,
            code:20000
        }

    }else if(classType=="一对一人班"){

    if((parseInt(setingCount)>=useClass)&&(parseInt(setingCount)<=2)){

        var options= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('course').where({teacher_name:'${params.teacher_name}',date:'${params.date}',time:'${params.time}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)

            for(var i=0;i<res.data.length;i++){

                array.push(JSON.parse(res.data[i]))
    
            }
        })

        console.log(array)
        console.log(array.length)

        for(var i=0;i<array.length;i++){
            const course_id=array[i]._id
            console.log(course_id)

            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('course').doc('${course_id}').update({
                        data:{
                            
                            class_name:'${params.class_name}',                       
                            create_time:'${updatetime}',
                        }
        
                    })`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
                 
            })
        }

        const value=parseInt(setingCount)-parseInt(useClass)
        //更改教练员信息
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('userclass').doc('${params._id}').update({
                    data:{
                        class_name:'${params.class_name}',
                        io_1:'${setingCount}',
                        count:'${value}',                                            
                        create_time:'${updatetime}',
                    }
    
                })`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{

            mark=res.modified
            console.log(res)
        })

    }else{
        mark=-1
    }

    ctx.body={
        mark,
        code:20000
    }

    }

})


//删除排课日期
router.get('/delDate',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    const _id=JSON.parse(params.data)._id
    const date=JSON.parse(params.data).date

    console.log(_id)
    console.log(date)

    let count=''
    let mark=''

        //预先判断该教练员是否还有学员
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('course').where({date:'${date}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)
            count=res.data.length
            console.log(count)
            
        })


        if(count>0){
            mark=-1

        }else if(count==0){

            var options = {
                method: 'POST',
                uri: `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('yuekev1').doc('${_id}').remove()`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
                mark=res.deleted
                console.log(mark)
            })


        }

        ctx.body={
            mark,
            code:20000
 
        }

})

router.get('/classBack',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var createtime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    let child_name=''
    let classMark=''
    let dates=''
    let order=''
    let teacher_id=''
    let teacher_name=''
    let userMarkID=''
    let time_mark=''
    let times=''
    let buycourse_order=''
    let p_count=''

    let surplusI=''
    let buycourseId=''
    let userId=''
    let user_id=''
    let classI=''
    let userclass_id=''
    let userclassCount=''
    let userclassIO2=''
    let mark=''

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    const courseId=JSON.parse(params.data).id

    console.log(ACCESS_TOKEN)
    console.log(params)
    console.log(courseId)

    //通过course获得相关数据

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('course').doc('${courseId}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{

        console.log(res.data)

        child_name=(JSON.parse(res.data)).child_name
        classMark=(JSON.parse(res.data)).class_name
        dates=(JSON.parse(res.data)).date
        order=(JSON.parse(res.data)).order
        teacher_id=(JSON.parse(res.data)).teacher_id
        teacher_name=(JSON.parse(res.data)).teacher_name
        userMarkID=(JSON.parse(res.data)).user_id
        time_mark=(JSON.parse(res.data)).mark
        times=(JSON.parse(res.data)).time
        buycourse_order=(JSON.parse(res.data)).buycourse_order
     
    })

    console.log(buycourse_order)

    //获得充值课程数据，数据更新
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('buycourse').where({order:'${buycourse_order}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(res)

        surplusI=JSON.parse(res.data).surplus
        buycourseId=JSON.parse(res.data)._id
        userId=JSON.parse(res.data).userid
        //dates=JSON.parse(res.data).date
        //times=JSON.parse(res.data).time
        //teacher_id=JSON.parse(res.data).teacher_id

        console.log(surplusI)
        
    })

    const newSurplus=parseInt(surplusI)+1

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('buycourse').doc('${buycourseId}').update({
                data:{
                    surplus:'${newSurplus}',                       
                    create_time:'${createtime}',
                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
         
    })


    //该用户总课时更改,并修改

    var options= {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').where({io_2:'${userId}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };
    
    await rp(options).then(res=>{
        console.log(res)
        user_id=JSON.parse(res.data)._id
        classI=JSON.parse(res.data).class
    })

    const newClass=parseInt(classI)+1

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').doc('${user_id}').update({
                data:{
                    class:'${newClass}',                       
                    update_time:'${createtime}',
                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
         
    })

    console.log(teacher_id)
    console.log(dates)
    console.log(times)


    //教练排课课程数修改
    var options= {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').where({teacher_id:'${teacher_id}',date:'${dates}',time:'${times}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };
    await rp(options).then(res=>{
        console.log(res)

        userclass_id=JSON.parse(res.data)._id
        userclassCount=JSON.parse(res.data).count
        userclassIO2=JSON.parse(res.data).io_2
    })

    const nowCount=parseInt(userclassCount)+1
    const nowIO_2=parseInt(userclassIO2)-1

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('userclass').doc('${userclass_id}').update({
                data:{
                    count:'${nowCount}',
                    io_2:'${nowIO_2}',
                    create_time:'${createtime}',
                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };


    //添加log记录

    var options={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

        body:{
            query:`db.collection('yuekelog').add({
                data:[{
                    child_name:'${child_name}',
                    classMark:'${classMark}',
                    create:'${createtime}',
                    date:'${dates}',
                    order:'${order}',
                    state:'课时退回',
                    teacher_id:'${teacher_id}',
                    teacher_name:'${teacher_name}',
                    userMarkID:'${userMarkID}',
                    time:'${time_mark}',
                    times:'${times}',
                    buycourse_order:'${buycourse_order}',
                }]
            })`,  

            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    await rp(options).then(res=>{
        console.log(res)

    })

    //删除约课
        //删除course里的记录
        var options = {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('course').doc('${courseId}').remove()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res.deleted)
            mark=res.deleted
        })

        ctx.body={
            mark,
            code:20000
    
        }


})



module.exports=router