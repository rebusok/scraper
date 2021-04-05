import parh from 'path';
import fs from 'fs';
import chalk from 'chalk'


export async function saveData(data) {    
    const fileName = `itemsDB.json`;
    const savePath = parh.join(__dirname, '..', 'data', fileName)
    return new Promise((res, rej) => {
        fs.writeFile(savePath, JSON.stringify(data), err => {
            if (err) {
                return rej(err)
            }
            console.log(chalk.blue('File Save from: ' + chalk.blue.bold(fileName) + '\n'))
            res();
        })
    })
}

export async function saveArray(data) {
    const result = []
    return result.push(data)
}