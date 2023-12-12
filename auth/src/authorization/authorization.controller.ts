import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/authorization/authorization.guard';

@Controller('authorization')
export class AuthorizationController {
  @UseGuards(GoogleAuthGuard)
  @Get('to-google')
  async googleAuth() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}
