'use strict';

/* factory service to get posts from blog posts */
app.factory('messagesService', function ($resource) {
     /*return $resource('http://think360.co/work/easybio-data/blog/wp-json/wp/v2/posts/:id', { id: '@id' }, {
        'fetchAll': { method: 'GET', params: {}, isArray: true },
    })*/

    /* dummy array for showing how the messagesArray looks like when it will be retrived from api */
    var messagesArray=[
    		{	id:1, 
    			senderId:121,
    			senderFirstName:'Ambika',
    			senderLastName:'Chuhan',
    			senderCity:'Moga',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-26T10:00:00',
    			senderProfileImage:'images/user-pic-132x132-1.png',
    			isUnRead:1,
    			chats:[
    				{id:1,firstName:'Ambika',lastName:'Chuhan',city:'moga',state:'Punjab',dateTime:'2016-04-26T08:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Ambika',lastName:'Chuhan',city:'moga',state:'Punjab',dateTime:'2016-04-26T16:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Ambika',lastName:'Chuhan',city:'moga',moga:'Punjab',dateTime:'2016-04-26T11:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Ambika',lastName:'Chuhan',city:'moga',state:'Punjab',dateTime:'2016-04-26T10:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:2, 
    			senderId:121,
    			senderFirstName:'Satish',
    			senderLastName:'Kumar',
    			senderCity:'Panchkula',
    			senderState:'Punjab',
    			senderProfileImage:'images/ProfilePic/profile-photo.jpg',
    			lastMessageDateTime:'2016-04-23T06:00:00',
    			isUnRead:1,
    			chats:[
    				{id:1,firstName:'Satish',lastName:'Kumar',city:'Panchkula',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Satish',lastName:'Kumar',city:'Panchkula',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Satish',lastName:'Kumar',city:'Panchkula',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Satish',lastName:'Kumar',city:'Panchkula',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:3, 
    			senderId:121,
    			senderFirstName:'Ashish',
    			senderLastName:'Thakur',
    			senderCity:'Mohali',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-29T10:00:00',
    			senderProfileImage:'images/user-pic-132x132-1.png',
    			isUnRead:1,
    			chats:[
    				{id:1,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:5,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:6,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:7,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:8,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:9,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:10,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:11,firstName:'Ashish',lastName:'Thakur',city:'Mohali',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:4, 
    			senderId:121,
    			senderFirstName:'Rajeev',
    			senderLastName:'Kumar',
    			senderCity:'Kharrar',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-26T11:00:00',
    			senderProfileImage:'images/ProfilePic/profile-photo.jpg',
    			isUnRead:0,
    			chats:[
    				{id:1,firstName:'you',lastName:'',city:'Kharrar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Rajeev',lastName:'Kumar',city:'Kharrar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Rajeev',lastName:'Kumar',city:'Kharrar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Rajeev',lastName:'Kumar',city:'Kharrar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:5, 
    			senderId:121,
    			senderFirstName:'Kunal',
    			senderLastName:'Khullar',
    			senderCity:'Delhi',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-29T15:00:00',
    			senderProfileImage:'images/user-pic-132x132-1.png',
    			isUnRead:0,
    			chats:[
    				{id:1,firstName:'Kunal',lastName:'Khullar',city:'Delhi',state:'Punjab',dateTime:'2016-04-24T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Kunal',lastName:'Khullar',city:'Delhi',state:'Punjab',dateTime:'2016-04-24T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Kunal',lastName:'Khullar',city:'Delhi',state:'Punjab',dateTime:'2016-04-24T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Kunal',lastName:'Khullar',city:'Delhi',state:'Punjab',dateTime:'2016-04-24T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:6, 
    			senderId:121,
    			senderFirstName:'Ronit',
    			senderLastName:'Rajpoot',
    			senderCity:'CHD',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-29T21:00:00',
    			senderProfileImage:'images/ProfilePic/profile-photo.jpg',
    			chats:[
    				{id:1,firstName:'Ronit',lastName:'Rajpoot',city:'CHD',state:'Punjab',dateTime:'2016-04-27T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Ronit',lastName:'Rajpoot',city:'CHD',state:'Punjab',dateTime:'2016-04-27T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Ronit',lastName:'Rajpoot',city:'CHD',state:'Punjab',dateTime:'2016-04-27T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Ronit',lastName:'Rajpoot',city:'CHD',state:'Punjab',dateTime:'2016-04-27T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:7, 
    			senderId:121,
    			senderFirstName:'Sourabh',
    			senderLastName:'Kumar',
    			senderCity:'Mohali',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-30T10:00:00',
    			senderProfileImage:'images/user-pic-132x132-1.png',
    			isUnRead:0,
    			chats:[
    				{id:1,firstName:'Sourabh',lastName:'Kumar',city:'Mohali',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Sourabh',lastName:'Kumar',city:'Mohali',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Sourabh',lastName:'Kumar',city:'Mohali',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Sourabh',lastName:'Kumar',city:'Mohali',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:8, 
    			senderId:121,
    			senderFirstName:'Gaurav',
    			senderLastName:'Khanna',
    			senderCity:'Ludhiana',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-18T10:00:00',
    			senderProfileImage:'images/user-pic-132x132-1.png',
    			isUnRead:0,
    			chats:[
    				{id:1,firstName:'Gaurav',lastName:'Khanna',city:'Ludhiana',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Gaurav',lastName:'Khanna',city:'Ludhiana',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Gaurav',lastName:'Khanna',city:'Ludhiana',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Gaurav',lastName:'Khanna',city:'Ludhiana',state:'Punjab',dateTime:'2016-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
    		{	id:9, 
    			senderId:121,
    			senderFirstName:'Robin',
    			senderLastName:'Singh',
    			senderCity:'Ferozepur',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-21T10:00:00',
    			senderProfileImage:'images/ProfilePic/profile-photo.jpg',
    			isUnRead:1,
    			chats:[
    				{id:1,firstName:'Robin',lastName:'Singh',city:'Jalandhar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Robin',lastName:'Singh',city:'Jalandhar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:3,firstName:'Robin',lastName:'Singh',city:'Jalandhar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:4,firstName:'Robin',lastName:'Singh',city:'Jalandhar',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
			{	id:10, 
				senderId:121,
    			senderFirstName:'Rohit',
    			senderLastName:'Sharma',
    			senderCity:'Chandigarh',
    			senderState:'Punjab',
    			lastMessageDateTime:'2016-04-26T16:00:00',
    			senderProfileImage:'images/user-pic-132x132-1.png',
    			isUnRead:1,
    			chats:[
    				{id:1,firstName:'Rohit',lastName:'Sharma',city:'Chandigarh',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    				{id:2,firstName:'Rohit',lastName:'Sharma',city:'Chandigarh',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
                    {id:3,firstName:'Rohit',lastName:'Sharma',city:'Chandigarh',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
                    {id:4,firstName:'Rohit',lastName:'Sharma',city:'Chandigarh',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
                    {id:5,firstName:'Rohit',lastName:'Sharma',city:'Chandigarh',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
                    {id:6,firstName:'Rohit',lastName:'Sharma',city:'Chandigarh',state:'Punjab',dateTime:'1989-04-26T09:00:00',message:'Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit.'},
    			],
    		},
	    ];

        return {
            /* api call to get all messages by user id*/
            getMessages: function () {
                return messagesArray;
            },
            /* api call to save messages to database */
            setMessages: function(value) {
                messages = messagesArray;
            },
            /* function to get cont of unread messages from messagesArray */
            getUnreadcount: function(){
			    var count = 0;
			    angular.forEach(messagesArray, function(message){
			        count += message.isUnRead ? 1 : 0;
			    });
			    return count; 
            }
        };
});