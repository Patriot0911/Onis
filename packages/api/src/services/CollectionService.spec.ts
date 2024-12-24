import { Test, TestingModule } from '@nestjs/testing';
import { CollectionService } from './CollectionService';
import { getModelToken } from '@nestjs/mongoose';
import { Collection } from '../schemas/CollectionSchema';
import { Participant } from '../schemas/ParticipantSchema';
import { FieldService } from './FieldService';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { Field } from '../schemas/FieldSchema';

describe('CollectionService', () => {
  let service: CollectionService;
  let collectionModel: any;
  let participantModel: any;
  let fieldModel: any;
  let fieldService: any;

  beforeEach(async () => {
    collectionModel = {
      save: jest.fn().mockResolvedValue({}),
      updateOne: jest.fn().mockResolvedValue({ nModified: 1 }),
      findByIdAndUpdate: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn().mockResolvedValue({ fields: [] }),
      constructor: jest.fn().mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}),
        updateOne: jest.fn().mockResolvedValue({ nModified: 1 }),
      })),
    };

    participantModel = {
      save: jest.fn(),
    };

    fieldModel = {
      find: jest.fn(),
      insertMany: jest.fn().mockResolvedValue([]),
      deleteMany: jest.fn().mockResolvedValue({}),
      findByIdAndUpdate: jest.fn().mockResolvedValue({}),
    };

    fieldService = {
      updateFields: jest.fn().mockResolvedValue(null),
      deleteFields: jest.fn().mockResolvedValue(null),
      createFields: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionService,
        {
          provide: getModelToken(Collection.name),
          useValue: collectionModel,
        },
        {
          provide: getModelToken(Participant.name),
          useValue: participantModel,
        },
        {
          provide: getModelToken(Field.name),
          useValue: fieldModel,
        },
        FieldService,
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);

    // Spying on the methods to track calls
    jest.spyOn(fieldService, 'updateFields');
    jest.spyOn(fieldService, 'deleteFields');
    jest.spyOn(fieldService, 'createFields');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return a collection by id', async () => {
      const collectionId = new Types.ObjectId();
      const collection = { _id: collectionId, name: 'Test Collection' };

      collectionModel.findOne.mockResolvedValue(collection);

      const result = await service.get(collectionId);

      expect(result).toEqual(collection);
      expect(collectionModel.findOne).toHaveBeenCalledWith({
        _id: collectionId,
      });
    });
  });

  describe('update', () => {
    it('should update the collection', async () => {
      const collectionId = new Types.ObjectId();
      const updateData = { title: 'Updated Collection' };

      const updatedCollection = { _id: collectionId, ...updateData };

      collectionModel.findByIdAndUpdate.mockResolvedValue(updatedCollection);

      const result = await service.update(collectionId, updateData);

      expect(result).toEqual(updatedCollection);
      expect(collectionModel.findByIdAndUpdate).toHaveBeenCalledWith(
        collectionId,
        updateData,
        { new: true },
      );
    });
  });

  describe('validateFields', () => {
    it('should throw BadRequestException if field does not belong to collection', async () => {
      const collectionId = new Types.ObjectId();
      const fieldId = new Types.ObjectId();

      collectionModel.findById.mockResolvedValue({
        fields: [new Types.ObjectId()],
      });

      await expect(
        service.checkIsFieldsBelongsToCollection(collectionId, [fieldId]),
      ).rejects.toThrow(
        new BadRequestException(
          `Field ${fieldId} does not in collection ${collectionId}`,
        ),
      );
    });

    it('should not throw error if field belongs to collection', async () => {
      const collectionId = new Types.ObjectId();
      const fieldId = new Types.ObjectId();

      collectionModel.findById.mockResolvedValue({ fields: [fieldId] });

      await expect(
        service.checkIsFieldsBelongsToCollection(collectionId, [fieldId]),
      ).resolves.not.toThrow();
    });
  });

  describe('getCollectionFields', () => {
    it('should return fields for a collection', async () => {
      const collectionId = new Types.ObjectId();
      const fields = [{ _id: new Types.ObjectId(), name: 'Field 1' }];

      fieldModel.find.mockResolvedValue(fields);

      const result = await service.getCollectionFields(collectionId);

      expect(result).toEqual(fields);
      expect(fieldModel.find).toHaveBeenCalledWith({ collect: collectionId });
    });
  });
});
