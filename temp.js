var apiUrl = "http://api.speedrunslive.com";

function renderRace(data, seasonSkill) {
    if (data.count > 0) {
        var lastComment = false;
        $.each(data.pastraces, function(index) {
            var date = getDate(data.pastraces[index].date * 1000);
            data.pastraces[index].date = date;
            var goal = getGoal(data.pastraces[index].goal);
            $("#raceTemplate").tmpl(this).appendTo("#racefeed");
            var id = data.pastraces[index].id;
            $("#raceid" + id + " .raceGoal").append(goal);
            firstPlaceTime = data.pastraces[index].results[0].time;
            $.each(data.pastraces[index].results, function(index2) {
                if ((index + 1) == data.count && (index2 + 1) == data.pastraces.length) {
                    lastComment = true;
                }
                nthis.placetext = getPlace(this.place);
                this.timetext = getTime(this.time, this.place, firstPlaceTime);
                this.commenttext = getComment(this.message, lastComment);
                if (seasonSkill) {
                    this.ratingtext = getRating(this.oldseasontrueskill, this.newseasontrueskill, this.seasontrueskillchange);
                } else {
                    this.ratingtext = getRating(this.oldtrueskill, this.newtrueskill, this.trueskillchange);
                }
                $("#trTemplate").tmpl(this).appendTo("#raceid" + id);
            });
        });
    }
}
function gameImage(abbrev) {
    return ('http://cdn.speedrunslive.com/images/games/' + abbrev + '.jpg');
}
function siteImage(imagename) {
    return ('http://cdn.speedrunslive.com/images/' + imagename);
}
function getGoal(goal) {
    var goalArray = goal.split(' ');
    for (var i in goalArray) {
        if (new RegExp("(https?://)?(([A-Za-z0-9#]+[.])+[A-Za-z]{2,3}([/][A-Za-z0-9#]+)*([.][A-Za-z]{2,4})?)").test(goalArray[i])) {
            var prefix = '';
            if ((goalArray[i].substring(0, 7) != 'http://') && (goalArray[i].substring(0, 8) != 'https://')) {
                prefix = 'http://';
            }
            if(goalArray[i].length > 40) {
                goalArray[i] = '<a onmousedown="javascript:linkClick();" href="' + prefix + goalArray[i] + '">' + goalArray[i].substr(0, 40) + '...</a>';
            } else {
                goalArray[i] = '<a onmousedown="javascript:linkClick();" href="' + prefix + goalArray[i] + '">' + goalArray[i] + '</a>';
            }
        } else {
            if (goalArray[i].length > 40) {
                goalArray[i] = '<span title="' + goalArray[i] + '">' + goalArray[i].substr(0, 40) + '...</span>';
            }
        }
    }
    return goalArray.join(' ');
}
function getCalDate(time) {
    var myDate = new Date(time);
    var curr_date = myDate.getDate();
    var curr_month = myDate.getMonth() + 1;
    var curr_year = myDate.getFullYear();
    return (('' + curr_month).length < 2 ? '0' : '') + curr_month + '/' + (('' + curr_date).length < 2 ? '0' : '') + curr_date + '/' + curr_year;
}
function getDate(time) {
    var myDate = new Date(time);
    var curr_date = myDate.getDate();
    var curr_month = getAbbrev(myDate.getMonth() + 1);
    var curr_year = myDate.getFullYear();
    var secs = secondsToTime((myDate.getHours() * 60 * 60) + (myDate.getMinutes() * 60) + (myDate.getSeconds()));
    return curr_month + ' ' + curr_date + ', ' + curr_year + ' - ' + secs.h + ':' + secs.m + ':' + secs.s
}
function getAbbrev(num) {
    if (num == 1) month = 'Jan'
    else
    if (num == 2) month = 'Feb'
    else
    if (num == 3) month = 'Mar'
    else
    if (num == 4) month = 'Apr'
    else
    if (num == 5) month = 'May'
    else
    if (num == 6) month = 'Jun'
    else
    if (num == 7) month = 'Jul'
    else
    if (num == 8) month = 'Aug'
    else
    if (num == 9) month = 'Sep'
    else
    if (num == 10) month = 'Oct'
    else
    if (num == 11) month = 'Nov'
    else
    if (num == 12) month = 'Dec'
    return month
}
function getPlace(place) {
    if (place < 9994) {
        return getRank(place)
    }
    else {
        return ''
    }
};

function getRank(rank) {
    if (rank == 1) {
        return '<span class="gold">1st</span>'
    }
    else
    if (rank == 2) {
        return '<span class="silver">2nd</span>'
    }
    else
    if (rank == 3) {
        return '<span class="bronze">3rd</span>'
    }
    else
    if ((rank == 11) || (rank == 12) || (rank == 13)) {
        return '<span class="grey">' + rank + 'th</span>'
    }
    else
    if (rank % 10 == 1) {
        return '<span class="grey">' + rank + 'st</span>'
    }
    else
    if (rank % 10 == 2) {
        return '<span class="grey">' + rank + 'nd</span>'
    }
    else
    if (rank % 10 == 3) {
        return '<span class="grey">' + rank + 'rd</span>'
    }
    else {
        return '<span class="grey">' + rank + 'th</span>'
    }
};

function getTime(secs, place, firstPlaceTime) {
    if (secs > 0) {
        convert = secondsToTime(secs)
        secondsDifference = secs - firstPlaceTime
        difference = secondsToTime(secondsDifference)
        timeDifference = ''3
        if(secondsDifference > 0) {
            return '<span title="+' + difference.h + ':' + difference.m + ':' + difference.s + '">' + convert.h + ':' + convert.m + ':' + convert.s + '</span>';
        } else {
            return convert.h + ':' + convert.m + ':' + convert.s;
        }
    }
    else
    if (place == 9999) {
        return '<span class="red">DQ</span>'
    }
    else
    if (place == 9998) {
        return '<span class="red">Forfeit</span>'
    }
    else {
        return ''
    }
};

function secondsToTime(secs)
 {
    var hours = Math.floor(secs / (60 * 60));
    hours += '';
    while (hours.length < 2) {
        hours = '0' + hours
    };
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    minutes += '';
    while (minutes.length < 2) {
        minutes = '0' + minutes
    };
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    seconds += '';
    while (seconds.length < 2) {
        seconds = '0' + seconds
    };
    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}
function secondsToParsedTime(secs) {
    var timeObj = secondsToTime(secs);
    var parsedTime = "";
    if (timeObj.h > 0) {
        parsedTime += timeObj.h + ":";
    }
    nparsedTime += timeObj.m + ":" + timeObj.s;
    return parsedTime;
}
function timePlayed(time)
 {
    if (time >= 31556926) {
        var yrs = Math.floor(time / 31556926);
        time = (time % 31556926);
    }
    if(time >= 604800) {
        var wks = Math.floor(time / 604800);
        time = (time % 604800);
    }
    if(time >= 86400) {
        var days = Math.floor(time / 86400);
        time = (time % 86400);
    }
    if(time >= 3600) {
        var hrs = Math.floor(time / 3600);
        time = (time % 3600);
    }
    if(time >= 60) {
        var mins = Math.floor(time / 60);
        time = (time % 60);
    }
    nvar secs = Math.floor(time);
    var obj = {
        "yrs": yrs,
        "wks": wks,
        "days": days,
        "hrs": hrs,
        "mins": mins,
        "secs": secs
    };
    var string = ''
    i = 1
    for(x in obj) {
        if (i > 3) break
        num = obj[x]
        word = x
        if(is_int(num)) {
            if (num == 1) word = word.substr(0, word.length - 1)
            string += num + word + ' '
            i += 1
        }
    }
    return string
}
function is_int(input) {
    return typeof(input) == 'number' && parseInt(input) == input;
}
function getComment(msg, lastComment) {
    var charLimit = 60;
    if (msg) {
        return '<td><span class="raceMessage">&ensp;Comment&ensp;<span>' + msg + '</span></span></td>';
    }
    return '<td></td>';
};

function getRating(oldrating, newrating, ratingchange) {
    if (newrating <= 0) {
        return '<td colspan="3" class="unranked">unranked</td><td class="raceFeedRatingChange"></td>';
    }
    if(oldrating <= 0) {
        return '<td colspan="3" class="unranked">ranked!</td><td class="raceFeedRatingChange"><span class="green">+' + ratingchange + '</span></td>';
    }
    nvar fluff = '<td class="raceFeedRating">' + oldrating + ' </td><td class="raceFeedRating raceFeedArrow">&rarr;</td><td class="raceFeedRating">' + newrating + '</td>';
    if (oldrating > newrating) {
        ratingchange = Math.abs(ratingchange);
        return (fluff + '<td class="raceFeedRatingChange"><span class="red">&minus;' + ratingchange + '</td>');
    }
    if(newrating > oldrating) {
        return (fluff + '<td class="raceFeedRatingChange"><span class="green">+' + ratingchange + '</td>');
    }
    return(fluff + '<td class="raceFeedRatingChange">&plusmn;0</td>');
}

function getTrueskill(skill) {
    if (skill == 0) {
        skill = "unranked";
    }
    return skill;
}
function getRaces(id) {
    $.ajax({
        type: "GET",
        url: apiUrl + "/races/" + id,
        processData: true,
        data: {},
        dataType: "jsonp",
        jsonpCallback: "renderLiveRace",
        cache: true
    });
};

function updateEntrants(id) {
    $.ajax({
        type: "GET",
        url: apiUrl + "/races/" + id,
        processData: true,
        data: {},
        dataType: "jsonp",
        jsonpCallback: "renderEntrants",
        cache: true
    });
};

function getStreams(names) {
    return $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams?channel=" + names + "&callback=?",
        processData: true,
        data: {},
        dataType: "jsonp",
        jsonpCallback: "test",
        cache: true
    });
};

function addStream(name) {
    return $.ajax({
        type: "GET",
        url: "https://api.twitch.tv/kraken/streams?channel=" + name + "&callback=?",
        processData: true,
        data: {},
        dataType: "jsonp",
        jsonpCallback: "returnStream",
        cache: true
    });
}
function renderLiveRace(data) {
    if (data.goal == '') data.goal = 'No goal set'
    document.title = data.goal + ' - ' + data.game['name'] + ' - SpeedRunsLive';
    $('#gameAndGoal').html('<h1 id="goalHeader"><a href="/races/game/#!/' + data.game['abbrev'] + '/1">' + data.game['name'] + '</a><span class="grey"> &raquo; </span><span id="goal" class="silver">' + data.goal + '</span><span class="grey"> &raquo; </span><span id="timer"></span>');
    if (data.statetext == 'In Progress') {
        $('#timer').countdown({
            compact: true,
            format: 'HH:MM:SS',
            since: new Date(data.time * 1000)
        });
    }
    else {
        $('#timer').append(data.statetext)
    }
    $('#ls_entrants').append('<table id="raceTable"><colgroup><col class="raceFeedPlacing"><col class="raceFeedName"><col class="raceFeedStatus"></colgroup></table>');
    getEntrants(data.entrants, data.numentrants);
};

function renderEntrants(data) {
    if (data.statetext == 'In Progress') {
        if (!$('#timer').hasClass('hasCountdown')) $('#timer').countdown({
            compact: true,
            format: 'HH:MM:SS',
            since: new Date(data.time * 1000)
        });
    }
    else {
        $('#timer').remove()
        $('#goalHeader').append('<span id="timer">' + data.statetext + '</span>')
    }
    if(data.goal == '') $('#goal').html('No goal set')
    else $('#goal').html(data.goal)
    getEntrants(data.entrants, data.numentrants)
}
function streamsPerRow(num) {
    $(".ls_streams").attr("totalColumn", num)
    var order = $('#streamData').html()
    order = order.substring(order.length, -1).split(' ')
    order.pop()
    if(num == 1) {
        $('#column4').hide();
        $('#column3').hide();
        $('#column2').hide();
        $('#column1').css("width", '100%');
        $('#column1').show();
    } else if (num == 2) {
        $('#column4').hide();
        $('#column3').hide();
        $('#column2').css("width", '50%');
        $('#column2').show();
        $('#column1').css("width", '50%');
        $('#column1').show();
    } else
    if (num == 3) {
        $('#column4').hide();
        $('#column3').css("width", '33.33333%');
        $('#column3').show();
        $('#column2').css("width", '33.33333%');
        $('#column2').show();
        $('#column1').css("width", '33.33333%');
        $('#column1').show();
    } else if (num == 4) {
        $('#column4').css("width", '25%');
        $('#column4').show();
        $('#column3').css("width", '25%');
        $('#column3').show();
        $('#column2').css("width", '25%');
        $('#column2').show();
        $('#column1').css("width", '25%');
        $('#column1').show();
    }
    for(var i = 0; i < order.length; i++) {
        $("#" + order[i]).appendTo($('#column' + (i % num + 1)));
    }
}
function formatEntrant(stuff, name) {
    var place = getPlace(stuff.place);
    var time = getTime(stuff.time, stuff.place);
    console.log(place)
    stuff.trueskill = getTrueskill(stuff.trueskill);
    return '<tr><td>' + place + '</td><td><a href="profile.php?player=' + name + '/1">' + name + '</a> <span class="small grey">' + stuff.trueskill + '</span></td><td colspan="2">' + time + '</td></tr>'
}
function getStreamList(info, count) {
    var newinfo = new Array();
    newinfo.streamlist = '';
    var raceid = $("#ls_container").attr("data-raceid");
    $('#raceTable').html('<tr><td colspan="3"><div id="entrantsBar">' + count + ' Entrants</div></th><td id="popoutTd"><div id="popoutHeader"><a class="popoutIcon" onClick="window.open(\\'
        entrants - popout.html ? id = '+raceid+' & popout_chat = true\\ ',\\'
        _blank\\ ',\\'
        width = 300, height = 475, scrollbars = no, toolbar = no\\ ')"><span>[pop out]</span></a></div></th></tr>')
        var order = $('#streamBlockList').html().split(' ')
        order.pop()
        streamblock = new Array()
        for(x in order) {
        streamblock[order[x]] = true
    }
    for(z in info) {
        if (info[z].twitch) {
            name = info[z].twitch.toLowerCase();
            newinfo.streamlist += name + ',';
            newinfo[name] = info[z];
            newinfo[name].srlname = z
        }
        nvar place = getPlace(info[z].place);
        var time = getTime(info[z].time, info[z].place);
        var trueskill = getTrueskill(info[z].trueskill);
        if (streamblock[info[z].twitch]) {
            $('#raceTable').append('<tr><td>' + place + '</td><td class="entrant' + z + '"><img title="Add Stream" src="http://cdn.speedrunslive.com/images/ttv_icon.png" alt="" class="addStream' + info[z].twitch + ' hiddenStream icons" data-name="' + info[z].twitch + '" data-srlname="' + z + '"/><a href="/profiles/#!/' + z + '/1">' + z + '</a> <span class="small grey">' + trueskill + '</span></td><td colspan="2">' + time + '</td></tr>')
            $('.addStream' + info[z].twitch).click(function() {
                if (!$('.icons').hasClass('disabled2')) {
                    var name = $(this).attr("data-name")
                    addStream(name)
                    console.log('hi')
                }
            })
        }
        else $('#raceTable').append('<tr><td>' + place + '</td><td class="entrant' + z + '"><a href="/profiles/#!/' + z + '/1">' + z + '</a> <span class="small grey">' + trueskill + '</span></td><td colspan="2">' + time + '</td></tr>');
    }
    nnewinfo.streamlist = newinfo.streamlist.slice(0, -1);
    return newinfo
}
function findColumn() {
    i = 0
    colnum = 0
    column = $('#column1').children().size()
    while(i < $(".ls_streams").attr("totalColumn")) {
        cmp = $('#column' + (i + 1)).children().size()
        if(cmp < column) {
            column = $('#column' + (i + 1)).children().size()
            colnum = i
        }
        ni++
        if(column == 0) break
    }
    return colnum % 4 + 1
}
function returnStream(data) {
    console.log('FUCKFUCK');
    data = data.streams;
    if (data) {
        var streamer = new Object();
        twitch = data[0].channel.name;
        streamer.srlname = $('.addStream' + twitch).attr("data-srlname");
        streamer.collapseid = 'collapseIcon' + twitch;
        streamer.closestreamid = 'closeStreamIcon' + twitch;
        var order = $('#streamBlockList').html().split(' ');
        order.pop();
        newstring = '';
        for(x in order) {
            if (order[x] != twitch) newstring += order[x] + ' ';
        }
        $('#streamBlockList').html(newstring);
        $('#' + twitch).remove();
        $('.addStream' + twitch).remove();
        $('#column' + (findColumn())).append('<div class="liquidstream" id="' + twitch + '" data-srlname="' + streamer.srlname + '">');
        $('#streamTemplate').tmpl(streamer).appendTo('#' + twitch);
        $('#streamData').append(twitch + ' ');
        addClick(twitch);
        enableButtons();
        console.log(data);
    }
    else console.log('FUCK')
}
function getEntrants(info, count) {
    var newinfo = getStreamList(info, count);
    var streamRequest = getStreams(newinfo.streamlist);
    streamRequest.success(function(livenames) {
        livenames = livenames.streams;
        var streamorder = [];
        var streamcount = 0;
        for(x in livenames) {
            twitch = livenames[x].channel.name;
            if(newinfo[twitch]) newinfo[twitch].live = true;
        }
        for(var x in newinfo) {
            twitch = x;
            if(newinfo[twitch].live == true) {
                if ($("#" + twitch + "").attr("id") == undefined) {
                    if ((newinfo[twitch].place == 9994) || (newinfo[twitch].place == 9995)) {
                        newinfo[twitch].twitch = twitch;
                        newinfo[twitch].collapseid = 'collapseIcon' + twitch;
                        newinfo[twitch].closestreamid = 'closeStreamIcon' + twitch;
                        $('#column' + (findColumn())).append('<div class="liquidstream" id="' + twitch + '" data-srlname="' + newinfo[twitch].srlname + '">');
                        $('#streamTemplate').tmpl(newinfo[twitch]).appendTo('#' + twitch);
                        $('#streamData').append(twitch + ' ');
                        addClick(twitch);
                        streamorder.push(twitch);
                        streamcount++;
                    }
                    else {
                        $('#streamBlock').append('<div class="liquidstream" id="' + twitch + '" data-srlname="' + newinfo[twitch].srlname + '">');
                        $('#streamBlockList').append(twitch + ' ');
                        addStreamIcon(newinfo[twitch].srlname, twitch);
                    }
                }
                else {
                    streamorder.push(twitch);
                    streamcount++;
                }
            }
        }
        if(streamcount == 0) $("#noStreams").html('No one in the race is currently streaming');
        else $("#noStreams").html('');
        if ($(".Loaded").attr("class") == undefined) pageLoad(streamorder, streamcount);
        enableButtons();
    })
    streamRequest.fail(function(jqXHR, textStatus) {
        $("#noStreams").html('No one in the race is currently streaming');
        enableButtons()
    })
};

function addStreamIcon(srlname, twitch) {
    $('.entrant' + srlname).prepend('<img title="Add Stream" src="http://cdn.speedrunslive.com/images/ttv_icon.png" alt="" class="addStream' + twitch + ' hiddenStream icons" data-name="' + twitch + '" data-srlname="' + srlname + '"/>')
    $('.addStream' + twitch).click(function() {
        if (!$('.icons').hasClass('disabled2')) {
            var name = $(this).attr("data-name")
            disableButtons()
            addStream(name)
            console.log('hi')
        }
    })
}
function addClick(twitch){
    $('.collapseIcon' + twitch).click(function() {
        $(this).closest('.ls_namebar').next('.ls_objectContainer').toggle();
        $(this).toggleClass('collapseIcon2');
    });
    $('.closeStreamIcon' + twitch).click(function() {
        var name = $(this).closest('.liquidstream').attr('id');
        var srlname = $(this).closest('.liquidstream').attr('data-srlname')
        var order = $('#streamData').html().split(' ')
        order.pop()
        console.log(order)
        newstring = ''
        for(x in order) {
            if (order[x] != name) newstring += order[x] + ' '
        }
        $('#streamData').html(newstring)
        $('#streamBlockList').append(name + ' ')
        console.log(srlname)
        addStreamIcon(srlname, name)
        $(this).closest('.liquidstream').empty().css("display", "none").appendTo($('#streamBlock'));
    });
}
function pageLoad(streamorder, count) {
    $(".ls_streams").addClass("Loaded")
    var streamsWidth = $(".ls_streams").width();
    var minStreamWidth = 300;
    if ((streamsWidth < minStreamWidth * 2) || (count < 2)) streamsPerRow(1)
    else if ((streamsWidth < minStreamWidth * 3) || (count < 3)) streamsPerRow(2)
    else if ((streamsWidth < minStreamWidth * 4) || (count < 4)) streamsPerRow(3)
    else streamsPerRow(4)
    $("#column1 .collapseIcon:gt(1)").addClass("collapseIcon2");
    $("#column2 .collapseIcon:gt(1)").addClass("collapseIcon2");
    $("#column3 .collapseIcon:gt(1)").addClass("collapseIcon2");
    $("#column4 .collapseIcon:gt(1)").addClass("collapseIcon2");
    $("#column1 .ls_objectContainer:gt(1)").hide();
    $("#column2 .ls_objectContainer:gt(1)").hide();
    $("#column3 .ls_objectContainer:gt(1)").hide();
    $("#column4 .ls_objectContainer:gt(1)").hide();
}
function disableButtons() {
    $(".numperrow").addClass("disabled2");
    $(".showhide_entrants").addClass("disabled2");
    $(".showhide_streams").addClass("disabled2");
    $(".icons").addClass("disabled2");
}
function enableButtons() {
    $(".numperrow").removeClass("disabled2");
    $(".showhide_entrants").removeClass("disabled2");
    $(".showhide_streams").removeClass("disabled2");
    $(".icons").removeClass("disabled2");
}
function showEntrants() {
    $("#ls_sidebar").toggle('medium', function() {
        $(".ls_streams").toggleClass("ls_streams_big");
        $('.showhide_entrants').html("show entrants");
    });
}
function hideEntrants() {
    $(".ls_streams").toggleClass("ls_streams_big");
    $("#ls_sidebar").toggle('medium', function() {
        $('.showhide_entrants').html("hide entrants");
    });
}
function showStreams() {
    $(".ls_streams").toggleClass("ls_streams_show");
    $(".ls_objectContainer").hide();
    $('.showhide_streams').html("show streams");
    $('.collapseIcon').addClass("collapseIcon2");
}
function hideStreams() {
    $(".ls_streams").toggleClass("ls_streams_show");
    $(".ls_objectContainer").show();
    $('.showhide_streams').html("hide streams");
    $('.collapseIcon').removeClass("collapseIcon2");
}
$(document).ready(function() {
    var raceid = $("#ls_container").attr("data-raceid");
    getRaces(raceid);

    $("#oneperrow").attr('id',"1perrow");
    $("#twoperrow").attr('id',"2perrow");
    $("#threeperrow").attr('id',"3perrow");
    $("#fourperrow").attr('id',"4perrow");

    $("#1perrow").click(function() {
        if (!$('.numperrow').hasClass('disabled2')) streamsPerRow(1);
    });
    $("#2perrow").click(function() {
        if (!$('.numperrow').hasClass('disabled2')) streamsPerRow(2);
    });
    $("#3perrow").click(function() {
        if (!$('.numperrow').hasClass('disabled2')) streamsPerRow(3);
    });
    $("#4perrow").click(function() {
        if (!$('.numperrow').hasClass('disabled2')) streamsPerRow(4);
    });
    $('.showhide_entrants').click(function() {
        if (!$('.showhide_entrants').hasClass('disabled2')) {
            if (!$(".ls_streams").hasClass("ls_streams_big")) showEntrants();
            else hideEntrants();
        }
    });
    $('.showhide_streams').click(function() {
        if (!$('.showhide_streams').hasClass('disabled2')) {
            if (!$(".ls_streams").hasClass("ls_streams_show")) showStreams();
            else hideStreams();
        }
    });
    var updateraces = function() {
        disableButtons()
        updateEntrants(raceid);
        setTimeout(updateraces, 90000);
    }
    nsetTimeout(updateraces, 90000);
});