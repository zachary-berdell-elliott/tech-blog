const urlText = window.location.href.substring(0, window.location.href.indexOf('/blog'));
const blogId = $('#blog-content').attr('data-id');

$.ajax({
    url: urlText + 'api/comments/blog-comments/' + blogId,
    dataType: 'json',
    type: 'GET',

    success: function(result){
        console.log(result);
        /*result.forEach(comment => {
            $('.blog-block').each(function(){
                console.log($(this).parent().attr('blog-id'));
                if($(this).parent().attr('blog-id') == comment.post_id){
                    $(this).append(`<article class="comment-block">
                    <span>${comment.user.name}</span>
                    <span>${comment.date_created}</span>
                    <p>${comment.commentContent}</p>
                </article>`);
                }
            })
        }); */
    },

    error: function(){
       // alert("Failed to load comments.");
    }
});