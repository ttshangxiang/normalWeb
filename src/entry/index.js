
require('../style/index.css');
$('body').html('hahaha');

$.ajax({
	url: '/web/api/users/session/'
})
.done(function() {
	console.log("success");
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});
