import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { sessionRequest } from 'src/dto/requests';
import { promisify } from 'util';

const fs = require('fs');
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

@Injectable()
export class BaseService {
    private ruta:string = './src/asset/';
    private thing = 'aes-256-cbc';
    private inVec = crypto.randomBytes(16);
    private secKey = crypto.randomBytes(32);

    public async ReadFile(fileName:string):Promise<any>{
        if(fs.existsSync(this.ruta + fileName + '.json')){
            const data = fs.readFileSync(this.ruta + fileName + '.json', 'utf8');
            if(data){
                const jsonData = JSON.parse(data);
                return jsonData; 
            }
        }else{
            return [];
        }
        return null;
    }

    public async WriteFile(fileName:string, data:any):Promise<boolean>{
        const frameworksData = JSON.stringify(data);
        fs.writeFileSync(this.ruta + fileName + '.json', frameworksData, 'utf-8');
        return true;        
    }

    public async salacayula(palabra:string):Promise<any>{
        // Entre más rondas, mejor protección, pero más consumo de recursos. 10 está bien
        const rondasDeSal = 10;

        bcrypt.hash(palabra, rondasDeSal, (err, response) => {
            return response;
        });
    }

    public async chalchicomula(palabra:string):Promise<boolean>{
        bcrypt.compare(this.salacayula(palabra), '', (err, coinciden) => {
            if (err) {
                console.log("Error comprobando:", err);
            } else {
                return coinciden;
            }
        });
        return false;
    }

    public async bividi(palabra:string):Promise<string>{
        // //Encryption of Message
        // console.log('palabra',palabra);
        // const cipherText = crypto.createCipheriv(this.thing, this.secKey, this.inVec);
        // console.log('cipherText',cipherText);
        // let encryptedData = cipherText.update(palabra, "utf-8", "hex");
        // console.log('encryptedData',encryptedData);
        // encryptedData += cipherText.final("hex");
        // console.log('encryptedData2',encryptedData);
        // return encryptedData;

        const iv = randomBytes(16);
        const password = 'Password used to generate key';

        // The key length is dependent on the algorithm.
        // In this case for aes256, it is 32 bytes.
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const textToEncrypt = 'Nest';
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return null;
    }

    public async bavidi(palabra:string):Promise<string>{
        //Decryption of Message
        const decipherText = crypto.createDecipheriv(this.thing,this.secKey,this.inVec);
        let decryptedData = decipherText.update(palabra, 'hex', 'utf-8');
        decryptedData += decipherText.final('utf-8');
        return decryptedData;
    }

    public VerifySession(user:sessionRequest):boolean{
        //Porhacer: validar la sesiòn
        return true;
    }
}
