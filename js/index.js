$(document).ready(function(){
    document.addEventListener('deviceready', deviceReady, true);

      $(document).on('click', '#sadButton', function(){
        $('#videoListsad').empty();
        findVideos("sad");
    });

      $(document).on('click', '#angryButton', function(){
        $('#videoListangry').empty();
        findVideos("angry");
    });      

      $(document).on('click', '#unmotivatedButton', function(){
        $('#videoListunmotivated').empty();
        findVideos("unmotivated");
    });

        $(document).on('click', '#vidPageBackButton', function(){
            $("#vidArea").empty();
        });

        $(document).on('click', '#boredButton', function(){
            $("#videoListbored").empty();
            getMostViewedVideo();
        });
        $(document).on('click', 'li', function(){
            showVideo($(this).attr('videoId'));
        });
  
});

function deviceReady() {
    console.log("Device is ready");


}
function findVideos(feeling){
    var searchText;
    var maxResults;
    if(feeling == "sad"){
        searchText = "how to not be sad";
        maxResults=5;
    }

    else if(feeling == "angry") {
        searchText = "funny videos";
        maxResults = 5;
        order = 'relevance';
    } else if(feeling == "unmotivated") {
         maxResults = 5;
         order ='relevance';
        searchText = "motivational";
    } else if(feeling =="bored") {
        searchText = ""
        maxResults=1;
    }

    $.get("https://www.googleapis.com/youtube/v3/search",
            {
                part: 'snippet',
                maxResults: maxResults,
                q:searchText,
                key: 'AIzaSyB9C6oHhiv8JyzlKS71R9LBhqSpXqqJv20'
                }, function(data){
                    putVideosOnListView(data, feeling);}
        );
}

function showVideo(id) {
   var vid = '<iframe width="100%" height="315" src="http://www.youtube.com/embed/'+ id+'" frameborder="0" allowfullscreen></iframe></div>'+
' <a href="#" class="ui-icon-back ui-btn ui-mini" data-rel="back" id="vidPageBackButton"><h4>Back</h4></a>';   
    $("#vidArea").html(vid);     
}

    function putVideosOnListView(data, feeling) {
        console.log(data);
                $.each(data.items, function(i, item) {
                    if(feeling=="bored"){ id = item.id;} else{ id = item.id.videoId;
}
                    title = item.snippet.title;
                    thumb = item.snippet.thumbnails.default.url;

                    console.log( title );
                    $('#videoList'+feeling).append(' <li id ="vid" videoId="'+id+'" ><a href="#vidPage"><img id="vidImg" src ="'+thumb+'"><h4>'+title+'</h4></a></li>');
                    $('#videoList'+feeling).listview().listview('refresh');
                });
                $('#backButtonArea').html('<a href="#" class="ui-icon-back ui-btn ui-mini" data-rel="back" ><h4>Back</h4></a>');}

    function getMostViewedVideo() {
        $.get("https://www.googleapis.com/youtube/v3/videos",
            {
                part:'snippet',
                chart:'mostPopular',
                key: 'AIzaSyB9C6oHhiv8JyzlKS71R9LBhqSpXqqJv20'
            }, function(data){
                console.log(data);
                putVideosOnListView(data, "bored");}
            );
    }
 