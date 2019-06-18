var password = document.getElementById("password")
, confirm_password = document.getElementById("confirm_password");

function validatePassword() {
if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("vui lòng nhập lại");
} else {
    confirm_password.setCustomValidity('');
}
}
password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;