import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/createUser')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    return user;
  }

  @Put('/updateUser/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(email, user);
  }

  @Delete('/deleteUser/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
