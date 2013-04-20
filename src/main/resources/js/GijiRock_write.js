var GijiRock = function(){
    var createUUId = function(n){
        var CODE_TABLE = "0123456789" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz";
        var uuid = "";
        for (var i = 0, k = CODE_TABLE.length; i < n; i++) {
            uuid += CODE_TABLE.charAt(Math.floor(k * Math.random()));
        }
        return uuid;
    }
    
    var getGijiroku = function(){
        if ($("#page-comments") == undefined) {
            return;
        }
        grFlg = true;
        var valllll = $("#page-comments>li:first-child").find(".comment-content>p").html();
        if (valllll == undefined || valllll.indexOf("content") == -1) {
            return;
        }
        else {
            commentId = $("#page-comments>li:first-child").attr("id").replace("comment-thread-", "");
            return JSON.parse(decodeURI(valllll));
        }
        return;
    }
    
    // pageId
    var pageId = $("meta[name='ajs-page-id']").attr("content");
    // previous focus object
    var preFocus = document.activeElement;
    // already this page have gijirock
    var grFlg = false;
    // commentId
    var commentId = null;
    // temporary gijiroku
    var tempGiji = getGijiroku();
    if (tempGiji === undefined) {
        tempGiji = {};
    }
    
    // call textarea
    var textArea = $('<textarea>').attr({
        "row": "15",
        "cols": "50"
    }).css({
        "position": "absolute",
        "bottom": 100,
        "right": 100
    });
    $("body").append(textArea);
    textArea.focus();
    
    // bind save
    textArea.bind("keyup", function(event){
        if (event.altKey === true && event.which === 13) {
            // trim
            var inputText = textArea.val().trim();
            // text Area remove
            textArea.remove();
            // if length is 0, then nothing to do.
            if (inputText.length < 1) {
                preFocus.focus();
                return;
            }
            // prepare json
            var uuid = createUUId(8);
            tempGiji[uuid] = {
                "position": {
                    "top": 10,
                    "left": 10
                },
                "data": {
                    "type": "comment",
                    "content": inputText
                }
            }
            var jSonGiji = $.toJSON(tempGiji);
            var encodeGiji = encodeURI(jSonGiji);
            
            // div
            if (grFlg) {
                console.log("trueeeeeeeeee");
                var urls = "/confluence/pages/doeditcomment.action?pageId=" + pageId + "&commentId=" + commentId;
                var datas = {
                    "atl_token": $("meta[name='atlassian-token']").attr("content"),
                    "wysiwygContent": encodeGiji,
                    "confirm": "Save"
                }
            }
            else {
                console.log("falseeeeee");
                var urls = "/confluence/rest/tinymce/1/content/" + pageId + "/comment?actions=true"
                var datas = {
                    "html": encodeGiji,
                    "watch": "true"
                }
            }
            
            // post
            $.ajax({
                type: "post",
                url: urls,
                data: datas,
                success: function(data){
                    alert("let's Gooooooooooooooooooooooooooooo!!!");
                }
            });
            preFocus.focus();
        }
        else 
            if (event.which === 27) {
                textArea.remove();
                preFocus.focus();
                return;
            }
    });
};
