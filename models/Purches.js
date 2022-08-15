import  moment from 'moment'
class Purches {
    constructor(id, title, price, Quantity,Date,Img) {
        this.id = id
        this.title = title
        this.price= price
        this.Quantity= Quantity
         this.Date= Date
         this.Img=Img
    }
    get readableDate() {
        return moment(this.Date).format('MMMM Do YYYY, hh:mm');
    }
}
export default Purches;
