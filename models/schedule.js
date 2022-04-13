const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');

class Schedule {
    constructor (name, email, tel, skype) {
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.skype = skype;
        this.date = new Date();
        this.id = v4();
    }

    profileSchedule() {
        return {
            name: this.name,
            email: this.email,
            tel: this.tel,
            skype: this.skype,
            date: this.date,
            id: this.id
        }
    }

    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '..', 'db', 'schedule.json'), 'utf8', (err, content) => {
                if (err) {
                    rej(err);
                } else {
                    res(JSON.parse(content));
                }
            });
        });
    }

    static async getSchedule(id) {
        const db = await Schedule.getAll();
        const schedule = db.filter(item => item.id === id);

        return schedule[0];
    }

    static async addSchedule(data){
        const db = await Schedule.getAll();
        db.push(data);

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'db', 'schedule.json'), JSON.stringify(db), (err) => {
                if(err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    }
}

module.exports = Schedule;