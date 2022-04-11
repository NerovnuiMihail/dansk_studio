const fs = require('fs');
const path = require('path');
const {v4} = require('uuid');

class Courses {
    constructor(title, time, cost) {
        this.title = title;
        this.cost = cost;
        this.time = time;
        this.id = v4();
    }

    profileCourse() {
        return {
            title: this.title,
            time: this.time,
            cost: this.cost,
            id: this.id
        }
    }

    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, '..', 'db', 'services.json'), 'utf8', (err,content) => {
                if (err) {
                    rej(err);
                } else {
                    res(JSON.parse(content));
                }
            });
        });
    }

    static async addCourse(data, coursName) {
        const db = await Courses.getAll();
        const newDB = [];

        for (let item of db) {
            const nameDB = Object.keys(item)[0];

            if (nameDB === coursName) {
                let searchIndexCourse;
                item[coursName].forEach((cours,idx) => {
                    if (cours.title === data.title) {
                        searchIndexCourse = idx;
                    }
                });

                if (searchIndexCourse == undefined) {
                    const arr = item[coursName].map(item => item);
                    const obj = {
                        title: data.title,
                        time: [data.time],
                        cost: [data.cost],
                        id: [data.id]
                    };
                    arr.push(obj);
                    const newObj = {};
                    newObj[coursName] = arr;
                    newDB.push(newObj);
                } else {
                    const arr = item[coursName].map(item => item);
                    arr[searchIndexCourse].time.push(data.time);
                    arr[searchIndexCourse].cost.push(data.cost);
                    arr[searchIndexCourse].id.push(data.id);
                    const newObj = {};
                    newObj[coursName] = arr;
                    newDB.push(newObj);
                }
            } else {
                newDB.push(item);
            }
        }

        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'db', 'services.json'), JSON.stringify(newDB), (err) => {
                if (err) {
                    rej(err);
                } else {
                    res();
                }
            });
        });
    }

}

module.exports = Courses;