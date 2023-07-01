const generatePassword:()=>string =  () => {
    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const allLetters = uppercaseLetters + lowercaseLetters;
    const passwordLength = 8;
  
    let password = '';
  
    const randomUppercaseLetter = uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length));
    password += randomUppercaseLetter;
  
    const randomLowercaseLetter = lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length));
    password += randomLowercaseLetter;
  
    const remainingLength = passwordLength - password.length;
    for (let i = 0; i < remainingLength; i++) {
      const randomChar = allLetters.charAt(Math.floor(Math.random() * allLetters.length));
      password += randomChar;
    }
  
    const shuffledPassword = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return shuffledPassword;
  }

  export default generatePassword;