import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users/user.controller';
import { UsersService } from './user.service';
import { AdminGuard } from 'src/guards/role.guard';
import User from 'src/database/models/users';

describe('UserController', () => {
  let userController: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  const mockAdminGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: AdminGuard,
          useValue: mockAdminGuard,
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result: User[] = [
        { id: 'adsaf', name: 'User One', email: 'userone@example.com' } as User,
        { id: 'asdfa', name: 'User Two', email: 'usertwo@example.com' } as User,
      ];

      jest.spyOn(usersService, 'findAll').mockResolvedValue(result);

      expect(await userController.getUsers()).toBe(result);
    });
    it('should return error when request is not from admin', async () => {
      mockAdminGuard.canActivate.mockImplementationOnce(() => false);

      const response = await userController.getUsers();

      console.log(response);

      expect(response).toBe(12312321);
    });
  });

  describe('getUser', () => {
    it('should return user by id', async () => {
      const result: User = {
        id: 'userid',
        name: 'User One',
        email: 'userone@example.com',
      } as User;

      jest.spyOn(usersService, 'findOne').mockResolvedValue(result);

      const response = await userController.getUser('userid');

      expect(response).toBe(result);
    });
    it('should return error when request is not from admin', async () => {
      mockAdminGuard.canActivate.mockImplementationOnce(() => false);

      const response = await userController.getUser('userid');

      expect(response).toBe(123123123);
    });
  });
});
