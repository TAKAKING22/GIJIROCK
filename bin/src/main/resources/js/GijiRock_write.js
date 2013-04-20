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
        //var pageId = $("meta[name='ajs-page-id']").attr("content");
        //        var jsonPath = "/confluence/download/attachments/" + pageId + "/gijirock.json?api=v2";
        //        $.getJSON(jsonPath, function(json){
        //            return json;
        //        });
        // 
        var editPath = "/confluence/pages/editpage.action?pageId=" + pageId;
        $.get(editPath, function(data){
            var tmp = $(data).find("#wysiwygTextarea").val();
            if (tmp.indexOf("gijirock.json") == -1) {
                return;
            }
            rex = new RegExp("table+class%3D%22wysiwyg-macro%22+style%3D%22background-image%3A+url%28%27http%3A%2F%2FP20262%3A1990%2Fconfluence%2Fplugins%2Fservlet%2Fconfluence%2Fplaceholder%2Fmacro-heading%3Fdefinition%3De2V4cGFuZDp0aXRsZT1naWppcm9jay5qc29ufQ%26amp%3Blocale%3Dja_JP%26amp%3Bversion%3D2%27%29%3B+background-repeat%3A+no-repeat%3B%22+data-macro-name%3D%22expand%22+data-macro-parameters%3D%22title%3Dgijirock.json%22+data-macro-body-type%3D%22RICH_TEXT%22%3E%3Ctbody%3E%3Ctr%3E%3Ctd+class%3D%22wysiwyg-macro-body%22%3E%3Cp%3E(.*)%3C%2Fp%3E%3C%2Ftd%3E%3C%2Ftr%3E%3C%2Ftbody%3E%3C%2Ftable", "i");
            if (tmp.match(rex)) {
                return JSON.parse(decodeURI(RegExp.$1));
            }
            else {
                return;
            }
        })
    }
    
    // pageId
    var pageId = $("meta[name='ajs-page-id']").attr("content");
    // previous focus object
    var preFocus = document.activeElement;
    // temporary gijiroku
    var tempGiji = getGijiroku();
    if (tempGiji === undefined) {
        tempGiji = {};
    }
	// editToken
	var editToken;
    
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
            
            // post
            $.ajax({
                type: "post",
                url: "/confluence/pages/doattachfile.action?pageId=" + pageId,
                enctype: 'multipart/form-data',
                data: {
                    bytes: "gijirock.json"
                },
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
