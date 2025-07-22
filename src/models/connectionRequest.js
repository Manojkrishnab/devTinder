const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
    {
        fromUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // this field refers to 'User' collection
            required: true
        },
        toUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ["ignored","interested","accepted","rejected"],
                message: `{VALUE} is incorrect status type`
            },
        }
    },
    {
        timestamps: true
    }
);
// This Schema won't allow the exactly same set of data to store in database

// To optimize the load on API for querying
connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

// it will be called just before executing the save() method in 'routes'
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;

    // Check if the fromUserId is same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself..!!");
    }
    next();
})

// Here variable name should start with Uppercase letter
const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;