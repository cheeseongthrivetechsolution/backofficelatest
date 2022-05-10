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
  var param = {
    username: username.value.trim(),
    password: password.value.trim(),
    recaptcha: token,
    lang: config.lang,
  }
  $('#login_btn').prop("disabled",true)
  //Login
  $.ajax({
    url: config.apiUrl + "user/login",
    dataType: "json",
    type: "POST",
    data: param,
    success: function(data) {
      $('#login_btn').prop("disabled",false)
      data = Common.parseObj(data);
      if(data.code == 200) {
        window.localStorage.token = data.token;
        window.localStorage.username = param.username;
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

  var code = window.location.hash.substr(1);
  //reset localstorage
  var language = localStorage.getItem('language');
  localStorage.clear();
  localStorage.setItem('language', language);
  localStorage.setItem('merchant', code);

  //check merchant code
  if (code == '') {
    window.location.replace("/iprestrict.html");
  } else {
    Common.getMerchantInfo(code);
  }

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
