import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from 'src/user/user.dto';
import {
  LoginGuard,
  AuthenticatedGuard,
  LocalAuthGuard,
} from './authentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authenticationService.register(userDto);
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
    }
    const userInfo = await this.authenticationService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false, // 브라우제에서 읽을 수 있도록 함
        maxAge: 1000 * 60 * 60 * 24,
      });

      return res.send({ message: 'login success' });
    } else {
      return res.send({ message: 'login fail' });
    }
  }

  @UseGuards(LoginGuard)
  @Post('login-guard-cookie')
  async loginGuard(@Request() req, @Response() res) {
    if (!req.cookies['login'] && req.user) {
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10,
      });
      return res.send({ message: 'login-guard success' });
    } else {
      return res.send({ message: 'login-guard already successed' });
    }
  }

  @UseGuards(LoginGuard)
  @Get('test-guard-cookie')
  testGuardCookie() {
    return '쿠키로 로그인 되었을 경우만 이 글이 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login-guard-session')
  loginSession(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard-session')
  testGuardSession(@Request() req) {
    return req.user;
  }
}
