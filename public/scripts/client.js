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
<p>${timeago.format(data.created_at)}</p>
<div class="icons">
  <i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-heart"></i>

 </div>
</footer>
  </article>`;
return markup;
  };

  
  const renderTweet = (tweetArr) => {
    $(".tweets-container").empty();
    for (const tweet of tweetArr) {
      const $tweet = createTweetElement(tweet);
      $(".tweets-container").prepend($tweet);
    }
    return;
  };

  function loadTweets () {
    $.ajax({
      type: 'GET',
      url: "/tweets",
      dataType: 'json',
      success: (data) => {
        renderTweet(data);
      },
  
      error: (err) => {
        console.log(`There was an error: ${err}`);
      }
  
    })




  //submit a new tweet via form
  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    if (!event.target[0].value.length) return displayError("No content!");
    if (event.target[0].value.length > 140) return displayError("Too long!");
    
    const data = $(event.target).serialize();
    $(event.target)[0].reset();
    //console.log(' event - > ',event);

    //let text = $(this).serialize();


        $.ajax({
          type: "POST",
          url: '/tweets',
          //data: text,
          data,
          dataType: 'json',
          }).done(function(response){
            //console.log("Tweets are reloading", response);
            loadTweets();
          }).catch((response)=> {
            //console.log("Tweets are error", response);
            loadTweets();
          }) ;
        
        });


        //display error on new tweet form
  const displayError = (msg) => {
    const $alert = $("#alert");
    $alert.addClass("notification");
    $alert.text(msg);
    setTimeout(function () {
      $alert.removeClass("notification");
      $alert.text("");
    }, 2700);
  };

        // $.ajax(`/tweets`, { type: "POST",text, success: 
        //   loadTweets });
        // });
          

  /*.done( data => {
    console.log(data);
      renderTweet(data)
  })*/
}
loadTweets()
  });
