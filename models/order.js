import  moment from 'moment'
class Order{
    constructor(id,items,totalAmounts,date){
        this.id=id;
        this.items=items;
        this.totalAmounts=totalAmounts;
        this.date=date;
    }
    get readableDate(){
        // return this.date.toLocaleDateString('en-EN',{
        //     year:"numeric",
        //     month:'long',
        //     day:'numeric',
        //     hour:'2-digit',
        //     minute:'2-digit'
        // })
        return moment(this.date).format('MMMM Do YYYY,hh:mm');
    }
}
export default Order;