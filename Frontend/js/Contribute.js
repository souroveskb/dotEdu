$(document).ready(function() {
    
    var isAuthenticated = localStorage.getItem('token')

    if (isAuthenticated == null) {

        // If not authenticated, redirect to the login page
        window.location.href = '../html/login.html';
    }
    $('#contribution-btn').click(function(event){
        $('#contribution-status').text('Wait for a moment....');
        event.preventDefault();

        //get the input value
        var question = $('#contribution-ques-field').val();
        var ans = $('#contribution-ans-field').val();

        var token = localStorage.getItem('token');
        try {
            //payload.sub contains user's email
            var payload = JSON.parse(atob(token.split('.')[1]));
           
        } catch (e) {
            $('#contribution-status').text(e);
        }
        var email = payload.sub;

        var contributionEndPoint = 'http://localhost:8080/api/auth/contribution/add';

        var data = {
            contributor: email,
            question : question,
            answer: ans,
            reviewedBy: 0
        }

        $.ajax({
            type: 'POST',
            url: contributionEndPoint,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            dataType: 'text',
            success: function(response){
                $('#contribution-status').text(response);
            },
            error: function(jqXHR, textStatus, errorThrown){
                $('#contribution-status').text(errorThrown);
            }
        })
    });
});
