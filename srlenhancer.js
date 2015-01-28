// move empty columns to the end
// when only one item in each column, just move one column instead of both items
// port to firefox

$(function(){
    $("#ls_sidebar").append("<div id=\"ls_morecontrols\"></div>");
    $("#ls_sidebar").append("<div id=\"ls_extracontrols\" style=\"width:50%;margin-left:auto;margin-right:auto\"></div>");
    $("#ls_extracontrols").append("<span class=\"numperrow\" id=\"lessperrow\">-</span>");
    $("#ls_extracontrols").append("<span class=\"numperrow\" id=\"moreperrow\">+</span>");

    $("#ls_controls").html("<span class=\"numperrow\" id=\"1perrow\">1</span><span class=\"numperrow\" id=\"2perrow\">2</span><span class=\"numperrow\" id=\"3perrow\">3</span><span class=\"numperrow\" id=\"4perrow\">4</span>")
    $("#ls_morecontrols").html("<span class=\"numperrow\" id=\"5perrow\">5</span><span class=\"numperrow\" id=\"6perrow\">6</span><span class=\"numperrow\" id=\"7perrow\">7</span><span class=\"numperrow\" id=\"8perrow\">8</span>")

    $("#1perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(1); });
    $("#2perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(2); });
    $("#3perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(3); });
    $("#4perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(4); });
    $("#5perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(5); });
    $("#6perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(6); });
    $("#7perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(7); });
    $("#8perrow").click(function(){ if(!$('.numperrow').hasClass('disabled2')) streamsPerRow(8); });

    $("#moreperrow").click(function(){
        if (!$('.numperrow').hasClass('disabled2')) streamsPerRow($(".ls_streams .ls_column").length+1);
    });
    $("#lessperrow").click(function(){
        if (!$('.numperrow').hasClass('disabled2')) streamsPerRow($(".ls_streams .ls_column").length-1);
    });

    $(".ls_column:hidden").remove();

    $("#streamTemplate").replaceWith("<script id=\"streamTemplate\" type=\"text/x-jquery-tmpl\">"
                                        +"<div class=\"ls_namebar\">"
                                            +"<table><tr><td colspan=\"2\"><div class=\"ls_name\"><div class=\"ls_padder\"><strong><a href=\"/profiles/#!/${srlname}/1\">${srlname}</a></strong></div></div></td>"
                                                +"<td class=\"ls_icons\"><a class=\"moveLeftIcon\" title=\"Move stream left\"><span>[moveLeft]</span></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"moveUpIcon\" title=\"Move stream up\"><span>[moveUp]</span></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"moveDownIcon\" title=\"Move stream down\"><span>[moveDown]</span></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"moveRightIcon\" title=\"Move stream right\"><span>[moveRight]</span></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"moveButtonSpacer\"></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"chatIcon\" title=\"Popout Chat\" onClick=\"window.open('http://www.twitch.tv/chat/embed?channel=${twitch}&popout_chat=true','_blank','width=400,height=550,scrollbars=no,toolbar=no')\"><span>[chat]</span></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"collapseIcon ${collapseid}\" title=\"Hide/Show\"><span>[collapse]</span></a></td>"
                                                +"<td class=\"ls_icons\"><a class=\"closeStreamIcon ${closestreamid}\" title=\"Remove Stream\"><span>[remove]</span></a></td>"
                                            +"</tr><tr>"
                                                +"<td><div class=\"ls_belowName\" style=\"display:none\"></div></td>"
                                            +"</tr></table>"
                                        +"</div><div class=\"ls_objectContainer\">"
                                            +"<img src=\"http://cdn.speedrunslive.com/images/aspect-ratio-16-9.png\"/>"
                                            +"<div><object type=\"application/x-shockwave-flash\" id=\"live_embed_player_flash\" data=\"http://www.twitch.tv/widgets/live_embed_player.swf?channel=${twitch}\" bgcolor=\"#000000\"><param name=\"allowFullScreen\" value=\"true\" /><param name=\"allowScriptAccess\" value=\"always\" /><param name=\"allowNetworking\" value=\"all\" /><param name=\"movie\" value=\"http://www.twitch.tv/widgets/live_embed_player.swf\" /><param name=\"flashvars\" value=\"hostname=www.twitch.tv&channel=${twitch}&auto_play=false&start_volume=25\" /></object></div>"
                                        +"</div>"
                                    +"</script>");

    $(".ls_name").parent().attr('colspan',2);
    $(".ls_namebar tr:nth-child(1) td:nth-child(1)").after("<td class=\"ls_icons\"><a class=\"moveLeftIcon\" title=\"Move stream left\"><span>[moveLeft]</span></a></td>"
                                                          +"<td class=\"ls_icons\"><a class=\"moveUpIcon\" title=\"Move stream up\"><span>[moveUp]</span></a></td>"
                                                          +"<td class=\"ls_icons\"><a class=\"moveDownIcon\" title=\"Move stream down\"><span>[moveDown]</span></a></td>"
                                                          +"<td class=\"ls_icons\"><a class=\"moveRightIcon\" title=\"Move stream right\"><span>[moveRight]</span></a></td>"
                                                          +"<td class=\"ls_icons\"><a class=\"moveButtonSpacer\"></a></td>");
    $(".ls_namebar tr:nth-child(1)").after("<tr><td><div class=\"ls_belowName\" style=\"display:none\"></div></td></tr>");

    var $streams = $(".ls_streams");
    var streamsWidth = $streams.width();
    var numStreams = $(".ls_streams .liquidstream").length;

    setInterval(function () {
        if(numStreams != $(".ls_streams .liquidstream").length){
            numStreams = $(".ls_streams .liquidstream").length;
            streamsWidth = $streams.width();
            moveButtonsToCorrectRow(true);
        }else if(streamsWidth != $streams.width()){
            streamsWidth = $streams.width();
            moveButtonsToCorrectRow();
        }
    }, 200);
});


function moveButtonsToCorrectRow(thorough){
    var maxWidth=0;
    $(".ls_name a").each(function(){
        maxWidth=Math.max(maxWidth,$(this).width());
    });
    if($(".ls_streams .liquidstream").width()-250>=maxWidth){
        if(thorough || $(".moveLeftIcon").first().parent().parent().is(":nth-child(2)"))
            moveButtonsToTopRow();
    }else{
        if(thorough || $(".moveLeftIcon").first().parent().parent().is(":nth-child(1)"))
            moveButtonsToBottomRow();
    }
}

function moveButtonsToBottomRow(){
    $(".moveLeftIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(1)"))
            $(this).parent().appendTo($(this).parent().parent().siblings(":nth-child(2)"));
    });
    $(".moveUpIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(1)"))
            $(this).parent().appendTo($(this).parent().parent().siblings(":nth-child(2)"));
    });
    $(".moveDownIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(1)"))
            $(this).parent().appendTo($(this).parent().parent().siblings(":nth-child(2)"));
    });
    $(".moveRightIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(1)"))
            $(this).parent().appendTo($(this).parent().parent().siblings(":nth-child(2)"));
    });
    $(".moveButtonSpacer").parent().remove()
    $(".ls_belowName").show();
}

function moveButtonsToTopRow(){
    $(".moveLeftIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(2)"))
            $(this).parent().insertBefore($(this).parent().parent().siblings(":nth-child(1)").children(":nth-last-child(3)"));
    });
    $(".moveUpIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(2)"))
            $(this).parent().insertBefore($(this).parent().parent().siblings(":nth-child(1)").children(":nth-last-child(3)"));
    });
    $(".moveDownIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(2)"))
            $(this).parent().insertBefore($(this).parent().parent().siblings(":nth-child(1)").children(":nth-last-child(3)"));
    });
    $(".moveRightIcon").each(function(){
        if($(this).parent().parent().is(":nth-child(2)")){
            $(this).parent().insertBefore($(this).parent().parent().siblings(":nth-child(1)").children(":nth-last-child(3)"));
            $(this).parent().after("<td class=\"ls_icons\"><a class=\"moveButtonSpacer\"></a></td>")
        }
    });
    $(".ls_belowName").hide();
}

function streamsPerRow(num){
    if(num>0){
        $(".ls_streams").attr("totalColumn",num);
        var order=getOrder();

        for(var i=$(".ls_streams .ls_column").length+1;i<=num;++i)
            $(".ls_streams").append("<div id=\"column" + i + "\" class=\"ls_column\"></div>");

        for(var i=1;i<=num;++i){
            $("#column"+i).css("width",(100/num)+'%');
            $("#column"+i).show();
        }

        for(var i=0;i<order.length;++i)
            $("#"+order[i]).appendTo($('#column'+(i%num+1)));

        for(var i=$(".ls_streams .ls_column").length;i>num;--i)
            $("#column"+i).remove();
    }
    moveButtonsToCorrectRow();
}

function getOrder(){
    var order = [];
    var numColumns = $(".ls_streams .ls_column").length;
    var streamsLeft = true;
    var row = 1;
    while(streamsLeft){
        streamsLeft = false;
        for(var i=1;i<=numColumns;++i){
            if($("#column"+i+" .liquidstream").length>=row){
                streamsLeft=true;
                order.push($("#column"+i+" > div:nth-child("+row+")").attr('id'));
            }
        }
        ++row;
    }
    return order;
}
