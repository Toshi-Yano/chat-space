$(function(){

  function upper(message) {
    var upper_message = `<div class="chat-main__list__top">
                        <div class="chat-main__list__top__name">` +
                        message.user_name +
                        `</div>
                        <div class="chat-main__list__top__date">` +
                        message.created_at +
                        `</div>
                        </div>`;
    return upper_message;
  };

  function buildHTML(message){
      var upp = upper(message);
    if (message.content && message.image) {
      html = upp + 
            `<div class="chat-main__list__text">
            <p class="chat-main__list__text">` +
            message.content +
            `</p>
            <img src="` + message.image + `"chat-main__list__image" >
            </div>`
    } else if (message.content) {
      html = upp +
            `<div class="chat-main__list__text">
            <p class="chat-main__list__text">` +
            message.content +
            `</p>
            </div>`
    } else if (message.image) {
      html = upp +
            `<div class="chat-main__list__text">
            <img src="` + message.image + `"class = "chat-main__list__image" >
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
});