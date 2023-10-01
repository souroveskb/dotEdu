$(document).ready(function(){
    var token = localStorage.getItem('token')
    if(token == null){
        window.location.href = "../html/login.html"
    }
    else{

        // fetch provided question and ask our AI model
        $('#ask-question-btn').click(function(event){

            $('#ask-ans-section').text("wait while your query is Processing...");
            event.preventDefault();
            var question = $('#ask-question-input').val();

            var queryEndPoint = 'http://192.46.214.108:5001/query'
            var data = {
                query : question,
                description: "string"
            }
            $.ajax({
                type: 'POST',
                url: queryEndPoint,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(response){
                    $('#ask-ans-section').text("উত্তর : " + response.output_text);
                    $('#ask-save-btn').show()
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.log(errorThrown)
                }
            })
        });

        //store the question-answer in history
        $('#ask-save-btn').click(function(event){

            event.preventDefault();
            var payload = JSON.parse(atob(token.split('.')[1]));
            var user = payload.sub; // fetch the user form token

            $('#history-section').text("wait a few moment...");
            var historySaveEndPoint = 'http://localhost:8080/api/auth/history/add';
            var question = $('#ask-question-input').val();
            var answer = $('#ask-ans-section').text();
            var data = {
                user : user,
                question: question,
                answer : answer
            }

            $.ajax({
                type: 'POST',
                url: historySaveEndPoint,
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                dataType: 'text',
                success: function(response){
                    $('#history-section').text(response);
                },
                error: function(jqXHR, textStatus, errorThrown){
                    $('#history-section').text(errorThrown);
                }
            })
            
        });
    }
})