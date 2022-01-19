const logout = () => {
    $.ajax({
      url: '/api/users/logout',
      type: 'POST',
      dataType: 'json',
      success: () => {
        document.location.replace('/');
      },
      error: (response) => {
          alert(response.statusText);
      }
    });
}
  
$('#logout').click(logout);