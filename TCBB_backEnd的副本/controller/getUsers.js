const Router=require('koa-router')
const router=new Router()
const getAccessToken=require('../untils/getAccessToken.js')

const rp=require('request-promise')




//get 获取所有学员信息
router.get('/list',async(ctx,next)=>{
    //查询用户列表
    
    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    console.log(params)
    console.log(params.start)
    console.log(params.count)

    

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').skip(${parseInt(params.start)}).limit(${parseInt(params.count)}).get()`,
            //query:`db.collection('users').skip(10).limit(10).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };
    
    var array=[]
     const data= await rp(options)
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


let datas={}
let count={}
let state={}
let state1={}
let buycourseMarkId={}
let updateUsercClass={}
let errorClass={}
let userIdI={}

let userIds=''
let buyClassSurplus=''
let errmsg=''
let classI=''
let classV=''
let _ID=''
let io_2I=''
let state2=''

router.get('/del',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    console.log(ACCESS_TOKEN)

    const params=ctx.request.query

    const classCount=JSON.parse(params.data).class
    const _id=JSON.parse(params.data)._id
    const userid=JSON.parse(params.data).io_2
    console.log(params)
    console.log(classCount)
    console.log(userid)

    let mark=''
    let array=[]
    let array2=[]

    if(parseInt(classCount)>0){
        mark=-1

    }else if(parseInt(classCount)==0){

        //删除buycourse里面的内容
        const ACCESS_TOKEN=await getAccessToken()
        var options= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('buycourse').where({userid:'${userid}'}).get()`,
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
                uri:  `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('buycourse').doc('${course_id}').remove()`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
                 
            })
        }

        //删除log记录

        var options= {
            method: 'POST',
            uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('yuekelog').where({userMarkID:'${userid}'}).get()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res)
    
            for(var i=0;i<res.data.length;i++){
    
               array2.push(JSON.parse(res.data[i]))
    
            }
        })

        console.log(array2)
        console.log(array2.length)

        for(var i=0;i<array2.length;i++){
            const course_id=array[i]._id
            console.log(course_id)

            var options = {
                method: 'POST',
                uri:  `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
              
                body: {
                    query:`db.collection('yuekelog').doc('${course_id}').remove()`,
                    env: 'tcbb-service-2gy2i43m2d84f05d',
                    
                },
        
                json: true // Automatically stringifies the body to JSON
            };

            await rp(options).then(res=>{
                console.log(res)
                 
            })
        }


        //删除用户信息

        var options = {
            method: 'POST',
            uri:  `https://api.weixin.qq.com/tcb/databasedelete?access_token=${ACCESS_TOKEN}`,
          
            body: {
                query:`db.collection('users').doc('${_id}').remove()`,
                env: 'tcbb-service-2gy2i43m2d84f05d',
                
            },
    
            json: true // Automatically stringifies the body to JSON
        };

        await rp(options).then(res=>{
            console.log(res.deleted)
            mark=res.deleted
        })

    }

    ctx.body={
        mark,
        code:20000

    }
 
})


//创建学员信息
router.get('/create',async(ctx,next)=>{
    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var createtime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const ACCESS_TOKEN=await getAccessToken()
    const getQueryUrl=`https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`

    console.log(ACCESS_TOKEN)

    const params = ctx.request.query
    const card=params.card
    
    console.log(params)
    console.log(card)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').where({card_number:'${params.card}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
        count=res.data.length
        
    })

    if(count==0){
        //创建新学员信息
        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('buycoursemark').add({
                    data:{
                        create_time:'${createtime}'
                    }
                })`,  

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        const da=await rp(options).then(res=>{
    
            console.log(res)

            state=res.errmsg

            buycourseMarkId=res.id_list

            console.log(state)
    
            return res
    
        })

        if(state=='ok'){
            const ACCESS_TOKEN=await getAccessToken()
            //创建新学员信息
            var options={
                method:'POST',
                uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,
    
                body:{
                    query:`db.collection('users').add({
                        data:[{
                            name:'${params.name}',
                            birthday:'${params.birthday}',
                            sexual:'${params.sexual}',
                            parent_tel:'${params.parent_tel}',
                            card_number:'${params.card}',
                            remark:'${params.remark}',
                            create_time:'${createtime}',
                            update_time:'${createtime}',
                            class:'${params.class_number}',
                            openid_1:'${params.openid_1}',
                            io_1:'${params.io1}',
                            io_2:'${buycourseMarkId}',
                            io_3:'${params.io3}',
                            io_4:'${params.io4}',
                            io_5:'${params.io5}',
                            io_6:'${params.io6}',
                            io_10:'${params.io10}',

                        }]
                    })`,  
    
                    env: 'tcbb-service-2gy2i43m2d84f05d',
    
                },
    
                json: true // Automatically stringifies the body to JSON
    
            };

            const das=await rp(options).then(res=>{

                state1=res.errmsg
                console.log(res)
            })
                    
                    
    
        }


    }else if(count!=0){
        state1=count

    }

    ctx.body={
        state1,
        code:20000

    }



})

//通过数据库的id获得用户信息
router.get('/getById',async(ctx,next)=>{
    const params=ctx.request.query
    console.log(params)

    const ACCESS_TOKEN=await getAccessToken()
    
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    const data=await rp(options).then(res=>{
        console.log(res)

        return JSON.parse(res.data)
    })

    ctx.body={
        data,
        code:20000
    }


})


//更新用户信息，card number不能修改
router.post('/update',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const params=ctx.request.body
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').doc('${params._id}').update({
                data:{
                    name:'${params.name}',
                    birthday:'${params.birthday}',
                    sexual:'${params.sexual}',
                    parent_tel:'${params.parent_tel}',
                    remark:'${params.remark}',
                    update_time:'${updatetime}',
                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    const data=await rp(options).then(res=>{
        console.log(res)

        return res
    })


    ctx.body={
        data,
        code:20000
    }
    

})

router.post('/full',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const params=ctx.request.body
    console.log(params)

    if(params.io_10=="undefined"){
        errorClass=0
    }else 
    {
        errorClass=params.io_10
    }
    const classCount=parseInt(params.class)+parseInt(errorClass)


    console.log(errorClass)
    console.log(classCount)

    var options={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,

        body:{
            query:`db.collection('users').doc('${params._id}').update({
                data:{
                    class:'${classCount}',
                }
            })`,

            env: 'tcbb-service-2gy2i43m2d84f05d',
        },

        json: true // Automatically stringifies the body to JSON


    };

    await rp(options).then(res=>{
        console.log(res)

        updateUsercClass=res.modified
    })

    if(updateUsercClass>0){
        const ACCESS_TOKEN=await getAccessToken()
        //生成订单码
        let code='';
        let codeLength=10;
        let txt=new Array(0,1,2,3,4,5,6,7,8,9)

        for(let i=0;i<codeLength;i++){
            let index=Math.floor(Math.random()*10)
            code +=txt[index]
          }

        console.log(code)

        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('buycourse').add({
                    data:[{
                        begin_time:'',
                        code:'',
                        course:'${params.io_10}',
                        create_time:'${updatetime}',
                        end_time:'',
                        foul:'${params.foul}',
                        io_1:'${params.io_1}',
                        io_2:'课程未激活',
                        io_3:'',
                        mark:'充值',
                        order:'${code}',
                        surplus:'${params.io_10}',
                        userid:'${params.io_2}',
                        remark:'${params.io_3}',

                    }]
                })`,

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        const data=await rp(options).then(res=>{
            console.log(res)

            return res
        })

        ctx.body={
            data,
            code:20000
        }


    

    }
})

//查询充值后的学员的课程
router.get('/buyCourseList',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(params)

    var options={
        method:'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,

        body:{

            query:`db.collection('users').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    await rp(options).then(res=>{

        const userid=JSON.parse(res.data).io_2

        userIdI=userid
        console.log(userid)
    })

    var options={
        method:'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,

        body:{

            query:`db.collection('buycourse').where({userid:'${userIdI}'}).skip(${parseInt(params.start)}).limit(${parseInt(params.count)}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    var array=[]

    await rp(options).then(res=>{
        console.log(res)
        console.log(res.pager.Total)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    });

    ctx.body={
        array,
        code:20000
    }

})


//更新学员充值课程的有效期和犯规次数
router.post('/updateBuyCourse',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.body
    console.log(params)

    var options={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,

        body:{
            query:`db.collection('buycourse').doc('${params._id}').update({
                data:{
                    io_1:'${params.io_1}',
                    foul:'${params.foul}',

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


//获得root信息
router.get('/root',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    console.log(params)

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('root').where({user:'${params.user}',password:'${params.password}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 


    const data=await rp(options).then(res=>{
        console.log(res)

        console.log(res.data.length)
        return res.data.length
        
    })

    ctx.body={
        data,
        code:20000

    }

})


//注销购买课程
router.get('/deleteClass',async(ctx,next)=>{

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second


    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query
    console.log(params)

    //获得USERID
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('buycourse').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 


    await rp(options).then(res=>{
        console.log(res)

        const userid=JSON.parse(res.data).userid

        userIds=userid
        buyClassSurplus=JSON.parse(res.data).surplus
        errmsg=res.errmsg
        io_2I=JSON.parse(res.data).io_2

        console.log(userIds)
        console.log(buyClassSurplus)
        console.log(res.errmsg)

       // return JSON.parse(res.data)
    })

    if(io_2I=="课程终止"){

        //添加已终止课程提示
        state2='oks'
        console.log(state2)

    }else{

            //获得课程数
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
    
        body: {
            query:`db.collection('users').where({io_2:'${userIds}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    }; 

    await rp(options).then(res=>{
        console.log(res)
        classI=JSON.parse(res.data).class
        _ID=JSON.parse(res.data)._id
        console.log(classI)
        console.log(_ID)

    })


    //减去差值
    classV=classI-buyClassSurplus

    console.log(classV)

    //更新user数据库数据

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').doc('${_ID}').update({
                data:{
                    class:'${classV}',
                    update_time:'${updatetime}',
                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)
    })

    //购买课程修改，code至一

    console.log(params.id)
    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('buycourse').doc('${params.id}').update({
                data:{
                    code:'1',
                    io_2:'课程终止',

                }

            })`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res.modified)
        state2=res.modified

        return res
    })

    }

    ctx.body={
        state2,
        code:20000
    }

    
})

router.get('/getUser',async(ctx,next)=>{

    const params=ctx.request.query
    console.log(params.cardID)

    const ACCESS_TOKEN=await getAccessToken()

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('users').where({card_number:'${params.cardID}'}).get()`,
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

router.get('/getClassLog',async(ctx,next)=>{

    const ACCESS_TOKEN=await getAccessToken()

    const params=ctx.request.query

    console.log(ACCESS_TOKEN)
    console.log(params)

    let orderI=''

    var options = {
        method: 'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,
      
        body: {
            query:`db.collection('buycourse').doc('${params.id}').get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',
            
        },

        json: true // Automatically stringifies the body to JSON
    };

    await rp(options).then(res=>{
        console.log(res)     
        orderI=JSON.parse(res.data).order     
    })

    console.log(orderI)

    var options={
        method:'POST',
        uri: `https://api.weixin.qq.com/tcb/databasequery?access_token=${ACCESS_TOKEN}`,

        body:{

            query:`db.collection('yuekelog').where({buycourse_order:'${orderI}'}).get()`,
            env: 'tcbb-service-2gy2i43m2d84f05d',

        },

        json: true // Automatically stringifies the body to JSON

    };

    var array=[]

    await rp(options).then(res=>{
        console.log(res)
        console.log(res.pager.Total)

        for(var i=0;i<res.data.length;i++){

            array.push(JSON.parse(res.data[i]))

        }
    
        return array
    });

    ctx.body={
        array,
        code:20000
    }

})

//学员历史记录倒入，和课程赠送
router.post('/fullGift',async(ctx,next)=>{
    const ACCESS_TOKEN=await getAccessToken()

    var date=new Date();
    var year=new Date(date).getFullYear()
    var month=new Date(date).getMonth()+1
    var day=new Date(date).getDate()
    var hour=new Date(date).getHours()
    var minture=new Date(date).getMinutes()
    var second=new Date(date).getSeconds()
    var updatetime=year+"/"+month+"/"+day+"  "+hour+":"+minture+":"+second

    const params=ctx.request.body
    console.log(params)

    if(params.io_10=="undefined"){
        errorClass=0
    }else 
    {
        errorClass=params.io_10
    }
    const classCount=parseInt(params.class)+parseInt(errorClass)


    console.log(errorClass)
    console.log(classCount)

    var options={
        method:'POST',
        uri:`https://api.weixin.qq.com/tcb/databaseupdate?access_token=${ACCESS_TOKEN}`,

        body:{
            query:`db.collection('users').doc('${params._id}').update({
                data:{
                    class:'${classCount}',
                }
            })`,

            env: 'tcbb-service-2gy2i43m2d84f05d',
        },

        json: true // Automatically stringifies the body to JSON


    };

    await rp(options).then(res=>{
        console.log(res)

        updateUsercClass=res.modified
    })

    if(updateUsercClass>0){
        const ACCESS_TOKEN=await getAccessToken()
        //生成订单码
        let code='';
        let codeLength=10;
        let txt=new Array(0,1,2,3,4,5,6,7,8,9)

        for(let i=0;i<codeLength;i++){
            let index=Math.floor(Math.random()*10)
            code +=txt[index]
          }

        console.log(code)

        var options={
            method:'POST',
            uri:`https://api.weixin.qq.com/tcb/databaseadd?access_token=${ACCESS_TOKEN}`,

            body:{
                query:`db.collection('buycourse').add({
                    data:[{
                        begin_time:'',
                        code:'',
                        course:'${params.io_10}',
                        create_time:'${updatetime}',
                        end_time:'',
                        foul:'${params.foul}',
                        io_1:'${params.io_1}',
                        io_2:'课程未激活',
                        io_3:'',
                        mark:'${params.mark}',
                        order:'${code}',
                        surplus:'${params.io_10}',
                        userid:'${params.io_2}',
                        remark:'${params.io_3}',

                    }]
                })`,

                env: 'tcbb-service-2gy2i43m2d84f05d',

            },

            json: true // Automatically stringifies the body to JSON

        };

        const data=await rp(options).then(res=>{
            console.log(res)

            return res
        })

        ctx.body={
            data,
            code:20000
        }


    

    }
})



module.exports=router