

$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function() {

    let tweetText = $(this).val();
    let tweetLength = tweetText.length;
    let charactersRemaining = 140 - tweetLength;
		
    $('output').text(charactersRemaining).css('color', charactersRemaining < 0 ? 'red' : '');

  });
});