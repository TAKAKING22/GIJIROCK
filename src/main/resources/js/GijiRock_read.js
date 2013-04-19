$(function(){
    var pageId = $("meta[name='ajs-page-id']").attr("content");
    var jsonPath = "/confluence/download/attachments/" + pageId + "/gijirock.json?api=v2";
    $.getJSON(jsonPath, function(json){
        $(json).each(function(){
            console.log(this["data"]["content"]);
        });
    });
});
