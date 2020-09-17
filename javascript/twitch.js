var spamming = false;
var darkMode = false;
var spamType = "laughing";
var spamSpeed = 1200;


//is called automatically when the html page is loaded
function init()
{
    makeSettings();
    toggleSettings();
    spam();
}


//writes a random message in the chat
function writeMessage()
{
    var element = $("#chattext");
    element.append(getMessage());
    cutTopOfChat();
    scrollToBottom();
}

//returns a random message
function getMessage()
{
    var message = $('<p></p>');
    message.attr("class", "chatMessage");
    message.append(getUserName());
    message.append(": ");

    var msgBody = "";
    
    if(spamType=="positive")
        msgBody = (positiveMessages[Math.floor(Math.random()*positiveMessages.length)]);
    else if(spamType=="negative")
        msgBody = (negativeMessages[Math.floor(Math.random()*negativeMessages.length)]);
    else if(spamType=="bobross")
        msgBody = (bobRossMessages[Math.floor(Math.random()*bobRossMessages.length)]);
    else if(spamType=="laughing")
        msgBody = (laughingMessages[Math.floor(Math.random()*laughingMessages.length)]);
    else if(spamType=="spam")
        msgBody = (spamMessages[Math.floor(Math.random()*spamMessages.length)]);

    msgBody = replace_emotes(msgBody);

    message.append(msgBody);

    return message;
}


function replace_emotes(message)
{
    message = " " + message + " "; //add space before and after

    for (var i=0;i<emotes.length;i++)
    {
        message = message.replace(new RegExp(" " + emotes[i][0] + " ", 'g'), " <img src='pics/twitch_emotes/"+emotes[i][1]+"' alt='"+emotes[i][0]+"'> ");
    }

    message = message.slice(1, -1); //remove the added spaces
    return message;
}


//returns a random username
function getUserName()
{
    var username = $('<span></span>');
    username.attr("class", "username");
    username.css("color", getUsernameColor());
    username.append(usernamePrefixes[Math.floor(Math.random()*usernamePrefixes.length)]);   //gets a random username from the array
    username.append(usernameSuffixes[Math.floor(Math.random()*usernameSuffixes.length)]);   //gets a random username from the array
    
    if(Math.random() > 0.5)
    {
        username.append(Math.floor(Math.random() * 120));
    }
    
    return username;
}

//returns one of the colours you could have as your username
function getUsernameColor()
{
    return usernameColors[Math.floor(Math.random()*usernameColors.length)];
}


//hides the chat text
function hideChatText()
{
    var element = $("#chattext");
    var hideButton = $("#hideButton");
    
    element.toggle();
    hideButton.empty();
    
    if(element.is(":visible"))
    {
        hideButton.append("hide");
    }
    else
    {
        hideButton.append("show");
    }
}

//clears the chat of messages
function clearChat()
{
    var element = $("#chattext");
    
    element.empty();
}

//writes the text of the input field into the chat with a random username
function chat()
{    
    var textfield = $("#textfield");
    var element = $("#chattext");
    
    if(textfield.val()!="")
    {
        var message = $('<p></p>');
        message.attr("class", "chatMessage");
        message.append(getUserName());
        message.append(": ");

        var msgBody = textfield.val();
        msgBody = replace_emotes(msgBody);

        message.append(msgBody);
    
        textfield.val("");
    
        element.append(message);
        scrollToBottom();
        cutTopOfChat();
    }
}


//starts spamming, calls keepSpamming()
function spam()
{
    var spamButton = $("#spamButton");
    spamButton.empty();
    
    if(spamming)
    {
        spamming = false;
        spamButton.append("spam");
    }
    else
    {
        spamming = true;
        keepSpamming();
        spamButton.append("stop spamming");
    }
}


//recursive function that writes a message every 0-249ms
function keepSpamming()
{
    if(spamming)
    {
        writeMessage();
        setTimeout(function() {keepSpamming(); }, Math.floor(Math.random() * spamSpeed));
    }
}



//scrolls to the bottom of the chat
function scrollToBottom()
{
    var chattext = document.getElementById("chattext");
    chattext.scrollTop = chattext.scrollHeight;
}

//checks to see if the chat is too long and cuts the top elements if it is
function cutTopOfChat()
{
    var element = $("#chattext");
    if(element.children().length > 170)
    {
        var chatMessages = element.children();
        for(i = 0; i<30; i++)
        {
            chatMessages[i].remove();
        }
    }
}


//toggles between dark mode and normal mode
function darkmode()
{
    var chat = $("#chat");
    if(darkMode)
    {
        darkMode = false;
        chat.css("color", "black");
        chat.css("background-color", "white");
        $("#textfield").css("background-color", "white");
        $("#textfield").css("color", "black");
        $("#chattext").removeAttr("class");
    }
    else
    {
        darkMode = true;
        chat.css("color", "white");
        chat.css("background-color", "#1e1e1e");
        $("#textfield").css("background-color", "#141414");
        $("#textfield").css("color", "white");
        $("#chattext").attr("class", "dark");
    }
}


//makes a "settings" box
function makeSettings()
{
    $("#settingsButton").css("background-color", "#4b2f7f");
        
    var settings = $('<div></div>');
    settings.attr("id", "settings");
        
        
    var clearButton = $('<button></button>');
    clearButton.append("clear");
    clearButton.attr("onClick", "clearChat()");
        
        
    var spamButton = $('<button></button>');
    if(spamming)
    {
        spamButton.append("stop spamming");
    }
    else
    {
        spamButton.append("spam");
    }
    spamButton.attr("onclick", "spam()");
    spamButton.attr("id", "spamButton");
    
    var darkModeButton = $('<button></button>');
    darkModeButton.append("toggle dark mode");
    darkModeButton.attr("onclick", "darkmode()");
    
    var selectSpam = $('<select><select>');
    selectSpam.attr("id", "selectspamtype");
    selectSpam.attr("onChange", "chooseSpam()");
    
    var positiveSpam = $('<option></option>');
    positiveSpam.attr("value", "positive");
    positiveSpam.append("Positive (CS)");
    var negativeSpam = $('<option></option>');
    negativeSpam.attr("value", "negative");
    negativeSpam.append("Negative (CS)");
    var bobRossSpam = $('<option></option>');
    bobRossSpam.attr("value", "bobross");
    bobRossSpam.append("Bob Ross");
    var laughingSpam = $('<option></option>');
    laughingSpam.attr("value", "laughing");
    laughingSpam.append("Laughing");
    var spamSpam = $('<option></option>');
    spamSpam.attr("value", "spam");
    spamSpam.append("Spam");
    
    selectSpam.append(laughingSpam);
    selectSpam.append(positiveSpam);
    selectSpam.append(negativeSpam);
    selectSpam.append(bobRossSpam);
    selectSpam.append(spamSpam);
    
    
    var selectSpeed = $('<input></input>');
    selectSpeed.attr("type", "range");
    selectSpeed.attr("id", "selectspeed");
    selectSpeed.attr("onchange", "chooseSpeed()");
    
    
    settings.append(clearButton);
    settings.append("<br>");
    settings.append(spamButton);
    settings.append("<br>");
    settings.append(darkModeButton);
    settings.append($('<h3></h3>').append("type of spam"));
    settings.append(selectSpam);
    settings.append($('<h3></h3>').append("speed"));
    settings.append(selectSpeed);
    
    var chat = $("#chat");
    chat.append(settings);
}

//shows or hides the chat
function toggleSettings()
{
    $("#settings").toggle();
    
    if($("#settings").css('display') == 'none')
    {
        $("#settingsButton").css("background-color", "#6441a4");
    }
    else
    {
        $("#settingsButton").css("background-color", "#4b2f7f");
    }
}

//sets the type of spam from the input in the settings
function chooseSpam()
{
    spamType = $("#selectspamtype").val();
}

//sets the speed from the input in the settings
function chooseSpeed()
{
    var val = $("#selectspeed").val();
    spamSpeed = 2200 - (20 * val);
}


function getVideo()
{
    var link  = $("#youtubelink").val();
    link = link.replace("watch?v=", "embed/");
    link = link + "?autoplay=1";
    
    var notChat = $("#notchat");
    notChat.empty();
    
    var video = $('<iframe></iframe>');
    video.attr("src", link);
    video.attr("id", "ytplayer");
    video.attr("type", "text/html");
    video.attr("frameborder", "0");
    video.attr("width", "100%");
    video.attr("height", "100%");
    video.css("z-index", "100");
    
    var errormsg = $('<p></p>');
    errormsg.append("can't see the video?");
    errormsg.append("<p></p>");
    errormsg.append("write a full youtube link with the form: https://www.youtube.com/watch?v=[VIDEO CODE HERE]");
    errormsg.attr("id", "errormsg");
    
    notChat.append(errormsg);
    notChat.append(video);
}


//gives the user an input field to change the name of the channel
function changeChannel()
{
    $("#abovechat").empty();
    var form = $('<form></form>');
    form.attr("onsubmit", "return false");
    
    var input = $('<input></input>');
    input.attr("type", "text");
    input.attr("placeholder", "channel name");
    input.attr("id", "channelnameinput");
    
    //<input type="submit" id="videoButton" onClick="getVideo()" value="get video" onKeyPress="checkForEnter(event)">
    var button = $('<input></input>');
    button.attr("type", "submit");
    button.attr("onClick", "setChannelName()");
    button.attr("value", "set");
    
    form.append(input);
    form.append(button);
    $("#abovechat").append(form);
}

function setChannelName()
{
    var name = $("#channelnameinput").val();
    $("#abovechat").empty();
    var channelname = $('<p></p>');
    channelname.attr("onclick", "changeChannel()");
    channelname.attr("id", "channelname");
    channelname.append(name);
    $("#abovechat").append(channelname);
}