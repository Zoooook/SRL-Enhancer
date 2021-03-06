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

    $(".ls_streams").on('click', 'a.moveUpIcon', function(){
        var $thisStream = $(this).parents(".liquidstream");
        if($thisStream.prev().length)
            $thisStream.insertBefore($thisStream.prev());
    });

    $(".ls_streams").on('click', 'a.moveDownIcon', function(){
        var $thisStream = $(this).parents(".liquidstream");
        if($thisStream.next().length)
            $thisStream.insertAfter($thisStream.next());
    });

    $(".ls_streams").on('click', 'a.moveLeftIcon', function(){
        var $thisStream = $(this).parents(".liquidstream");
        var $thisColumn = $thisStream.parent();
        if($thisColumn.prev().length){
            var $leftColumn = $thisColumn.prev();
            if($thisColumn.children(".liquidstream").length==1 && $leftColumn.children(".liquidstream").length==1){
                var swapId = $thisColumn.attr("id");
                $thisColumn.attr("id",$leftColumn.attr("id"));
                $leftColumn.attr("id",swapId);
                $thisColumn.insertBefore($leftColumn);
            }else if($thisStream.index()>=$leftColumn.children(".liquidstream").length)
                $thisStream.appendTo($leftColumn);
            else{
                var streamIndex = $thisStream.index();
                var $leftStream = $leftColumn.children(".liquidstream:nth-child("+(streamIndex+1)+")");
                if(streamIndex){
                    $thisStream.insertAfter($leftColumn.children(".liquidstream:nth-child("+streamIndex+")"));
                    $leftStream.insertAfter($thisColumn.children(".liquidstream:nth-child("+streamIndex+")"));
                }else{
                    $thisStream.prependTo($leftColumn);
                    $leftStream.prependTo($thisColumn);
                }
            }
        }
    });

    $(".ls_streams").on('click', 'a.moveRightIcon', function(){
        var $thisStream = $(this).parents(".liquidstream");
        var $thisColumn = $thisStream.parent();
        if($thisColumn.next().length){
            var $rightColumn = $thisColumn.next();
            if($rightColumn.children(".liquidstream").length==0){
                if($thisColumn.children(".liquidstream").length>1)
                    $thisStream.appendTo($rightColumn);
            }else if($thisColumn.children(".liquidstream").length==1 && $rightColumn.children(".liquidstream").length==1){
                var swapId = $thisColumn.attr("id");
                $thisColumn.attr("id",$rightColumn.attr("id"));
                $rightColumn.attr("id",swapId);
                $thisColumn.insertAfter($rightColumn);
            }else if($thisStream.index()>=$rightColumn.children(".liquidstream").length)
                $thisStream.appendTo($rightColumn);
            else{
                var streamIndex = $thisStream.index();
                var $rightStream = $rightColumn.children(".liquidstream:nth-child("+(streamIndex+1)+")");
                if(streamIndex){
                    $thisStream.insertAfter($rightColumn.children(".liquidstream:nth-child("+streamIndex+")"));
                    $rightStream.insertAfter($thisColumn.children(".liquidstream:nth-child("+streamIndex+")"));
                }else{
                    $thisStream.prependTo($rightColumn);
                    $rightStream.prependTo($thisColumn);
                }
            }
        }
    });

    var streamsWidth = $(".ls_streams").width();
    var numStreams = $(".ls_streams .liquidstream").length;
    setInterval(function () {
        if(numStreams != $(".ls_streams .liquidstream").length){
            numStreams = $(".ls_streams .liquidstream").length;
            streamsWidth = $(".ls_streams").width();
            moveButtonsToCorrectRow(true);
            moveEmptyColumnsToEnd();
        }else if(streamsWidth != $(".ls_streams").width()){
            streamsWidth = $(".ls_streams").width();
            moveButtonsToCorrectRow();
        }
    }, 200);
});

function moveEmptyColumnsToEnd(){
    var empties=[];
    var sandwiched=[];
    var numColumns=$(".ls_streams .ls_column").length;
    for(var i=1;i<=numColumns;++i){
        if($("#column"+i+ " .liquidstream").length==0)
            empties.push(i);
        else
            sandwiched=[].concat(empties);
    }
    if(sandwiched.length){
        for(var i=0;i<sandwiched.length;++i)
            $("#column"+sandwiched[i]).attr("id","sandwiched"+i);
        var j=sandwiched[0];
        for(var i=j+1;i<=numColumns;++i){
            if(sandwiched.indexOf(i)==-1){
                $("#column"+i).attr("id","column"+j);
                ++j;
            }
        }
        for(var i=0;i<sandwiched.length;++i){
            $("#sandwiched"+i).appendTo(".ls_streams");
            $("#sandwiched"+i).attr("id","column"+j);
            ++j;
        }
    }
}

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