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
    console.log(data)
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
    console.log("结束打印")
    console.log(monthIncome,averageIncome)
    return {monthIncome:monthIncome || '-',averageIncome:averageIncome || '-'}
  },

}
export default settle