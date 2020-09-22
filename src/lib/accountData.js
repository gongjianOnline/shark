/**创建账本**/
import dayjs from "dayjs";
const account = {
  //创建本地账本
  createAccount(newData){
    let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
    let data = [];
    data[0] = {};
    data[0][`${DayDate[0]}-${DayDate[1]}`] = {};
    data[0][`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`]=[];
    data[0][`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`].push(newData)
    account.preserveAccount(data)
  },
  //保存账本
  preserveAccount(data){
    window.localStorage.setItem('account',JSON.stringify(data));
  },
  //获取账本
  getAccount(){
    return JSON.parse(window.localStorage.getItem("account"));
  },

  //创建同月同日账本
  createMonthDay(newData){
    let getData = account.getAccount();
    let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
    getData.forEach((time,index)=>{
      for(let key in time){
        if(key ===`${DayDate[0]}-${DayDate[1]}`){
          for(let ChildKey in time[key]){
            if(ChildKey === `${DayDate[2]}`){
              time[key][ChildKey].push(newData)
              account.preserveAccount(getData)
            }
          }
        }
      }
    })
  },
  //创建同月不同日账本
  createMonthNoDay(newDate){
    let getData = this.getAccount();
    let DayDate = (dayjs().format('YYYY-MM-DD')).split('-');
    getData.forEach((item,index)=>{
      for(let key in item){
        if(key === `${DayDate[0]}-${DayDate[1]}`){
          item[key][`${DayDate[2]}`] = []
          let dayData = {
            name:newDate.name,
            icon:newDate.icon,
            type:newDate.type,
            price:newDate.price,
          };
          item[key][`${DayDate[2]}`].push(dayData);
          account.preserveAccount(getData)
        }
      }
    })
  },
  //创建月
  createMonth(newData){
    let getData = this.getAccount();
    let DayDate = (dayjs().format('YYYY-MM-DD')).split('-')
    let data = {};
    data[`${DayDate[0]}-${DayDate[1]}`] = {};
    data[`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`] = [];
    data[`${DayDate[0]}-${DayDate[1]}`][`${DayDate[2]}`].push(newData);
    getData.push(data);
    account.preserveAccount(getData);
  }
}
export default account;
