const MongoClient = require('mongodb').MongoClient
const {cityPopulation} = require('./population.json')
const url = "mongodb://localhost:27017/code_race"
//如果数据库不存在，MongoDB将创建数据库并建立连接
//生成数据库数据
MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, async(err, db) => {
  if (err) {
    throw err
  }
  const dbase = db.db("code_race")

  let sum = 0
  cityPopulation.forEach((ele)=>{
    const{population}=ele
    sum += Number(population)*10000
  })
  // console.log(sum)
  //员工列表
  const staffList=[]
  for (let i = 0; i < 20; i++) {
    const join = Math.abs(Math.floor(Math.random() * 20))
    let age = Math.abs(Math.floor(Math.random() * 50))
    if (age<20) {
      age = age+20
    }
    //随机出学历
    const degree = ()=>{
      let val="C"
      switch (i % 5) {
        case 1:
          val = "A"
          break;
        case 2:
          val = "C"
          break;
        default:
          break;
      }
      return val
    }
    //随机所属研发中心
    const station = ()=>{
      let val ="南京研发中心"
      switch (i % 4) {
        case 1:
          val = "广州研发中心"
          break;
        case 2:
          val = "长沙研发中心"
          break;
        case 3:
          val = "厦门研发中心"
          break;
        case 4:
          val = "南京研发中心"
          break;
        default:
          break;
      }
      return val
    }
    //随机所属研发中心
    const employType = ()=>{
      let val ="开发"
      switch (i % 4) {
        case 1:
          val = "开发"
          break;
        case 2:
          val = "测试"
          break;
        case 3:
          val = "设计"
          break;
        case 4:
          val = "产品"
          break;
        default:
          break;
      }
      return val
    }
    //按人口分布随机出户口所在地
    const ram = Math.floor(Math.random() * sum)
    let sumPersonal = 0
    // console.log(cityPopulation)
    const CtiyD=cityPopulation.filter((ele) => {
      const { population, city } = ele
      sumPersonal += Number(population) * 10000
      if (sumPersonal > ram) {
        return city
      }
    })
    // console.log(CtiyD[0])
    // console.log(ram)
    const personnelInfo = {
      staffCode: 00270 +i,  
      //工号
      staffName: `伞兵${i}号`,                                    
      //姓名
      workEmail: "lu.benwei23@iwhalecloud.com",          
      //邮箱
      idCard: "3213029851081",                              
      //身份证号
      birthDate: `${2021-age}/${Math.ceil(Math.random() * 12)}/${Math.ceil(Math.random() * 30)}`,                                
      //生日日期
      joinDate: `20${Math.abs(Math.floor(Math.random() * 20))}/${Math.ceil(Math.random() * 12)}/${Math.ceil(Math.random() * 30)}`,   
      //入职时间
      fullMemberDate: `20${join}/${Math.ceil(Math.random() * 12)}/${Math.ceil(Math.random() * 30)}`,   
      //转正时间
      divisionAge: 21 - join,
      //司龄
      age:age,
      //年龄
      gender: i%2?"M":"F",
      //M:男 F:女
      employType: employType(),
      //员工类型
      belongTo: "浩鲸云计算科技股份有限公司",
      //公司归属
      leaveDate: null,
      //离职/停薪时间
      school: '学校',
      //毕业院校
      sourceFor: i % 3===1 ? "B" : "A",
      //A.社招、B.毕业生
      degree: degree(),
      //A博士、B硕士、C本科、D专科、E中专、F成教、G其他
      graduationDate: `${2021 - age+19}/6/20` ,
      //毕业时间
      telephone: "15062266353" ,
      //联系方式
      fullState: "Y" ,
      //Y已转正N未转正
      staffState: "Y" ,
      //Y在职N离职X未入职Z入职中
      qqMsn: "1028241" ,
      //QQ/MSN号
      major: "软件工程" ,
      //专业
      degreeLevel: degree(),
      //A博士、B硕士、C学士、D其它
      cetLevel:"A",
      //A四级、B六级、C八级、D无
      startWorkTime: `${2021 - age + 19}/6/20`,
      //参与工作时间
      accountSite: CtiyD[0].city,
      //户口所在地
      sitePopulation: CtiyD[0].population,
      //所在地人口（万人）
      siteLng: CtiyD[0].lng,
      //所在地经度
      siteLat: CtiyD[0].lat,
      //所在地纬度
      height: `${Math.ceil(Math.random() * 40) + 150}`,
      //身高
      bloodType:"A",
      //血型
      nation:"汉族",
      //民族
      nativePlace: CtiyD[0].city,
      //籍贯
      politicsStatus:"党员",
      //政治面貌
      marriage:"A",
      //A已婚B未婚
      station: station(),
      //驻地
      nationality:"中国",
      //国籍
      workAge:"中国",
      //工龄
      payRankType:"P",
      //职级类型
      payRankLevel: `${Math.ceil(Math.random() * 10) + 3}`,
      //职级
    }
    staffList.push(personnelInfo)
  }
  
  dbase.collection('personnel').insertMany(staffList, (err, res) => {
    if (err) {
      throw err
    }
    console.log("文档插入成功")
    db.close()
  })
})