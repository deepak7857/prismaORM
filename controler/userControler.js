const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
               if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
    try {
          console.log("Received user data:", { name, email, password: "********" });
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error(error);
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getAllUsers = async (req, res) => {

    try {
        const users = await prisma.user.findMany();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
     if(!name && !email && !password) {
            return res.status(400).json({ message: "At least one field (name, email, or password) is required to update" });
        }

    try {
           
        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id, 10) },
            data: {
                ...(name !== undefined ? { name } : {}),
                ...(email !== undefined ? { email } : {}),
                ...(password !== undefined ? { password } : {})
            }
        });

        return res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
           if(!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
    try {
       
        await prisma.user.delete({
            where: { id: parseInt(id, 10) }
        });

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};