import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserController } from './user.controller';
import { AppDataSource } from '../database/data-source';
import { User } from './entities/user.entity';

// Mock dependencies
jest.mock('jsonwebtoken');
jest.mock('../database/data-source');

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Setup response mock
    responseObject = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };

    // Setup request mock
    mockRequest = {};
  });

  describe('get', () => {
    it('should return all users with status 200', async () => {
      // Mock data
      const mockUsers = [
        { id: 1, name: 'User 1' },
        { id: 2, name: 'User 2' },
      ];

      // Mock repository find method
      const mockFind = jest.fn().mockResolvedValue(mockUsers);
      jest.spyOn(AppDataSource, 'getRepository').mockReturnValue({
        find: mockFind,
      } as any);

      // Execute
      await UserController.get(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
      expect(AppDataSource.getRepository).toHaveBeenCalledWith(User);
      expect(mockFind).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return a JWT token with status 200', async () => {
      // Mock JWT sign
      const mockToken = 'mock-jwt-token';
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      // Execute
      await UserController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      // Assert
      expect(jwt.sign).toHaveBeenCalledWith(
        {},
        expect.any(String),
        { expiresIn: '30d' }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ token: mockToken });
    });
  });
}); 