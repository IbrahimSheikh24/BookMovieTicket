import User from '../model/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    console.log('GetAllusers');
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

export const getUserById = async(req, res) => {
    try {
        const userid = req.params.id;
        const user = await User.findById(userid);
        if(user) {
            res.status(200).send({
                success: true,
                data: user,
                statusCode: 200,
            })
        } else {
            res.status(404).send( {
                success: false,
                message: "User not found"
            })
        }
    } catch(e) {
        res.status(404).send( {
                success: false,
                message: "User not found"
        })
    }
}

export const updateUser = async(req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateUser = await User.updateOne({_id: id}, {$set: body});
        if(updateUser.modifiedCount > 0) {
            res.status(200).send( {
                success: true,
                messgae: "User Updated",
            })
        } else {
             res.status(404).send( {
                success: true,
                messgae: "User not founc",
            })
        }
    } catch (error) {
         res.status(500).send( {
                success: true,
                messgae: error.message,
            })
    }
}

export const deleteUser = async(req, res) => {
    try {
        const userid = req.params.id;
        const user = await User.findByIdAndDelete(userid);
        if(user) {
            res.status(200).send({
                success: true,
                message: "User deleted Successfully",
                data: user,
                statusCode: 200,
            })
        } else {
            res.status(404).send( {
                success: false,
                message: "User not found"
            })
        }
    } catch(e) {
        res.status(500).send( {
                success: false,
                message: "User not found"
        })
    }
}

export const login = async(req, res) => {
    const userBody  = req.body;
    console.log("Login request body: ", userBody);
    try {
        if(!userBody.email || !userBody.password) {
            res.status(400).send({
                success: false,
                message: 'Enter email and password'
            })
            return;
        } else {
            const user = await User.findOne({email: userBody.email}).select("+password");
            if(user) {
                const isValid = await bcrypt.compare(userBody.password, user.password);
                if(isValid) {
                    const token = jwt.sign({email: user.email, isAdmin: user.isAdmin}, process.env.jwt_secret_salt, {expiresIn: '1d'});
                    res.setHeader("Access-Control-Expose-Headers", "jwtToken");
                    res.setHeader('jwtToken', token);
                    console.log("Generated JWT Token: ", token);
                    res.status(200).send( {
                        success: true,
                        message: 'Login Successful',
                        data: token
                    })
                } else {
                        res.status(401).send({
                        success: false,
                        message: 'Inavlid Password'
                    })
                }
            } else {
                    res.status(400).send({
                    success: false,
                    message: 'User not found'
                })
                return;
            }
        }
    } catch (error) {
         res.status(400).send({
                success: false,
                message: error.message
            })
    }
}

export const getUserByToken = async (req, res) => {
    console.log('getUserByToken');
    try {
        const jwtToken = req.headers['jwtToken'];
        console.log('Received JWT Token: ', jwtToken);
        const decodedToken = jwt.verify(jwtToken, process.env.jwt_secret_salt);
        if(decodedToken) {
            console.log('Decoded JWT Token: ', decodedToken);
            const user = await User.findOne({email: decodedToken.email});
            if(user) {
                res.status(200).send({
                success: true,
                data: user
                })
            } else {
                 res.status(404).send({
                success: false,
                message: "User not found"
                })
            }
        } else {
             res.status(403).send({
                success: false,
                message: 'Invalid Token'
            })
        }
    } catch (error) {
        console.log('Error in getUserInfo: ', error);
         res.status(400).send({
                success: false,
                message: error.message
        })
    }
}


   