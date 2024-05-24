document.getElementById("signUpForm").addEventListener("submit", function(event) {
	event.preventDefault();

	var Name = document.getElementById("fullName").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("confirmPassword").value;
	var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

	var existingUser = existingUsers.find(function(user) {
	  return user.email === email;
	});

	if (Name === "") {
		alert("Please enter your full name.");
		return;
	}

	if (email === "") {
		alert("Please enter your email address.");
		return;
	}

	if (password === "") {
		alert("Please enter a password.");
		return;
	}

	if (confirmPassword === "") {
		alert("Please confirm your password.");
		return;
	}

	if (password !== confirmPassword) {
		alert("The passwords do not match.");
		return;
	}

	if (existingUser) {
		alert("This email is already registered. Please use a different email address.");
		return;
	}

	existingUsers.push({
		name: Name,
		email: email,
		password: password
	});
	  localStorage.setItem('users', JSON.stringify(existingUsers));
	  localStorage.setItem('loggedInUserEmail', email);
	  showPopup();
	window.location.href = "profile.html";
	});

function showPopup() {
    document.getElementById("popup").style.display = "block";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementsByClassName("close")[0].addEventListener("click", function() {
	window.close();
});