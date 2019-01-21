$(function() {

  function buildHTML(user) {
    var html =`<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html;
  }

  function add_member(id, userName) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${userName}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`
    return html;
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var groupId = $('.chat__group_id').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(data) {
      $('#user-search-result').empty();
      if (data.length !==0) {
        data.forEach(function(data){
          var html = buildHTML(data);
          $('#user-search-result').append(html)
        });
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  $("#user-search-result").on("click",".chat-group-user .user-search-add",function() {
    var id = $(this).attr("data-user-id")
    var userName = $(this).attr("data-user-name")
    var html = add_member(id, userName);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });

  $("#chat-group-users").on("click",".chat-group-user__btn--remove",function() {
    $(this).parent().remove();
  });
});
