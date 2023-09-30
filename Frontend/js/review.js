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
        var unReviewedQuestionEndPoint = 'http://localhost:8080/api/auth/contribution/unreview/' + email;
        
        $.ajax({
            type: "GET",
            url: unReviewedQuestionEndPoint,
            dataType: "json",
            success:function(contributions){
    
                if(contributions === null){
                    const $ratingStatus = $("<p>");
                    $ratingStatus.text("Nothing for review")
                    $("#unreviewed-question").append($ratingStatus);
                }
                else{
    
                    $.each(contributions, function (index, item) {
    
                    
                        // Create a list item for each item and append it to the ul
                        $("#unreviewed-question").append("<p>" + "প্রশ্ন : " + item.question + "?" + "</p>");
                        $("#unreviewed-question").append("<p>" + "উত্তর : " + item.answer + "</p>");
        
                        //set an input field for taking rating
                        const $ratingInput = $("<input>");
                        $ratingInput.attr("type", "text");
                        $ratingInput.attr("placeholder", "Enter your rating");
        
                        $("#unreviewed-question").append($ratingInput);
        
                        //set a button to every  list item
                        const $ratingButton = $("<button>");
                        $ratingButton.text("Save");
        
                        const $ratingStatus = $("<p>");
        
                        $("#unreviewed-question").append($ratingButton);
                        $("#unreviewed-question").append($ratingStatus);
        
                        $ratingButton.click(function(){
        
                            $ratingStatus.text("Wait for few seconds...")
                            const ratingData = $ratingInput.val();
                            const contributionID = item.id;
                            const rating = parseInt(ratingData)
        
                            var data = {
                                rating: rating,
                                reviewer : email,
                                contribution_id: parseInt(contributionID)
                            }
        
                            
                            var reviewSaveEndPoint = 'http://localhost:8080/api/auth/review/add';
        
                            $.ajax({
                                type: 'POST',
                                url: reviewSaveEndPoint,
                                contentType: 'application/json',
                                data: JSON.stringify(data),
                                dataType: 'text',
                                success: function(response){
                                    $ratingStatus.text(response)
                                },
                                error: function(jqXHR, textStatus, errorThrown){
                                    $ratingStatus.text(errorThrown)
                                }
                            })
                        })
        
                    });
                }
                
            },
            error: function () {
                console.error("Failed to fetch unreviewed contributions.");
            }
        })
    }

});