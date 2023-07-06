(function(){
'use strict';
/* user messages (chats) controller */

app.controller('MessagesController', MessagesController);
MessagesController.$inject = ['$scope','userService','messagesService','$window'];
function MessagesController($scope,userService,messagesService,window) {

    /* getting chat messages from messages service */
	this.messages = messagesService.getMessages();  

    /* setting basic variables for tab, display left side, and some right side contents.*/

    this.tab = 1;
    this.showLeftSide=true;
    this.showMobileChatContents=true;

    /*setting up variables for displaying contents on mobile */
    if(window.innerWidth<767){
        this.tab = 0;
        this.showMobileChatContents=false;
         this.showLeftSide=true;
    }

    /* changing tabs */
    this.setTab = function (tabId) {
        this.tab = tabId;
        if(window.innerWidth<768){
            this.showLeftSide=false;
            this.showMobileChatContents=true;
        }
    };

    /* checking on page load or on click wheather current tab is visible or hidden */
    this.isSet = function (tabId) {
        return this.tab === tabId;
    };

    /* back button functionaliy (show hide chat)*/
    this.backButton = function(){
        if(window.innerWidth<767){
            this.showLeftSide=true;
            this.showMobileChatContents=false;
            this.tab=0;
        }
    };

    /* count unread messages (calling getUnreadcount functions from messagesService) */
    this.getUnreadMessagesCount = function(){
    	return messagesService.getUnreadcount();
    };
    this.messagesCount = messagesService.getUnreadcount();  
}
})();