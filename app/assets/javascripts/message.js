$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="user-name">
                    ${ message.user_name }
                  </div>
                  <div class="update">
                    ${ message.time }
                  </div>
                  <div class="lower-message">
                    <p class="content">
                      ${ message.content }
                    </p>
                  </div>
                </div>`
      return html;
  }
  function scroll() {
      $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
      })
    .done(function(data){
    console.log(data)
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(){
        alert('error')
        $('.form__submit').prop('disabled', false);
    })
  })
});