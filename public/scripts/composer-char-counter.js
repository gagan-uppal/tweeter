

$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('focus blur keyup change paste', function() {

    let tweetText = $(this).val();
    let tweetLength = tweetText.length;
    let charactersRemaining = 140 - tweetLength;
		
    $('output').text(charactersRemaining).css('color', charactersRemaining < 0 ? 'red' : '');

  });
});