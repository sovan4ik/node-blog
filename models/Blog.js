const {Schema, model} = require('mongoose')
const schema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        //required: true // если так писать то консоль бьет ошибки, разобраться!
    },
    date: {
        type: Number
    }    
})

module.exports = model('blog', schema)