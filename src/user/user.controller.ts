import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/guards/role.auth.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('user')
/** User controller
 * Handles HTTP requests related to user operations such as creation, retrieval, updating, and deletion.
 */
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /**
   *
   * @returns
   * This controller is an endpoint returning admin data
   * @UseGuards(...) runs a jwt check first, then performs a role check
   * @Roles('admin') specifies that only users with the 'admin' role can access this endpoint
   * @Get('admin-data') maps HTTP GET requests to this method at the 'admin-data' path
   * For the moment the method returns a simple string indicating access to user profile data
   * This setup ensures that only authenticated users with the appropriate role can access sensitive data
   *
   */
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Get('admin-data')
  getAdminData() {
    return 'This is sensitive admin data accessible only to users with the admin role.';
  }
}
