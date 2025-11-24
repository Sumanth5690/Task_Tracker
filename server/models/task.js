    const mongoose = require("mongoose");

    const taskSchema = new mongoose.Schema(
    {
        title: { type: String, 
            required: true 
            },
        description: { type: String 

        },
        assigneeId: { type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo"
        },
        dueDate: { type: Date },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
    );

    const Task = mongoose.model("Task", taskSchema);
    module.exports = Task;
