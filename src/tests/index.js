import assert from 'assert';
import QueryParser from '../helpers/QueryParser';
import ASTree from '../helpers/ASTree';

const { describe, it } = global;

const combinators = [
  { combinator: 'AND', label: 'And' },
  { combinator: 'OR', label: 'Or' },
  { combinator: 'NOT', label: 'Not' },
];

const operators = [
  { operator: '=', label: '=' },
  { operator: '<>', label: '<>' },
  { operator: '<', label: '<' },
  { operator: '>', label: '>' },
  { operator: '>=', label: '>=' },
  { operator: '<=', label: '<=' },
  { operator: 'IS NULL', label: 'Null' },
  { operator: 'IS NOT NULL', label: 'Not Null' },
  { operator: 'IN', label: 'In' },
  { operator: 'NOT IN', label: 'Not In' },
];

describe('Query Parser', function () {
  describe('GetCombinatorsIndexes', function () {
    it('should return AND and OR substrings', function () {
      const query = "((Speed='10 : m/s' AND Mass='30 : kg') OR Acceleration='50 : m/s*s')";
      const result = QueryParser.getCombinatorsIndexes(query, combinators);
      const expectedFirstOeprator = query.substr(result[0].start, result[0].end - result[0].start);
      const expectedSecondOperator = query.substr(result[1].start, result[1].end - result[1].start);
      assert.equal(expectedFirstOeprator, 'AND');
      assert.equal(expectedSecondOperator, 'OR');
    });
  });

  describe('GetTokenObject', function () {
    it('should return token object', function () {
      const token = "Acceleration='20 : m/s*s'";
      const result = QueryParser.createTokenObject(token, operators);
      assert.equal(result.field, 'Acceleration');
      assert.equal(result.operator, '=');
      assert.equal(result.value, "20");
      assert.equal(result.unit, "m/s*s");
    });
  });

  describe('Get tokens array', function () {
    it('should return token array', function () {
      const query = "((Speed='10 : m/s' AND Mass='30 : kg') OR Acceleration='50 : m/s*s')";
      const result = QueryParser.getTokensArray(query, combinators, operators);
      const expectedResult = [
        '(',
        '(',
        { field: 'Speed', operator: '=', value: "10", unit:'m/s'},
        'AND',
        { field: 'Mass', operator: '=', value: "30", unit:'kg'},
        ')',
        'OR',
        { field: 'Acceleration', operator: '=', value: "50", unit:'m/s*s' },
        ')',
      ];
      assert.deepEqual(result, expectedResult);
    });
  });

  describe('get first combinator', function () {
    it('should return AND', function () {
      const query = "((Speed='10 : m/s' AND Mass='30 : kg'))";
      const tokens = QueryParser.getTokensArray(query, combinators, operators);
      const tree = ASTree.buildTree(tokens, combinators);
      const expectedResult = 'AND';
      const result = QueryParser.getFirstCombinator(tree, combinators);
      assert.equal(result._value, expectedResult);
    });
  });
});
