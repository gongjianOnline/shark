import account from "./accountData";
const settle  = {
  initialize(date){
    let data = account.getAccount() || [];
    let siftDate = `${date.year}-${date.month}`
    let EveryDayArr = [];
    data.forEach((item,index)=>{
      for(let key in item){
        if(key === siftDate){
          EveryDayArr.push(item[key])
        }
      }
    });
    let init_EveryDay = []
    EveryDayArr.forEach((item,index)=>{
      for(let key in item){
        let obj = {
          day:`${siftDate}-${key}`,
          data:item[key]
        }
        init_EveryDay.push(obj)
      }
    });
    return init_EveryDay;
  },
  totalRecord(date,state){
    let data = settle.initialize(date);
    let monthIncome = 0;
    let averageIncome = 0;
    if(data.length > 0 ){
      data.forEach((item,index)=>{
        item.data.forEach((itemChild,indexChild)=>{
          if(state === '-' && itemChild.type === "defrayList"){
            monthIncome += parseFloat(itemChild.price)
          }
          if(state === '+' && itemChild.type === "include"){
            monthIncome += parseFloat(itemChild.price)
          }
        })
      });
      //平均数
      averageIncome = monthIncome/(data.length)
      averageIncome = parseFloat(averageIncome);
    }
    return {monthIncome:monthIncome || '-',averageIncome:averageIncome || '-'}
  },
  LineFun(date,state){
    let data = settle.initialize(date)
    let xAxisData = [];
    let seriesData = [];
    if(data.length > 0){
      data.forEach((item,index)=>{
        let init_date = (item.day).split("-");
        xAxisData[index] = `${init_date[1]}-${init_date[2]}`;
        let count = 0;
        item.data.forEach((itemChild,indexChild)=>{
          if(state === '-' && itemChild.type === "defrayList"){
            count += parseFloat(itemChild.price)
          }
          if(state === '+' && itemChild.type === "include"){
            count += parseFloat(itemChild.price)
          }
        })
        seriesData.push(count)
      })
    }
    return {xAxisData:xAxisData,seriesData:seriesData,isData:!(xAxisData.length === 0)}
  },
  pieFun(date,state) {
    let data = settle.initialize(date) || [];
    let seriesArr = [];
    let lengthArr = [];
    if(data.length>0){
      //数组去重
      let tagArr = [];
      data.forEach((item, index) => {
        item.data.forEach((itemChild, indexChild) => {
          tagArr.push(itemChild.name)
        })
      })
      tagArr = Array.from(new Set(tagArr));
      //初始化数据
      //表驱动编程
      let init_series = []
      tagArr.forEach((item, index) => {
        let obj = {name: item, value: 0}
        init_series[index] = obj
      })
      data.forEach((item, index) => {
        item.data.forEach((itemChild, indexChild) => {
          if(state === '-' && itemChild.type === "defrayList"){
            init_series.forEach((itemCount,indexCount)=>{
              if(itemCount.name === itemChild.name){
                itemCount.value += parseFloat(itemChild.price)
              }
            })
          }
          if(state === '+' && itemChild.type === "include"){
            init_series.forEach((itemCount,indexCount)=>{
              if(itemCount.name === itemChild.name){
                itemCount.value += parseFloat(itemChild.price)
              }
            })
          }
        })
      });
      //循环得到是否存在问数据的问题,(收入和支出标签分离)
      init_series.forEach((item,index)=>{
        if(item.value !== 0){
          seriesArr.push(item)
          lengthArr.push(item.name)
        }
      })
    }
    return {seriesArr:seriesArr,lengthArr:lengthArr,isShow:!(seriesArr.length===0)}
  }








}
export default settle