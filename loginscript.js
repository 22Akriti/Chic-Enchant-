document.getElementById("loginForm").addEventListener("submit", function(event) {
	event.preventDefault();
	
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	if ( email === "" || password === "") {
		alert("Please fill in all fields.");
		return;
	}

	var existingUsers = JSON.parse(localStorage.getItem('users')) || [];

	var user = existingUsers.find(function(user) {
		return user.email === email && user.password === password;
	  });
	
	if (user) {
		localStorage.setItem('loggedInUserEmail', email);
		window.location.href = "profile.html";
	} else {
		alert("Invalid credentials. Please try again.");
	}
});

document.getElementsByClassName("close")[0].addEventListener("click", function() {
	window.close();
});