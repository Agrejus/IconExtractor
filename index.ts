import * as path from 'path';
import * as os from 'os';
import { exec } from 'child_process';

const getPlatformIconProcess = () => {
    if (os.type() == 'Windows_NT') {
        return path.join(__dirname, '../bin/IconExtractor.exe');
        //Do stuff here to get the icon that doesn't have the shortcut thing on it
    } else {
        throw ('This platform (' + os.type() + ') is unsupported =(');
    }
}

export const getIcon = (fileNameAndPath: string) => {
    return new Promise((resolve, reject) => {

        const exe = getPlatformIconProcess();
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