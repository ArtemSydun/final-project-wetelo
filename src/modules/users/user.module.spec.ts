import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import User from 'src/database/models/users';

describe('UserModule', () => {
  let userController: UsersController;
  let userService: UsersService;

  const mockUsersService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    addPostToUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('userService', () => {
    describe('getUser', () => {
      it('should return user by id', async () => {
        const result: User = {
          id: 'userid',
          name: 'User One',
          email: 'userone@example.com',
        } as User;

        jest.spyOn(userService, 'findOne').mockResolvedValue(result);

        const response = await userService.findOne(result.id);

        expect(response).toBe(result);
      });
    });

    describe('findAll', () => {
      it('should return an array of users', async () => {
        const result: User[] = [
          {
            id: 'adsaf',
            name: 'User One',
            email: 'userone@example.com',
          } as User,
          {
            id: 'asdfa',
            name: 'User Two',
            email: 'usertwo@example.com',
          } as User,
        ];

        jest.spyOn(userService, 'findAll').mockResolvedValue(result);

        const response = await userService.findAll();

        expect(response).toBe(result);
      });
    });

    describe('deleteUser', () => {
      it('should remove user properly', async () => {
        const userToDelete: User = {
          id: 'userid',
          name: 'User One',
          email: 'userone@example.com',
        } as User;

        jest.spyOn(userService, 'remove').mockResolvedValue();

        await userService.remove(userToDelete.id);

        expect(userService.remove).toHaveBeenCalledWith(userToDelete.id);
      });
    });

    describe('addPostToUser', () => {
      it('should add post to user', async () => {
        const postId = 'postid';
        const postOwner: User = {
          id: 'userid',
          name: 'User One',
          email: 'userone@example.com',
          posts: [],
        } as User;

        jest.spyOn(userService, 'addPostToUser').mockResolvedValue();

        await userService.addPostToUser(postOwner.id, postId);
      
        expect(userService.addPostToUser).toHaveBeenCalledWith(postOwner.id, postId);
      });
    });
  });

  describe('userController', () => {
    describe('getProfile', () => {
      it('should return userprofile', async () => {
        const result: User = {
          id: 'userid',
          name: 'User One',
          email: 'userone@example.com',
        } as User;

        jest.spyOn(userController, 'getProfile').mockResolvedValue(result);

        const response = await userController.getProfile(result.id);

        expect(response).toBe(result);
      });
    });
  });
});
