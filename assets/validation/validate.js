module.exports= {
    Admin: function(admin,callback){
        var err_uname=null;
        var err_name=null;
        var err_pass=null;
        var err_cpass=null;
        var err_contact=null;
        var err_email=null;
        var err_address=null;
        var err_sq=null;
        var has_error = false;

		if(admin.name == null)
		{
			err_name = "Name Required";
			has_error=true;
		}

        if(admin.username == null)
		{
			err_uname = "Username Required";
			has_error=true;
		}
        
		if(admin.password == null)
		{
			err_pass= "Password Required";
			has_error=true;
		}
		if(admin.cpassword == null)
		{
			err_cpass= "Password Required";
			has_error=true;
		}

        if(admin.email == null)
		{
			err_email = "Email Required";
			has_error=true;
		}

		if(admin.contact == null)
		{
			err_contact= "contact No is Required";
			has_error=true;
		}

		if(admin.address == null)
		{
			err_address= "Address Required";
			has_error=true;
		}

		if(admin.sq == null)
		{
			err_sq= "Sequrity Que is Required";
			has_error=true;
		}

		if(has_error){
			var error = {
                err_uname: err_uname,
                err_name : err_name,
                err_pass : err_pass,
                err_cpass : err_cpass,
                err_contact : err_contact,
                err_email : err_email,
                err_address : err_address,
                err_sq : err_sq
            };
            callback(error);
		}else{
            callback(null);
        }
    }
};