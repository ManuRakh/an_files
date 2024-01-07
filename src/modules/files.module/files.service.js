const { Op } = require("sequelize");
const File = require("../../models/Files");
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const fs = require('fs');
const path = 'savedFiles';

const secretKey = 'your-secret-key';

const encryptData = (data) => {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

const decryptData = (encryptedData) => {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}


const create = async ({data, filename, user_id}) => {
    const fileId = uuidv4();
    const encryptedData = encryptData(data); // Шифруем данные
    fs.writeFileSync(`${path}/${fileId}`, encryptedData);

    await File.create({
      id: fileId,
      filename: filename,
      user_id
    });
    
      console.log("file created", { fileId });
    
      return fileId;
}

const getFile = async (id) => {
    const foundFile = await File.findOne({
        where :{
          id: {
            [Op.eq]: id
          }
        }
      });
    
      const transformedFile =  foundFile ? foundFile.get() : null; 
      if (transformedFile) {
        const filePath = `${path}/${foundFile.id}`; // Путь к файлу
        const encryptedData = fs.readFileSync(filePath, 'utf8'); // Чтение файла
        return { data: encryptedData, filename: foundFile.filename}; // Расшифровка и вывод данных
      } else {
        console.log('File not found');
      }
}

const deleteFile = async (id) => {
    return await File.destroy({
      where :{
        id: {
          [Op.eq]: id
        }
      }
    });
}

module.exports = {
    create, 
    getFile, 
    deleteFile
  }