'use strict';

/* factory service to get posts from blog posts */
app.factory('homeGetBlogPosts', function ($resource) {
     return $resource('http://think360.co/work/easybio-data/blog/wp-json/wp/v2/posts/:id', { id: '@id' }, {
        'fetchAll': { method: 'GET', params: {}, isArray: true, /*headers: [{'Content-Type': 'application/json'}]*/},
    })
}).factory('homeGetSingleBlogPost', function ($resource) {
    return $resource('http://think360.co/work/easybio-data/blog/wp-json/wp/v2/posts/:id', { id: '@id' }, {
        'fetch': { method: 'GET', params: {}, isArray: false , /*headers: [{'Content-Type': 'application/json'}]*/},
    })
}).factory('getSingleBlogPostImage', function ($resource) {
    return $resource('http://think360.co/work/easybio-data/blog/wp-json/wp/v2/media/:id', { id: '@id' }, {
        'fetch': { method: 'GET', params: {}, isArray: false, /*headers: [{'Content-Type': 'application/json'}]*/},
    })
});

