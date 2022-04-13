const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');

class Lessons {
    constructor (name, email, tel) {
        this.name = name;
        this.email = email;
        this.tel = tel;
        this.date = new Date();
        this.id = v4();
    }

    profileLesson() {
        return {
            name: this.name,
            email: this.email,
            tel: this.tel,
            date: this.date,
            id: this.id
        }
    }

    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '..', 'db', 'lessons.json'), 'utf8', (err, content) => {
                if (err) {
                    rej(err);
                } else {
                    res(JSON.parse(content));
                }
            });
        });
    }

    static async getLesson(id) {
        const db = await Lessons.getAll();
        const lesson = db.filter(item => item.id === id);

        return lesson[0];
    }

    static async addLesson(lesson) {
        const db = await Lessons.getAll();
        db.push(lesson);

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'db', 'lessons.json'),JSON.stringify(db), (err) => {
                if(err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    }
}

module.exports = Lessons;