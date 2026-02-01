import dotenv from 'dotenv';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

dotenv.config({ override: true });

// Create a new ratelimiter, that allows 5 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

export default ratelimit;