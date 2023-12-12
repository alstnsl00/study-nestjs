import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/authorization/google',
      scope: ['email', 'profile'],
      accessType: 'offline', // refreshToken 필요시 사용?
      prompt: 'consent', // refreshToken 필요시 사용?
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    console.log('AT', accessToken);
    console.log('RT', refreshToken); // refreshToken undefined? 확인 필요!

    const providerId = id;
    const email = emails[0].value;

    const user: User = await this.userService.findByEmailOrSave(
      email,
      name.familyName + name.givenName,
      providerId,
    );
    return user;
  }
}
