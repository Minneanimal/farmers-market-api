import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        UsersService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    authenticationService = module.get<AuthenticationService>(
      AuthenticationService,
    );
    userService = module.get<UsersService>(UsersService);
  });
  describe('when accessing the data of authenticating user', async () => {
    it('should attempt to get the user by email', () => {
      const getByEmailSpy = jest.spyOn(userService, 'getByEmail');
      authenticationService.getAuthenticatedUser(
        'user@email.com',
        'strongPassword',
      );
      expect(getByEmailSpy).toBeCalledTimes(1);
    });
  });
});
