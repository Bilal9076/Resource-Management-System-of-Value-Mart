import  moment from 'moment'
class Sell {
    constructor(id, title, price, name, number, Quantity,Date,profit,ImgUrl) {
        this.id = id
        this.title = title
        this.price= price
        this.name= name
        this.number=number
        this.Quantity= Quantity
        this.Date= Date
        this.profit= profit
        this.ImgUrl=ImgUrl
        // this.time= time
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default Sell;