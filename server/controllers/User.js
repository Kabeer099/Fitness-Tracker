import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { createError } from "../error.js"
import User from "../models/User.js"
import Workout from "../models/Workout.js"


dotenv.config();

export const UserRegister = async (req, res, next) => {
    try {
        const { email, password, name, img } = req.body;
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return next(createError(409, "Email is already in use"));

        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            img,
        });
        const createdUser = await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "9999 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err)
    }
}

export const UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return next(createError(404, "User not found"));

        }

        const isPasswordCorrect = await bcrypt.compareSync(password, user.password)

        if (!isPasswordCorrect) {
            return next(createError(403, "Incorrect Password"));
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "9999 years",
        });
        return res.status(200).json({ token, user });
    } catch (err) {
        next(err)
    }
}


const getUserDashboard = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }
        const currentDateFormatted = new Date();
        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate(),

        )
        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1,

        )
        //calculate total calories burnt 
        const totalCaloriesBurnt = await Workout.aggregate([
            { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
            {
                $group: {
                    _id: null,
                    totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                },
            },
        ]);
        //calculate total number of workout
        const totalWorkouts = await Workout.countDocuments({
            user: userId,
            date: { $gte: startToday, $lt: endToday },
        });

        //calculate average calories burnt per workout
        const avgCaloriesBurntPerWorkout = totalCaloriesBurnt.length > 0 ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts : 0;

        //fetch calories 
        categoryCalories = await Workout.aggregate([
            { $match: { user: user_id, date: { $gte: startToday, $lt: endToday } } },
            {
                $group: {
                    _id: "$category",
                    totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                },
            },
        ]);
        //Format category data for pie chart
        const pieChartData = categoryCalories.map((category, index) => ({
            id: index,
            value: category.totalCaloriesBurnt,
            label: category._id,

        }));

        const weeks = [];
        const caloriesBurnt = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(
                currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
            );
            weeks.push(`${date.getDate()}th}`);
            const startToday = new Date(
                currentDateFormatted.getFullYear(),
                currentDateFormatted.getMonth(),
                currentDateFormatted.getDate(),

            )
            const endToday = new Date(
                currentDateFormatted.getFullYear(),
                currentDateFormatted.getMonth(),
                currentDateFormatted.getDate() + 1,

            )
            const weekData = await Workout.aggregate([
                {
                    $match: user._id,
                    data: { $gte: startOfDay, $lt: endOfDay },
                },
                {
                    $group: {
                        _id: { $dataToString: { format: "%y-%m-%d", date: "$date" } },
                        totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                    },
                },
                {
                    $sort: { _id: 1 }
                }
            ])
        }


    } catch (err) {
        console.log(err)
    }

}