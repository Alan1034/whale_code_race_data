const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/code_race"
//如果数据库不存在，MongoDB将创建数据库并建立连接

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, db) => {
  if (err) {
    throw err
  }
  const dbase = db.db("code_race")

  
  for (let i = 0; i < 20; i++) {
    const personnelInfo = {
      staffCode: 00270 +i,  
      //工号
      staffName: `伞兵${i}号`,                                    
      //姓名
      workEmail: "lu.benwei23@iwhalecloud.com",          
      //邮箱
      idCard: "3213029851081",                              
      //身份证号
      birthDate: `19${Math.abs(Math.floor(Math.random() * 70 - 20))}/${Math.ceil(Math.random() * 12)}/${Math.ceil(Math.random() * 30)}`                                
      //生日日期
    }
  }
  
  dbase.collection('personnel').insertOne(personnelInfo, (err, res) => {
    if (err) {
      throw err
    }
    console.log("文档插入成功")
    db.close()
  })
})