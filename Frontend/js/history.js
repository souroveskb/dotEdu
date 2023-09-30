$(document).ready(function(){
    var isAuthenticated = localStorage.getItem('token')

    if (isAuthenticated == null) {

        // If not authenticated, redirect to the login page
        window.location.href = '../html/login.html';
    }
    else{
        try{
            var payload = JSON.parse(atob(isAuthenticated.split('.')[1]));
            var email = payload.sub;
        }
        catch(e){
            console.log(e);
        }
    
        // history data fetching endpoint
        var userHistoryEndPoint = 'http://localhost:8080/api/auth/history/' + email;
        
        function createCard(item) {
            var cardHtml = `
                <div class="card-item">
                    <div class="card-body">
                        <h6 class="card-title"> প্রশ্ন : ${item.question} ?</h6>
                        <p class="card-text"> উত্তর :  ${item.answer}</p>
                    </div>
                </div>
            `;
            return cardHtml;

        }

        var cardContainer = $("#card-container"); 
        cardContainer.empty();

        $.ajax({
            type: "GET",
            url: userHistoryEndPoint,
            dataType: "json",
            success: function(response){
                if(response == null){

                }
                else{
                    $.each(response, function(index, item){
                        var cardHtml = createCard(item);
                        cardContainer.append(cardHtml);
                    })
                }
            }
        })
    }
    
})