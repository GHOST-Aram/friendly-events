import { queryString } from '../query-string';
import { ParsedQs } from 'qs';

describe('Query string getPaginationParams method', () => {
    it('should return default pagination params when query is empty', () => {
        const query: ParsedQs = {};

        const result = queryString.getPaginationParams(query);

        expect(result).toEqual({ skipDocs: 0, limit: 10 });
    });

    it('should return correct skipDocs and limit when valid page and limit are provided', () => {
        const query: ParsedQs = { page: '2', limit: '20' };

        const result = queryString.getPaginationParams(query);

        expect(result).toEqual({ skipDocs: 20, limit: 20 });
    });

    it('should handle negative values for page and limit by converting them to positive', () => {
        const query: ParsedQs = { page: '-3', limit: '-15' };

        const result = queryString.getPaginationParams(query);

        expect(result).toEqual({ skipDocs: 30, limit: 15 });
    });

    it('should return default limit when limit is not provided', () => {
        const query: ParsedQs = { page: '2' };

        const result = queryString.getPaginationParams(query);

        expect(result).toEqual({ skipDocs: 10, limit: 10 });
    });

    it('should return default page when page is not provided', () => {
        const query: ParsedQs = { limit: '15' };

        const result = queryString.getPaginationParams(query);

        expect(result).toEqual({ skipDocs: 0, limit: 15 });
    });

    it('should return default pagination params when page and limit are invalid numbers', () => {
        const query: ParsedQs = { page: 'invalid', limit: 'invalid' };

        const result = queryString.getPaginationParams(query);

        expect(result).toEqual({ skipDocs: 0, limit: 10 });
    });
});
