import { BaseRepository } from '@/api/base/base.repository';
import { BaseResDto } from '@/api/base/dto/base.res.dto';
import { CreateBaseReqDto } from '@/api/base/dto/create-base.req.dto';
import { UpdateBaseReqDto } from '@/api/base/dto/update-base.req.dto';
import { PageOptionsDto } from '@/common/dto/offset-pagination/page-options.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { paginate } from '@/utils/offset-pagination';
import { plainToInstance } from 'class-transformer';

export abstract class BaseService<
  Entity extends AbstractEntity = AbstractEntity,
  ResDto extends BaseResDto = BaseResDto,
  CreateReqDto extends CreateBaseReqDto = CreateBaseReqDto,
  UpdateReqDto extends UpdateBaseReqDto = UpdateBaseReqDto,
  ListReqDto extends PageOptionsDto = PageOptionsDto,
> {
  private readonly ResDtoClass: new (...args: any[]) => ResDto;

  protected constructor(
    private readonly baseRepository: BaseRepository<Entity>,
  ) {}

  async findMany(reqDto: ListReqDto): Promise<OffsetPaginatedDto<ResDto>> {
    const query = this.baseRepository
      .createQueryBuilder('base')
      .orderBy('base.id', 'DESC');
    const [base, metaDto] = await paginate<Entity>(query, reqDto, {
      skipCount: false,
      takeAll: false,
    });
    return new OffsetPaginatedDto(
      plainToInstance(this.ResDtoClass, base),
      metaDto,
    );
  }

  async findById(id: string): Promise<ResDto> {
    const base = await this.baseRepository.findOneByOrFail({ id } as any);

    return base.toDto(this.ResDtoClass);
  }

  async create(_reqDto: CreateReqDto): Promise<ResDto> {
    const entity: Entity = this.baseRepository.create(_reqDto as any) as any;
    await this.baseRepository.save(entity);
    return plainToInstance(this.ResDtoClass, entity);
  }

  async update(_id: string, _reqDto: UpdateReqDto) {
    await this.baseRepository.findOneByOrFail({ id: _id } as any);
    const result = await this.baseRepository.update(
      { id: _id } as any,
      _reqDto as any,
    );
    return !!result.affected;
  }

  delete(_id: string) {
    throw new Error('Method not implemented.');
  }
}
