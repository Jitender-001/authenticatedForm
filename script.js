let otpBtn = document.getElementById('otp-btn');
let otpField = document.getElementById('otp-field');
let regBtn = document.getElementById('register');
let otpInput = document.getElementById('otp');

otpBtn.addEventListener('click',()=>{
    otpField.style.display = 'block';
    otpBtn.style.display = 'none';
    regBtn.style.display = 'block';
    // regBtn.innerText="Register";
    otpInput.setAttribute('required','true');
});