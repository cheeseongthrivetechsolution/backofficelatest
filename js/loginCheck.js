if (!localStorage.getItem('token')) {
    parent.location.href = "login.html#" + localStorage.getItem('merchant');
  }
  
