import jwt_decode from "jwt-decode";

$(document).ready(function() {
    $('#verification-btn').click(function() {
        
        // get verification code from user
        var code = $('#verification-code').val(); // get code from input box
        var savedCode = localStorage.getItem("code"); // get code from local storage

        code = parseInt(code); 
        savedCode = parseInt(savedCode);

        if(code == savedCode){ 

            // catch token from localstorage
            var token = localStorage.getItem('token');

            try {
                // Decode the JWT token
                var decodedToken = jwt_decode(token);

                // Access the email from the decoded payload
                var email = decodedToken.email;

                // Use the email as needed
                console.log("Email:", email);
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }


            //window.location.href = "../html/ask.html";
        }
        else{
            $('#verified-status').text('Verification Failed !!!')
        }


        
        // // Replace with your actual login endpoint.
        // var loginEndpoint = 'https://example.com/api/login';

        // // Construct the data to send to the server (username and password).
        // var data = {
        //     username: username,
        //     password: password
        // };
        // $.ajax({
        //     type: 'POST',
        //     url: loginEndpoint,
        //     data: data,
        //     success: function(response) {
        //         // Assuming the authentication token is in the 'token' field of the response.
        //         var authToken = response.token;

        //         // Save the authentication token in localStorage.
        //         localStorage.setItem('authToken', authToken);

        //         // Redirect to another page or perform other actions.
        //         window.location.href = 'dashboard.html';
        //     },
        //     error: function(jqXHR, textStatus, errorThrown) {
        //         // Handle login errors.
        //         $('#result').html('Login failed: ' + errorThrown);
        //     }
        // });
    });
});
