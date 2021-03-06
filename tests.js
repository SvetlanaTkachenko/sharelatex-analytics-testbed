var assert = require('assert'),
	baseTestQueriesDir = './sql-test-queries/';

module.exports = {
	SimpleSelect: {
		testQueryFile: baseTestQueriesDir + 'simple-select-events.sql',
		testAssertion: (resultSet) => {
			console.log(`Expecting 15 "user-logged-in" events.\nGot ${ resultSet.rowCount }.`);
			return (resultSet.rowCount === 15);
		}
	},
	SelectDistinctEvents: {
		testQueryFile: baseTestQueriesDir + 'select-distinct-events.sql',
		testAssertion: (resultSet) => {
			console.log(`Expecting 17 different events.\nGot ${ resultSet.rowCount }.`);
			return (resultSet.rowCount === 17);
		}
	},
	EventsFunnel: {
		testQueryFile: baseTestQueriesDir + 'seq-funnel.sql',
		testAssertion: (resultSet) => {
			var result = resultSet.rows[0];
			console.log(`Expecting E1 = 1, E2 = 1 and E3 = 1.\nGot E1 = ${ result.e1 }, E2 = ${ result.e2 } and E3 = ${ result.e3 }.`);
			// console.log(resultSet.rows);
			
			// COUNT(*) results need to be cast to integers.
			// https://github.com/brianc/node-postgres/issues/378.
			return (
				parseInt(resultSet.rows[0].e1, 10) === 1 &&
				parseInt(resultSet.rows[0].e2, 10) === 1 &&
				parseInt(resultSet.rows[0].e3, 10) === 1
			);
		}
	}
}
