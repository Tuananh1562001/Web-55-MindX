var fs = require('fs');
const path = require('path');
const uuid = require('uuid');


// lấy dữ liệu
const getAll = async () =>{
    try {
        const dataString = await fs.promises.readFile(path.resolve(__dirname,'sinhvien.json'),'utf-8');
        return JSON.parse(dataString);
    } catch (error) {
        throw(error)
    }
};

// trả dữ liệu
const writeData = async(data) =>{
    try {
        await fs.promises.writeFile(path.resolve(__dirname,'sinhvien.json'),JSON.stringify(data));
    } catch (error) {
        throw(error)
    }
}

// Thêm dữ liệu
const addNewStudent = async (newStudent) => {
    try {
        newStudent.id = uuid.v4();
        if(!fs.existsSync(path.resolve(__dirname,'sinhvien.json'))){
            const newData = [newStudent];
            await writeData(newData);
            return 0;
        }
        const data = await getAll();
        data.push(newStudent)
        await writeData(data)
    } catch (error) {
        console.log('err: ',error)
    }
}

const findUserbyId = (allUser, idUser) => allUser.findIndex(({id}) => id === idUser)
// Sửa dữ liệu
const updateStudent = async (student) =>{
    try {
        const { id: userId, ...dataUpdate} = student;
        const allUser = await getAll();
        const indexUser = findUserbyId(allUser,userId)
        if(indexUser === -1) throw new Error('User not found!')
        allUser[indexUser] = {
            ...allUser[indexUser],
            ...dataUpdate
        }
        await writeData(allUser);
    } catch (error) {
        console.log('Error:',error)
    }
}

// xóa dữ liệu
const deleteStudent = async (student) =>{
    try {
        const { id: userId, ...dataUpdate} = student;
        const allUser = await getAll();
        const indexUser = findUserbyId(allUser,userId)
        if(indexUser === -1) throw new Error('User not found!')
        allUser.splice(indexUser,1)
        await writeData(allUser);
    } catch (error) {
        console.log('Error:',error)
    }
}

// hàm main thực thi
const main = () =>{
    const newStudent = {
        name: 'Lý Nguyễn',
        age: '30',
        gender: 'female',
        "id":"8fb4aa9d-2bd2-435b-8552-9c6b3b0dcf80"
    }
    addNewStudent(newStudent)
    // updateStudent(newStudent)
    // deleteStudent(newStudent)
}
main()
