import { Test, TestingModule } from '@nestjs/testing';
import { UserServiceService } from './user-service.service';

describe('UserServiceService', () => {
  let service: UserServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserServiceService],
    }).compile();

    service = module.get<UserServiceService>(UserServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
