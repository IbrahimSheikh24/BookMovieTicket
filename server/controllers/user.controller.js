import User from '../model/user.model.js';

export const createUser = async (req, res) => {
    try {
        const body = req.body;
        const newUser = await User.create(body);
        res.status(200).json({
            success: true,
            message: "User created successfully",
            data: newUser,
            statusCode: 200
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message,
            statusCode: 500
        });
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            statusCode: 200,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
            statusCode: 500
        });
    }
}
   