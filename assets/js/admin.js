$(document).ready(function(){
	$('#search').keyup(function(){
		var search = $("#search").val();
		var searchby = $("#searchby").val();
		$.ajax({
			url: '/admin/adminsearch',
			method: 'post',
			datatype : 'json',
			data : {'search':search,
					'searchby':searchby},
			success:function(response){
				var tableBody="<tr><td>User Name</td><td>Name</td><td>Email</td><td>Address</td><td>Phone</td><td>Status</td><td></td></tr>";
				if(response.user != 'error'){
					response.user.forEach(element => {
						var tableRow="";
						tableRow+="<td>"+element.username+"</td>";
						tableRow+="<td>"+element.name+"</td>";
						tableRow+="<td>"+element.email+"</td>";
						tableRow+="<td>"+element.address+"</td>";
						tableRow+="<td>"+element.phone+"</td>";
						tableRow+="<td>Valid</td>";
						
						tableRow += "<td><a href='/admin/personalUseredit/"+element.id+"' class='btn btn-warning'>View</a>";
						tableBody=tableBody+"<tr>"+tableRow+"</tr>";
					});
					$('table').html(tableBody);
				}else{
					var tableBody="<tr><td>User Name</td><td>Name</td><td>Email</td><td>Address</td><td>Phone</td><td>Status</td><td></td></tr>";
					$("table").html(tableBody);
				}
			},
			error:function(response){
				
			}
		});
	});
	$('#uname').focus(function(){
		var erruname = $("#err_uname").val();
		if(erruname!=null){
			$('#err_uname').html("");
		}
	});
	$('#uname').focusout(function(){
		var uname = $("#uname").val();
		$.ajax({
			url: '/admin/get',
			method: 'post',
			datatype : 'json',
			data : {'field':'username',
					'val': uname},
			success:function(response){
				if(response.flag){
					$('#err_uname').html("User Name is Already Taken Plz select another one!!!");
				}
			},
			error:function(response){
				
			}
		});
	});

	$('#email').focus(function(){
		var erruname = $("#err_email").val();
		if(erruname!=null){
			$('#err_email').html("");
		}
	});
	$('#email').focusout(function(){
		var email = $("#email").val();
		$.ajax({
			url: '/admin/get',
			method: 'post',
			datatype : 'json',
			data : {'field':'email',
					'val': email},
			success:function(response){
				if(response.flag){
					$('#err_email').html("Email is Already in Use Plz select another one!!!");
				}
			},
			error:function(response){
				
			}
		});
	});
});