const { PrivacyPage } = require('../src/components/Mypost'); // Import the login module or function

describe('Login Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5000/api/users/Mypost');
  });

  afterEach(() => {
  });

  test('USer Change Privacy Succesfuly', () => {
    const Privacy = 'Public';
    const result = ChangePrivacy(Privacy);
    expect(result).toBeTruthy();
  });

  test('Sorry You have faild to chang privacy', () => {
  
    const Privacy = 'Public';
    const result = changePrivacy(Privacy );
    expect(result).toBeFalsy();
  });
});
