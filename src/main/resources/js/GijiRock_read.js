if ($ === undefined) {
    var $ = jQuery;
}
$(function(){
    var getStamp = function(id){
        var stamp = "";
        switch (id) {
            case "st_001" :
                stamp = "st_001.png";
                break;
            case "st_002" :
                stamp = "st_002.png";
                break;
        }
        return stamp;
    }
    var getHtmlByType = function(type, content){
        var html = "";
        if (type=="stamp") {
            html = '<div id="'+content+'" />';
        } else if (type=="audio") {
            html = '<span class="mp3">'+content+'.mp3'+'</span>';
        } else {
            html = '<p>'+content+'</p>';
        }
        return html;
    };
    var pageId = $("meta[name='ajs-page-id']").attr("content");
    var jsonPath = "/confluence/download/attachments/" + pageId + "/gijirock.json?api=v2";

    $("#splitter-content").addClass("ui-widget-content");
    $.getJSON(jsonPath, function(json){
        $.each(json, function(key, value){
            var uuid = key;
            var html = '<div class="gijirockContent ui-widget-content" id='+uuid+'>';
            html = html+getHtmlByType(value["data"]["type"], value["data"]["content"]);
            html = html+'</div>';

            $("#main").append(html);
            $("#"+uuid).css("top", value["position"]["top"]+"px");
            $("#"+uuid).css("left", value["position"]["left"]+"px");

            // Dragできるようにする
            $("#"+uuid).draggable({ containment: "#splitter-content", scroll: false });
            $("#"+uuid).mouseover(function(){
                $("#"+uuid).css("border", "3px dotted #FF99FF");
            }).mouseout(function(){
                $("#"+uuid).css("border", "");
            });

        });
    });
});
