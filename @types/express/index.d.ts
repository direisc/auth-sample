import { User } from '../../src/service';

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
