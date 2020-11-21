const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from users where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	insert: function(params, callback){
		var sql = "INSERT INTO users(username, password,email, type,status) VALUES (?,?,?,?,?)";
		db.execute(sql,params,function(status){
			getByUserName(params[0],callback);
		});
	},
	getByUserName: function(params,callback){
		var sql = "select id from users where id = ?";
		db.getResults(sql,params,function(id){
			callback(id);
		});
	},
	getById: function(id, callback){
		var sql = "select * from users where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	update:function(user, callback){
		var sql = "UPDATE users SET name='"+user.name+"',address='"+user.address+"',contactno='"+user.contactno+"',password='"+user.password+"' WHERE id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	updateCampaign :function(campaign, callback){
		var sql = "UPDATE campaigns SET title= ? ,endDate= ? ,description= ? WHERE id = ?";
		db.execute(sql,[campaign.title,campaign.ed,campaign.description,campaign.id],function(status){
			callback(status);
		});
	},
	getAllPersonal: function(callback){
		var sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, personal as p where u.id = p.uid";
		db.getResults(sql,null,function(results){
			callback(results);
		});
	},
	getAllOrganization : function(callback){
		var sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, organization as p where u.id = p.uid";
		db.getResults(sql,null,function(results){
			callback(results);
		});
	},
	getAllVolunteer : function(callback){
		var sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, volunteer as p where u.id = p.uid";
		db.getResults(sql,null,function(results){
			callback(results);
		});
	},
	getAllCampaings : function(callback){
		var sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and c.status != 4";
		db.getResults(sql,null,function(results){
			callback(results);
		});
	},
	getAllProblems : function(callback){
		var sql = "select c.id as cid,u.type as type,u.id as uid, r.id as rid,c.title as title, u.username as username ,r.description as description, r.updatedDate as ud from users as u, campaigns as c , reports as r where u.id = r.uid and c.id = r.cid ";
		db.getResults(sql,null,function(results){
			callback(results);
		});
	},
	getReleasedCampaings : function(callback){
		var sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and c.status = 4";
		db.getResults(sql,null,function(results){
			callback(results);
		});
	},
	VerifyUser: function(id,callback){
		var sql = " UPDATE users SET status = 1 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	BlockUser: function(id,callback){
		var sql = " UPDATE users SET status = 2 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	UnBlockUser: function(id,callback){
		var sql = " UPDATE campaigns SET status = 1 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	VerifyCampaign: function(id,callback){
		var sql = " UPDATE campaigns SET status = 1 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	BlockCampaign: function(id,callback){
		var sql = " UPDATE campaigns SET status = 2 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	UnBlockCampaign: function(id,callback){
		var sql = " UPDATE campaigns SET status = 1 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	deleteReport: function(id,callback){
		var sql = " DELETE FROM reports WHERE id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	ReleaseCampaign: function(id,callback){
		var sql = " UPDATE campaigns SET status = 4 where id = ?";
		db.execute(sql,[id],function(status){
			callback(status);
		});
	},
	getPersonalById: function(id,callback){
		var sql = "select u.id as id,u.type as type,u.username as username, u.email as email ,u.type as type,u.status as status, p.name as name,p.contactno as phone,p.address as address from users as u, personal as p where u.id = p.uid and u.id = ?";
		db.getResults(sql,id,function(results){
			callback(results[0]);
		});
	},
	getOrganizationById:function(id,callback){
		var sql = "select u.id as id,u.type as type,u.username as username, u.email as email ,u.type as type,u.status as status, p.name as name,p.contactno as phone,p.address as address from users as u, organization as p where u.id = p.uid and u.id = ?";
		db.getResults(sql,id,function(results){
			callback(results[0]);
		});
	},
	getVolunteerById:function(id,callback){
		var sql = "select u.id as id,u.type as type,u.username as username, u.email as email ,u.type as type,u.status as status, p.name as name,p.contactno as phone,p.address as address from users as u, volunteer as p where u.id = p.uid and u.id = ?";
		db.getResults(sql,id,function(results){
			callback(results[0]);
		});
	},
	getCampaignById:function(id,callback){
		var sql = "select u.id as id,u.username as username, u.email as email , c.title as title, c.image as image, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status,c.description as description from users as u, campaigns as c where c.id = ? and u.id = c.uid";
		db.getResults(sql,id,function(results){
			callback(results[0]);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id = '"+id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	userSearch: function(user, callback){
		var sql;
		if(user.see == "0"){
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and u."+user.searchby+" LIKE '%"+user.search+"%'";
			}
			else{
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and p."+user.searchby+" LIKE '%"+user.search+"%'";
			}
		}
		else if(user.see == "1"){
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and u.status = 1";
			}
			else{
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and p."+user.searchby+" LIKE '%"+user.search+"%' and u.status = 1";
			}
		}
		else if(user.see == "2"){
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and u.status = 2";
			}
			else{
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and p."+user.searchby+" LIKE '%"+user.search+"%' and u.status = 2";
			}
		}
		else{
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and u.status = 0";
			}
			else{
				sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, "+user.table+" as p where u.id = p.uid and p."+user.searchby+" LIKE '%"+user.search+"%' and u.status = 0";
			}
		}
		db.getResults(sql,null,function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	campaignSearch: function(user, callback){
		var sql;
		if(user.see == "0"){
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and c.status != 4";
			}
			else{
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and c."+user.searchby+" LIKE '%"+user.search+"%' and c.status != 4";
			}
		}
		else if(user.see == "1"){
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and c.status = 1";
			}
			else{
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and c."+user.searchby+" LIKE '%"+user.search+"%' and c.status = 1";
			}
		}
		else if(user.see == "2"){
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and c.status = 2";
			}
			else{
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and c."+user.searchby+" LIKE '%"+user.search+"%' and c.status = 2";
			}
		}
		else{
			if(user.searchby == "email" || user.searchby == "username"){
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and u."+user.searchby+" LIKE '%"+user.search+"%' and c.status = 0";
			}
			else{
				sql = "SELECT c.id as id,u.username as username, u.email as email, c.title as title, c.target_fund as tf, c.raised_fund as rf, c.publisedDate as pd, c.endDate as ed, c.status as status FROM campaigns as c ,users as u WHERE u.id = c.uid and c."+user.searchby+" LIKE '%"+user.search+"%' and c.status = 0";
			}
		}
		db.getResults(sql,null,function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	}
};