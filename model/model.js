const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
class Reservation {
    constructor(name, email, id, phoneNumber){
        if(!name || !email || (id === "" || id === null || id === undefined) || !phoneNumber){
            throw new Error("Reservations must include name, email, id, and phone number");
        }
        this.customerName = name;
        this.customerEmail = email;
        this.customerId = id;
        this.phoneNumber = phoneNumber;
    }
}
class ReservationLists {
    constructor(maxTables, filepath = "reserve.json"){
        this.filepath = filepath;
        this.tableCount = maxTables;
        this.tableData = [];
        this.waitListData = [];
    }
    async addReservation(reservation){
        if(!(reservation instanceof Reservation)){
            throw new Error("Only reservations may be addded to the list");
        }
        if(this.tableData.length < this.tableCount){
            this.tableData.push(reservation);
            await this.save();
            return true;
        } else {
            this.waitListData.push(reservation);
            await this.save();
            return false;
        }
    }
    getTables(){
        return this.tableData;
    }
    getWaitlist(){
        return this.waitListData;
    }
    async clear(){
        this.tableData.length = 0;
        this.waitListData.length = 0;
        await this.save();
    }
    async save(){
        try {
            await writeFileAsync(this.filepath, JSON.stringify({
                waitlist: this.waitListData,
                tables: this.tableData
            }));
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }
    async load(){
        try {
            if(!fs.existsSync(this.filepath)) return false;
            const data = JSON.parse(await readFileAsync(this.filepath, "utf8"));
            this.tableData = (data.tables || []).map(t => new Reservation(t.customerName, t.customerEmail, t.customerId, t.phoneNumber));
            this.waitlist = (data.waitlist || []).map(t => new Reservation(t.customerName, t.customerEmail, t.customerId, t.phoneNumber));
            return true;
        } catch(err){
            console.log(err);
            return false;
        }
    }

}

module.exports = {
    Reservation,
    ReservationLists
}