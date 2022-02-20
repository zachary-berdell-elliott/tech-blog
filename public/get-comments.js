const urlText = window.location.href.substring(0, window.location.href.indexOf('/blog'));
console.log(urlText);
const blogId = $('#blog-content').attr('data-id');

$.ajax({
    url: '/api/comments/blog-comments/' + blogId,
    dataType: 'json',
    type: 'GET',

    success: function(result){
        console.log(result);
        result.forEach(comment => {
            $('#comment-section').each(function(){
                console.log($(this).parent().attr('blog-id'));
                if($(this).parent().attr('blog-id') == comment.post_id){
                    $(this).append(`<article class="comment-block tb-site-container">

                        <span>${comment.user.name}</span>
                        <span class="text-center">${comment.date_created}</span>
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