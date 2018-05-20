/**
The MIT License (MIT)

Copyright (c) 2018 Mepherion

Permission is hereby granted, free of charge, to any person obtaining a copy of 
this software and associated documentation files (the "Software"), to deal in 
the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

// ==UserScript==
// @name            Reverse Twitch Chat
// @namespace       https://openuserjs.org/users/mepherion
// @description     Reverses twitch chat so that new messages appear on the top
// @author          Mepherion
// @source          https://github.com/mepherion/reverse-twitch-chat-userscript
// @match           https://www.twitch.tv/popout/*/chat*
// @match           https://www.twitch.tv/*/chat*
// @match           https://www.twitch.tv/*
// @version         1.1
// @copyright       2018, mepherion (https://openuserjs.org/users/mepherion)
// @license         MIT
// @updateURL       https://openuserjs.org/meta/mepherion/Reverse_Twitch_Chat.meta.js
// @downloadURL     https://openuserjs.org/install/mepherion/Reverse_Twitch_Chat.user.js
// @require         https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require         https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant GM_addStyle
// @run-at document-end
// ==/UserScript==

// ==OpenUserJS==
// @author mepherion
// ==/OpenUserJS==

function onChatLoad() {
  GM_addStyle('.chat-list .tw-full-height.reverse { display:flex !important; flex-direction:column-reverse !important; }');
  var messageContainer = document.querySelector(MESSAGE_CONTAINER_CLASSES)
  messageContainer.classList.add('reverse');
  
  // The div containing the scrollable area
  var chatContentDiv = messageContainer.parentNode.parentNode;
  
  // Continually scroll up, in a way to make the comments readable
    function scrollUp(now) {
        if (chatContentDiv.scrollTop > 0) {
            chatContentDiv.scrollTop = 0;
        }
        window.requestAnimationFrame(scrollUp);
    }
    window.requestAnimationFrame(scrollUp);
	chatContentDiv.scrollTop = 0;
}

var MESSAGE_CONTAINER_CLASSES = '.chat-list .tw-full-height';

waitForKeyElements(MESSAGE_CONTAINER_CLASSES, onChatLoad);
