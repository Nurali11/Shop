import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(
    private prisma: PrismaService
  ){}
  async create(data: CreateRegionDto) {
    try {
      let existing = await this.prisma.region.findFirst({where: {name: data.name}})
      if(existing){
        throw new BadRequestException("Region already exsists")
      }
      let newRegion = await this.prisma.region.create({data})
      return newRegion
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findAll() {
    try {
      let all = await this.prisma.region.findMany()
      return all
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async findOne(id: number) {
    try {
      let one = await this.prisma.region.findFirst({where: {id}})
      return one
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async update(id: number, data: UpdateRegionDto) {
    try {
      let updated = await this.prisma.region.update({where: {id}, data})
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }

  async remove(id: number) {
    try {
      let deleted = await this.prisma.region.delete({where: {id}})
      return deleted
    } catch (error) {
      throw new BadRequestException({message: error.message})
    }
  }
}
