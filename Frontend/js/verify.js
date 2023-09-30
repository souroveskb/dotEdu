

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
                //payload.sub contains user's email
                var payload = JSON.parse(atob(token.split('.')[1]));
               
            } catch (e) {
                console.log(e);
            }

            //fetch user details url
            var getUserDetailsEndPoint = 'http://127.0.0.1:8080/api/auth/getUser/' + payload.sub;
            
             
            $.ajax({
                type: 'GET',
                url: getUserDetailsEndPoint,
                contentType: 'application/json',
                dataType: 'json',
                success: function(response) {
                    
                    var id = response.id; //catch user id

                    //url for updating verification status
                    var updateVerificationStatus = 'http://127.0.0.1:8080/api/auth/verify/update/' + id;

                    
                    var data = {
                        name : response.name,
                        email : response.email,
                        password : response.password,
                        token : response.token,
                        role : response.role,
                        verified : true
                    };

                    // ajax request for updating verification status
                    $.ajax({
                        type: 'PUT',
                        url: updateVerificationStatus,
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                        dataType: 'json',
    
                        success: function(response){
                            if(response.verified){
                                window.location.href = "../html/ask.html";
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown){
                            $('#verified-status').text('Verification Failed !!!');
                        }
                    });

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $('#verified-status').text('Verification Failed !!!')
                }
            });
            
        }
        else{
            $('#verified-status').text('Verification Failed !!!')
        }        
    });
});
