/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  

  const createTweetElement = function (data) {

    //escape function to avoid XSS attack
  const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const markup = `<article class="tweets">
                   <header class="article-tweets" >
                       <div class="name">
                           <div class="nametag"> 
                              <img src="${data.user.avatars}">              
                                 <p>${data.user.name}</p>
                           </div>
                               <div class="handle">
                                   <p>${data.user.handle}</p>
                               </div>
                        </div>
                    </header>
                        <content>
                             <p style="padding: 15px;">${escape(data.content.text)}</p>
                        </content>
                     <hr style="width:100%;text-align:left;margin-left:0">
                  <footer>
                     <p>${timeago.format(new Date(data.created_at))}</p>
                       <div class="icons">
                          <i class="fas fa-flag"></i>
                          <i class="fas fa-retweet"></i>
                          <i class="fas fa-heart"></i>
                      </div>
                  </footer>
                </article>`;
return markup;
  };

  //adding all the tweets
  const renderTweet = function (tweetArr) {
    //$(".tweets-container").empty();
    for (const tweet of tweetArr) {
      const $tweetElement = createTweetElement(tweet);
      $(".tweets-container").prepend($tweetElement);
    }
    return;
  };



  //submit a new tweet via form
  $("#submitTweet").on("submit", function(event) {
    event.preventDefault();

     //display error on new tweet form
     const displayError = (msg) => {
      const $alert = $("#alert");
      $alert.addClass("notification");
      $alert.text(msg);
      setTimeout(function () {
      $alert.removeClass("notification");
      $alert.text("");
      }, 2000);
    };

    if (event.target[0].value.length > 140) return displayError("Too long!");
    else if (!event.target[0].value.length) return displayError("No content!");

    //const data = $(event.target).serialize();
    const data = $(this).serialize();
    
    //$(event.target)[0].reset();

        $.ajax({
          method: "POST",
          url: "/tweets",
          data,
          //dataType: 'json',
          }).done(function(response){
            $("#tweet-text").val("");
            $(".counter").text("140");
            $(".tweets-container").empty();

            loadTweets();

          }).catch((err)=> {
            console.log(`There was an error: ${err}`);
          }) ;
        
        });


      
    //using get for loading all tweets
  function loadTweets () {

     $.ajax({
      method: 'GET',
      url: "/tweets",
      dataType: 'json',
      success: (data) => {
        renderTweet(data);
      },
  
      error: (err) => {
        console.log(`There was an error: ${err}`);
      }
  
    })    
}


loadTweets()

});
