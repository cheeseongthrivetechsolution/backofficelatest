//Login Submit callback from recaptcha
function onSubmit(token) {
  $(".errorMsg").hide();
  let username = document.loginForm.username;
  let password = document.loginForm.password;
  if(username.value.trim() == "" ) {
     username.focus();
     $(".usernameErr").show();
     return false;
  }
  if(password.value.trim() == "" ) {
     password.focus();
     $(".passwordErr").show();
     return false;
  }
  var postData = {
    username: username.value.trim(),
    password: password.value.trim(),
    recaptcha: token,
    lang: config.lang,
  }
  $('#login_btn').prop("disabled",true)
  //Login
  $.ajax({
    url: API_ENDPOINT + "user/login.php",
    dataType: "json",
    type: "POST",
    data: postData,
    success: function(data) {
      $('#login_btn').prop("disabled",false)
      data = Common.parseObj(data);
      localStorage.setItem("iframePath","");
      if(data.code == 200) {
        window.localStorage.token = data.token;
        window.localStorage.username = postData.username;
        window.location.replace("/");
      } else {
        Common.addAlert(data.msg,data.code)
      }
    },
    error: function(data) {
      console.log("data error");
      $('#login_btn').prop("disabled",false)
    }
  });
}

$(function() {
  //Define actions
  $("#zh_translator").on("click", function() {
  	Common.setLanguage("ZH");
    Common.translation();
  });
  $("#en_translator").on("click", function() {
  	Common.setLanguage("EN");
    Common.translation();
  });
});
