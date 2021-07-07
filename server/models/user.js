const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    resetToken: String,
    resetTokenExp: Date,
    tasks: [{
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            required: true
        },
        createdAt: {
            type: Date,
            required: true
        },
        modifiedAt: {
            type: Date,
            required: true
        }
    }]
})

userSchema.methods.removeTask = function(id) {
    let tasks = [...this.tasks]
    tasks = tasks.filter(c => c._id.toString() !== id.toString())
    this.tasks = tasks
    return this.save()
}

userSchema.methods.updateTask = function(object) {
    const index = this.tasks.findIndex(c => c._id.toString() === object._id.toString())
    this.tasks[index] = object
    return this.save()
}

module.exports = model('User', userSchema)