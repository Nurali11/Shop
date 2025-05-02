import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { first, last } from 'rxjs';
import { ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiQuery({
    name: "firstName",
    required: false
  })
  @ApiQuery({
    name: "lastName",
    required: false
  })
  @ApiQuery({
    name: "email",
    required: false
  })
  @ApiQuery({
    name: "year",
    required: false
  })
  @Get()
  findAll(@Query("firstName") firstName: string, @Query("lastName") lastName: string, @Query("email") email: string, @Query("year") year: string) {
    return this.usersService.findAll(firstName, lastName, year, email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.usersService.remove(+id, req);
  }
}
