$('document').ready(function(){

	$('#login').on('click', function(){
		
	if($('#email').val().trim() === '' || $('#password').val() === ''){
			$('#result').html('No user found');
		}else{
			$.ajax({
				url: '/login',
				type: 'POST',
				dataType: 'json',
				data: {
					name: $('#email').val(),
					password: $('#password').val()	
				},
				success: function(data){
					console.log(data);
				} 
			});
		}
		
	});
	
	$('#sign_up').on('click', function(){
		$.ajax({
			url: '/signup',
			type: 'POST',
			dataType: 'json',
			data: {
				name: $('#email').val(),
				password: $('#password').val()
			},
			success: function(data){
				console.log(data);
				$('#result').html('Account Created');
			}
		});
	});

});