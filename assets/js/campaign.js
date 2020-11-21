$(document).ready(function(){
	$('#search').keyup(function(){
		var search = $("#search").val();
		var searchby = $("#searchby").val();
		var see = $('#see').val();
		$.ajax({
			url: '/admin/searchcampaign',
			method: 'post',
			datatype : 'json',
			data : {'see' : see,
					'search':search,
					'searchby':searchby},
			success:function(response){
				var tableBody="<thead><td>User Name</td><td>Name</td><td>User Email</td><td>Campaign Title</td><td>Requested Fund</td><td>Raised Fund</td><td>Published Date</td><td>End Date</td><td>Status</td><td></td></thead>";
				if(response.user != 'error'){
					response.user.forEach(element => {
						var tableRow="";
						tableRow+="<td>"+element.username+"</td>";
						tableRow+="<td>"+element.email+"</td>";
						tableRow+="<td>"+element.title+"</td>";
						tableRow+="<td>"+element.tf+"</td>";
						tableRow+="<td>"+element.rf+"</td>";
						tableRow+="<td>"+element.pd+"</td>";
						tableRow+="<td>"+element.ed+"</td>";
						if(element.status == 1){
							tableRow+="<td>Valid</td>";
						}
						else if(element.status == 0){
							tableRow+="<td>InValid</td>";
						}
						else{
							tableRow+="<td>Blocked</td>";
						}
						tableRow += "<td><a href='/admin/campaignedit/"+element.id+"' class='btn btn-warning'>View</a>";
						tableBody=tableBody+"<tr>"+tableRow+"</tr>";
					});
					$('table').html(tableBody);
				}else{
					var tableBody="<thead><td>User Name</td><td>Name</td><td>User Email</td><td>Campaign Title</td><td>Requested Fund</td><td>Raised Fund</td><td>Published Date</td><td>End Date</td><td>Status</td><td></td></thead>";
					$("table").html(tableBody);
				}
			},
			error:function(response){
				
			}
		});
	});
	$('#see').change(function(){
		var search = $("#search").val();
		var searchby = $("#searchby").val();
		var see = $('#see').val();
		$.ajax({
			url: '/admin/searchcampaign',
			method: 'post',
			datatype : 'json',
			data : {'see' : see,
					'search':search,
					'searchby':searchby},
			success:function(response){
				var tableBody="<thead><td>User Name</td><td>Name</td><td>User Email</td><td>Campaign Title</td><td>Requested Fund</td><td>Raised Fund</td><td>Published Date</td><td>End Date</td><td>Status</td><td></td></thead>";
				if(response.user != 'error'){
					response.user.forEach(element => {
						var tableRow="";
						tableRow+="<td>"+element.username+"</td>";
						tableRow+="<td>"+element.email+"</td>";
						tableRow+="<td>"+element.title+"</td>";
						tableRow+="<td>"+element.tf+"</td>";
						tableRow+="<td>"+element.rf+"</td>";
						tableRow+="<td>"+element.pd+"</td>";
						tableRow+="<td>"+element.ed+"</td>";
						if(element.status == 1){
							tableRow+="<td>Valid</td>";
						}
						else if(element.status == 0){
							tableRow+="<td>InValid</td>";
						}
						else if(element.status == 3){
							tableRow+="<td>Complete</td>";
						}
						else{
							tableRow+="<td>Blocked</td>";
						}
						tableRow += "<td><a href='/admin/campaignedit/"+element.id+"' class='btn btn-warning'>View</a>";
						tableBody=tableBody+"<tr>"+tableRow+"</tr>";
					});
					$('table').html(tableBody);
				}else{
					var tableBody="<thead><td>User Name</td><td>Name</td><td>User Email</td><td>Campaign Title</td><td>Requested Fund</td><td>Raised Fund</td><td>Published Date</td><td>End Date</td><td>Status</td><td></td></thead>";
					$("table").html(tableBody);
				}
			},
			error:function(response){
				
			}
		});
	});
});