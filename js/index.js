$(document).ready(function(){
    document.addEventListener('deviceready', deviceReady, true);

      $(document).on('click', '#sadButton', function(){
        $('#videoListsad').empty();
        getTopVideos("sad");
    });

      $(document).on('click', '#angryButton', function(){
        $('#videoListangry').empty();
        getTopVideos("angry");
    });      

      $(document).on('click', '#unmotivatedButton', function(){
        $('#videoListunmotivated').empty();
        getTopVideos("unmotivated");
    });

        $(document).on('click', '#vidPageBackButton', function(){
            $("#vidArea").empty();
        });

        $(document).on('click', 'li', function(){
            showVideo($(this).attr('videoId'));
        });
  
});

function deviceReady() {
    console.log("Device is ready");


}
function getTopVideos(feeling){
    var searchText;
    if(feeling == "sad"){
        searchText = "i feel sad";
    }

    else if(feeling == "angry") {
        searchText = "funny videos";
    } else if(feeling == "unmotivated") {
        searchText = "motivational";
    }

    $.get("https://www.googleapis.com/youtube/v3/search",
            {
                part: 'snippet',
                maxResults: 5,
                q:searchText,
                key: 'AIzaSyB9C6oHhiv8JyzlKS71R9LBhqSpXqqJv20'
                }, function(data){
                console.log(data);
                $.each(data.items, function(i, item) {
                    id = item.id.videoId;
                    title = item.snippet.title;
                    thumb = item.snippet.thumbnails.default.url;

                    console.log( title );
                    $('#videoList'+feeling).append(' <li id ="vid" videoId="'+id+'" ><a href="#vidPage"><img id="vidImg" src ="'+thumb+'"><h4>'+title+'</h4></a></li>');
                    $('#videoList'+feeling).listview().listview('refresh');
                });
                $('#backButtonArea').html('<a href="#" class="ui-icon-back ui-btn ui-mini" data-rel="back" ><h4>Back</h4></a>');
            }
        );
}

function showVideo(id) {
   var vid = 

'<iframe width="100%" height="315" src="http://www.youtube.com/embed/'+ id+'" frameborder="0" allowfullscreen></iframe></div>'+
' <a href="#" class="ui-icon-back ui-btn ui-mini" data-rel="back" id="vidPageBackButton"><h4>Back</h4></a>';   

$("#vidArea").html(vid);
         
    }
 