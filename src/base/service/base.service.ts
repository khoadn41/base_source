import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, QueryOptions } from 'mongoose';
import { BaseQueryDto, Field } from '../dto/query';

@Injectable()
export class BaseService<T> {
  constructor(private readonly model: Model<T>) {}

  async createOne<DTO>(data: DTO) {
    return await this.model.create(data);
  }

  async createMany<DTO>(arrData: Array<DTO>) {
    return await this.model.insertMany(arrData);
  }

  async getAll(
    filter: FilterQuery<T>,
    options?: BaseQueryDto,
    populate: Field = null,
  ) {
    // INFO: Get All
    const result = this.model.find({ ...filter });
    const total = await this.model.count(filter);
    const limit = options.limit || 10;
    const skip = (options.page - 1) * limit || 0;
    const sortBys = (options?.sortBy || '').split(',');
    const sortDirections = (options?.sortDirection || '')
      .split(',')
      .map(Number);
    result.limit(limit);
    result.skip(skip);
    if (populate) {
      result.populate(populate.field);
    }
    sortBys.map((sortBy: string, index: number) => {
      if (index >= sortDirections.length) return;
      const sortDirection = sortDirections[index] === 1 ? 1 : -1;
      if (sortBy) {
        result.sort({
          [sortBy]: sortDirection,
        });
      }
    });
    return { result: await result, total };
  }

  async getOne(filter: FilterQuery<T>, populate: Field = null) {
    const query = this.model.findOne({ ...filter });

    if (populate) {
      query.populate(populate.field);
    }

    return await query.exec();
    // return await this.model.findOne({ ...filter });
  }

  async updateOne<UpdateDto>(filter: FilterQuery<T>, data: UpdateDto) {
    return await this.model.updateOne({ ...filter }, data);
  }

  async updateMany<UpdateDto extends T>(
    filter: FilterQuery<T>,
    arrData: Array<UpdateDto>,
  ) {
    return await this.model.updateMany({ ...filter }, arrData);
  }

  async delete(filter: FilterQuery<T>) {
    return await this.model.updateOne(filter, {
      isDeleted: true,
    });
  }

  async unDelete(filter: FilterQuery<T>) {
    return this.model.updateMany(filter, {
      isDeleted: false,
    });
  }

  async hardDeleteOne(filter: FilterQuery<T>) {
    return this.model.deleteOne(filter);
  }

  async getOneAndUpdate<UpdateDto extends T>(
    filter: FilterQuery<T>,
    data: any,
    options: QueryOptions<T> = {},
  ) {
    return this.model.findOneAndUpdate(filter, data, options);
  }
}
