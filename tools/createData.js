/**
 * ベースは以下のサイトから流用、createDataのところを調整する
 * https://developers.google.com/sheets/api/quickstart/nodejs?hl=ja
 */

const fs = require('fs');
const fsEx = require('fs-extra');
const { google } = require('googleapis');
const { authorize } = require('./_GSA');

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, (err, {data}) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

/**
 * create Data
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function createData(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get(
    {
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms', // <= spread sheet ID
      range: 'Class Data!A2:E', // <= シート名と取得するセルの範囲
    },
    (err, {data}) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const rows = data.values;
      if (rows.length) {
        fsEx.outputFileSync(`${__dirname}/sample.json`, JSON.stringify(rows, null, '  '));
      } else {
        console.log('No data found.');
      }
    },
  );
}

// Load client secrets from a local file.
fs.readFile(`${__dirname}/client_secret.json`, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), createData);
});