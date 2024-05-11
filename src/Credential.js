const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

class Credentials{
    constructor(){
        this.connectionString = '';
    }

    //use your mongodb connection string
    connect(connString){
        this.connectionString = connString;
        mongoose.connect(connString)
        .then(res => console.log('Database connected'))
        .catch(err => console.log(err))
    }

    signUp = async(Model, obj, {isHash=true, allowCopy=false, dontCopy=""}) =>{
        if(obj.password===undefined && (obj.username===undefined || obj.email===undefined)){
            return {status:401, message:'you need to have password field and username atleast'}
        }
        if(!eval(`obj.${dontCopy}`)){
            return {status:401, message:`you dont have ${dontCopy} at your model`}
        }
        if(!allowCopy && dontCopy !== ""){
            const query = {[dontCopy]:eval(`obj.${dontCopy}`)};
            const findIdentifier = await Model.findOne(query)
            if(findIdentifier){
                return {status:401, message:`failed to create account, ${dontCopy} already exist`};
            }
        }
        if(isHash){
            const encrypt = await bcrypt.hash(obj.password, 12);
            obj.password = encrypt;
        }
        const create = new Model(obj);
        await create.save();
        return {status:200, message:'account created succesfully', model:create};
    }

    login = async(model, toFind, {identifier, password}, {isHash=false}) => {
        const query = {[toFind]:identifier}
        const findModel = await model.findOne(query)
        if(!findModel){
            return {status:401, message:`we didnt find your ${toFind}`};
        }
        if(!isHash){
            const isValid = findModel.password === password;
            return isValid? {status:200, message:'login successfully', model:findModel} : {status:401, messgae:'wrong password'}
        }
        const isValid = await bcrypt.compare(password, findModel.password);
        return isValid? {status:200, message:'login successfully', model:findModel} : {status:401, messgae:'wrong password'};
    }

}

module.exports = Credentials;