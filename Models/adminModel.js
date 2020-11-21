const db = require('./db');

module.exports= {
	insert: function(admin, callback){
		var sql = "INSERT INTO users(username,email, password, type, status) VALUES (?,?,?,?,?)";
		db.execute(sql,[admin.username,admin.email,admin.password,0,1],function(status){
			if(status){
				sql = "select id from users where username = ?";
				db.getResults(sql,[admin.username], function(result){
					sql = "INSERT INTO admin(uid, name, phone, address, sq) VALUES (?,?,?,?,?)";
					db.execute(sql,[result[0].id,admin.name,admin.contact,admin.address,admin.sq],function(status){
						callback(status);
					});
				});
			}
			
		});
	},
	getById: function(id, callback){
		var sql = "SELECT u.email as email ,a.name as name, a.address as address, a.phone as phone, a.sq as sq FROM admin as a, users as u WHERE a.uid = u.id and u.id = ?";
		db.getResults(sql,[id], function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	update:function(user, callback){
		var sql = "UPDATE users SET email = ? WHERE id = ?";
		db.execute(sql,[user.id],function(status){
			sql = "UPDATE admin SET name = ?, phone = ?, address = ?, sq = ? WHERE uid = ?";
			db.execute(sql,[user.name,user.phone,user.address,user.sq,user.id],function(status){
				callback(status);
			});
		});
	},
	getAll: function(callback){
		var sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.phone as phone,p.address as address from users as u, admin as p where u.id = p.uid";
		db.getResults(sql,null, function(results){
			callback(results);
		});
	},
	delete: function(id, callback){
		var sql = "DELETE FROM users WHERE id = '"+id+"'";
		db.execute(sql,function(status){
			callback(status);
		});
	},
	search: function(user, callback){
		var sql;
		if(user.searchby == "email" || user.searchby == "username"){
			sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, admin as p where u.id = p.uid and u."+user.searchby+" LIKE '%"+user.search+"%'";
		}
		else{
			sql = "select u.id as id,u.status as status,u.username as username, u.email as email ,u.type as type,p.name as name,p.contactno as phone,p.address as address from users as u, admin as p where u.id = p.uid and p."+user.searchby+" LIKE '%"+user.search+"%'";
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