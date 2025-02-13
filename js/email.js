const sheetName = 'Sheet1';
const scriptProp = PropertiesService.getScriptProperties();

function initialSetup() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    const sheet = doc.getSheetByName(sheetName);

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    // Map the header names to the corresponding parameters from the POST request
    const newRow = headers.map(function(header) {
      switch (header) {
        case 'Tanggal':
          return new Date();  // Automatically set the current date for 'Tanggal'
        case 'Name':
          return e.parameter['name'] || '';  // Use 'name' from the request or empty string
        case 'Email':
          return e.parameter['email'] || '';  // Use 'email' from the request or empty string
        case 'Subject':
          return e.parameter['subject'] || '';  // Use 'subject' from the request or empty string
        case 'Message':
          return e.parameter['message'] || '';  // Use 'message' from the request or empty string
        default:
          return e.parameter[header] || '';  // For any other headers, use their corresponding parameter
      }
    });

    // Insert the new row into the sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', row: nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: e.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
