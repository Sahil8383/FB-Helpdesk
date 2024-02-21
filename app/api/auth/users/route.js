import connectDB from "@/db/connectDB";
import User from "@/model/User";

export async function GET(req, res) {
    
    await connectDB();
    const users = await User.find({});

    return new Response(JSON.stringify(users));

}