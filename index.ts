import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';
const exeFile = require("./IconExtractor/IconExtractor/bin/Debug/IconExtractor.exe");

const getPlatformIconProcess = () => {
    if (os.type() == 'Windows_NT') {
        return path.join(__dirname, `/${exeFile.default}`);
    } 

    throw ('This platform (' + os.type() + ') is unsupported =(');
}

export const getIcon = (fileNameAndPath: string) => {
    return new Promise((resolve, reject) => {

        const exe = getPlatformIconProcess();
        console.log('PATJ');
        console.log(exe);
        const command = exec(`${exe} --path=\"${fileNameAndPath}\"`);

        command.stdout!.on("data", e => {
            resolve(e)
        });

        command.stderr!.on("data", e => {
            reject(e)
        });

        command.on("error", e => {
            reject(e);
        });
    });
}