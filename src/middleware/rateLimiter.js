import ratelimit from "../configs/upstash.js";


const rateLimiter = async(req, res, next) => {
    try{
        const { success } = await ratelimit.limit("my-limit-key");
        if(!success){
            return res.status(429).json({
                success: false,
                message: "Too many requests, please try again later."
            });
        }

    }catch (error) {
        console.log("Rate Limiter Error:", error);
        next(error);
    }

}

export default rateLimiter;