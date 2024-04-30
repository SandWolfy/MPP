const {
    getAllMagicItems,
    getMagicItemByID,
    createMagicItem,
    editMagicItem,
    deleteMagicItem
} = require('./MagicItemController');

describe('Magic Item Controller Tests', () => {
    let mockReq;
    let mockRes;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllMagicItems', () => {
        test('should return all magic items', () => {
            getAllMagicItems(mockReq, mockRes);
    
            expect(mockRes.send).toHaveBeenCalledWith(MAGICITEMS);
        });
    });

    describe('getMagicItemByID', () => {
        test('should return magic item with valid ID', () => {
            mockReq.params = { id: '0' };

            getMagicItemByID(mockReq, mockRes);
    
            expect(mockRes.send).toHaveBeenCalledWith(MAGICITEMS[0]);
        });
    
        test('should return 404 with invalid ID', () => {
            mockReq.params = { id: '436456' };
    
            getMagicItemByID(mockReq, mockRes);
    
            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.status().json).toHaveBeenCalledWith('No record with given ID');
        });
    });

    describe('createMagicItem', () => {
        test('create a new magic item', () => {
            const newItem = {
                name: 'Samantha',
                location: 'Eldoria',
                usableClass: 'Wizard',
                price: 200
            };
            mockReq.body = newItem;

            createMagicItem(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalled();
        });
    });

    describe('editMagicItem', () => {
        test('edit an existing magic item', () => {
            const updatedItem = {
                id: '0',
                name: 'Michael Updated',
                location: 'Rodravar Updated',
                usableClass: 'Warlock Updated',
                price: 150
            };
            mockReq.params = { id: '0' };
            mockReq.body = updatedItem;

            editMagicItem(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalled();
        });

        test('return 404 because item not found', () => {
            mockReq.params = { id: '100' };

            editMagicItem(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith('No record with given ID');
        });
    });

    describe('deleteMagicItem', () => {
        test('delete an existing magic item', () => {
            mockReq.params = { id: '0' };

            deleteMagicItem(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalled();
        });

        test('return 404 because item not found', () => {
            mockReq.params = { id: '100' };

            deleteMagicItem(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith('No record with given ID');
        });
    });
});