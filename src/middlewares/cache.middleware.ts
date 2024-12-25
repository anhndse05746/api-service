import { NextFunction, Request, Response } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    sendResponse?: (body?: any) => Response;
  }
}
import redisClient from 'src/utils/cache/redis';

export const cacheMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl;
  const cacheData = redisClient.get(key);

  if (cacheData) {
    res.json(cacheData);
  } else {
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redisClient.set(key, JSON.stringify(data), 'EX', 60 * 5); // Cache for 5 minutes
      return originalJson(data);
    };
    next();
  }
};
