const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');

class Questionnaire {
    constructor(name, email, phone, targetLearn, yourProblem, yourLvl, howLong, whereLearn, anotherLanguage, whichTypeSchool, whatsHard, howMatchTime) {
        this.date = new Date();
        this.id = v4();
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.targetLearn = targetLearn;
        this.yourProblem = yourProblem;
        this.yourLvl = yourLvl;
        this.howLong = howLong;
        this.whereLearn = whereLearn;
        this.anotherLanguage = anotherLanguage;
        this.whichTypeSchool = whichTypeSchool;
        this.whatsHard = whatsHard;
        this.howMatchTime = howMatchTime;
    }

    profileQuestionnaire() {
        return {
            date: this.date,
            id: this.id,
            name: this.name,
            email: this.email,
            phone: this.phone,
            targetLearn: this.targetLearn,
            yourProblem: this.yourProblem,
            yourLvl: this.yourLvl,
            howLong: this.howLong,
            whereLearn: this.whereLearn,
            anotherLanguage: this.anotherLanguage,
            whichTypeSchool: this.whichTypeSchool,
            whatsHard: this.whatsHard,
            howMatchTime: this.howMatchTime
        }
    }

    static async getAll() {
        return new Promise((res,rej) => {
            fs.readFile(path.join(__dirname, '..', 'db', 'questionnaire.json'), 'utf-8', (err,content) => {
                if (err) {
                    rej(err);
                } else {
                    res(JSON.parse(content));
                }
            });
        });
    }

    static async getOne(paramID) {
        const db = await Questionnaire.getAll();
        const candidate = db.filter(item => item.id === paramID);
        return candidate[0];
    }

    static async addQuestionnaire(data) {
        const db = await Questionnaire.getAll();
        db.push(data);

        return  new Promise((res,rej) => {
            fs.writeFile(path.join(__dirname, '..', 'db', 'questionnaire.json'), JSON.stringify(db), (err) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    }
}

module.exports = Questionnaire;