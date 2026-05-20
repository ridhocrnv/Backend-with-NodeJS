import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/tokenManager.js';

const registerUser = async (req, res) => {
    const body = req.body;
    const { name, email, password } = body;

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
        where: { email: email },
    });

    if (userExists) {
        return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    // Create new user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            },
            token: token
        }
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = generateToken(user.id, res);

    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                email: user.email
            },
            token: token
        },  
    });
};


const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) // Set cookie to expire immediately
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully"
    });
};

export { registerUser, loginUser, logoutUser };