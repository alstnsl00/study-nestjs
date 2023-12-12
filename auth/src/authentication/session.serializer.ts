import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.email);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);

    if (!user) {
      done(new Error('no user'), null);
      return;
    }

    const { ...userInfo } = user; // 패스워드 제외

    done(null, { ...userInfo, password: 'ENCRYPTED' });
  }
}
