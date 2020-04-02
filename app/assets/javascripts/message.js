$(function(){

  function upper(message) {
    var upper_message =  `<div class="main__message" data-message-id=${message.id}>
                          <div class="chat-main__list__top">
                          <div class="chat-main__list__top__name">
                          ${message.user_name}
                          </div>
                          <div class="chat-main__list__top__date">
                          ${message.created_at}
                          </div>
                          </div>`;
    return upper_message;
  };

  function buildHTML(message){
      var upp = upper(message);
    if (message.content && message.image) {
      html = `${upp} 
              <div class="chat-main__list__text">
              <p class="chat-main__list__text">
              ${message.content}
              </p>
              <img src=" ${message.image} "chat-main__list__image" >
              </div>
              </div>`
    } else if (message.content) {
        html = `${upp}
                <div class="chat-main__list__text">
                <p class="chat-main__list__text">
                ${message.content}
                </p>
                </div>
                </div>`
    } else if (message.image) {
        html = `${upp}
                <div class="chat-main__list__text">
                <img src=" ${message.image} "class = "chat-main__list__image" >
                </div>
                </div>`
    };
    return html;
  }


  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this); 
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-main__list').append(html).animate({ scrollTop: $('.chat-main__list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })

  let reloadMessages = function(){
    let last_message_id = $('.main__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      if  (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message);
        });
        $('.chat-main__list').append(insertHTML);
        $('.chat-main__list').animate({ scrollTop: $('.chat-main__list')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});