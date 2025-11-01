/**
 * Run All Tree Tests
 * Executes all tree operation test cases
 */

import { execSync } from 'child_process';
import * as path from 'path';

console.log('\n' + '='.repeat(70));
console.log('RUNNING ALL TREE OPERATION TESTS');
console.log('='.repeat(70) + '\n');

const tests = [
  {
    name: 'Element Operations',
    file: 'test-element-operations.ts',
    description: 'Tests add, remove, update, move, and query operations',
  },
  {
    name: 'Metadata & Page Operations',
    file: 'test-metadata-operations.ts',
    description: 'Tests metadata and page management operations',
  },
  {
    name: 'Immutability Verification',
    file: 'test-immutability.ts',
    description: 'Verifies that all operations are truly immutable',
  },
];

let passedCount = 0;
let failedCount = 0;

for (const test of tests) {
  console.log(`\nRunning: ${test.name}`);
  console.log(`Description: ${test.description}`);
  console.log('-'.repeat(70));

  try {
    const testPath = path.join(__dirname, test.file);
    execSync(`ts-node "${testPath}"`, { stdio: 'inherit' });
    passedCount++;
    console.log(`\n✓ ${test.name} PASSED\n`);
  } catch (error) {
    failedCount++;
    console.error(`\n✗ ${test.name} FAILED\n`);
  }
}

console.log('='.repeat(70));
console.log('TEST SUMMARY');
console.log('='.repeat(70));
console.log(`Total tests: ${tests.length}`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failedCount}`);
console.log('='.repeat(70));

if (failedCount > 0) {
  console.log('\n✗ SOME TESTS FAILED');
  process.exit(1);
} else {
  console.log('\n✓ ALL TESTS PASSED!');
  console.log('✓ Tree operations are working correctly');
  console.log('✓ All operations are immutable');
  console.log('✓ Ready for Redux integration');
}
