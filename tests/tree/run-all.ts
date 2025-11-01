/**
 * Test Runner for Tree Operations
 * Runs all tree-related tests
 */

console.log('\n\n');
console.log('╔' + '═'.repeat(68) + '╗');
console.log('║' + ' '.repeat(68) + '║');
console.log('║' + '  PDFLibJS - Tree Operations Test Suite'.padEnd(68) + '║');
console.log('║' + ' '.repeat(68) + '║');
console.log('╚' + '═'.repeat(68) + '╝');
console.log('\n');

const tests = [
  './element-operations.test',
  './metadata-operations.test',
  './page-operations.test',
  './query-operations.test',
  './serialization.test',
];

let totalPassed = 0;
let totalFailed = 0;

for (const test of tests) {
  try {
    require(test);
    totalPassed++;
    console.log('\n');
  } catch (error) {
    totalFailed++;
    console.error(`\n❌ Test failed: ${test}`);
    console.error(error);
    console.log('\n');
  }
}

console.log('\n');
console.log('╔' + '═'.repeat(68) + '╗');
console.log('║' + ' '.repeat(68) + '║');
console.log('║  Test Summary'.padEnd(69) + '║');
console.log('║' + ' '.repeat(68) + '║');
console.log('║  ' + `Total Tests: ${tests.length}`.padEnd(67) + '║');
console.log('║  ' + `✓ Passed: ${totalPassed}`.padEnd(67) + '║');
console.log('║  ' + `✗ Failed: ${totalFailed}`.padEnd(67) + '║');
console.log('║' + ' '.repeat(68) + '║');
console.log('╚' + '═'.repeat(68) + '╝');
console.log('\n');

if (totalFailed > 0) {
  process.exit(1);
}
