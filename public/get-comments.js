const urlText = window.location.href.substring(0, window.location.href.indexOf('/blog'));
console.log(urlText);
const blogId = $('#blog-content').attr('data-id');

$.ajax({
    url: '/api/comments/blog-comments/' + blogId,
    dataType: 'json',
    type: 'GET',

    success: function(result){
        result.forEach(comment => {
            console.log(comment)
            $('#comment-section').each(function(){
                if($(this).parent().attr('blog-id') == comment.post_id){
                    $(this).append(`<article class="comment-block tb-site-container">
                    <h3 class="d-flex">
                        <span>${comment.user.name}</span>
                        <span class="ms-auto me-1">${comment.date_created}</span>
                    </h3>
                    <p>${comment.comment_content}</p>
                </article>`);
                }
            })
        });
    },

    error: function(){
       alert("Failed to load comments.");
    }
});