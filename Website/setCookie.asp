<%@ language="javascript"%>
<!DOCTYPE html>
<html>
    <head>
		<meta http-equiv="Content-Type" charset=utf-8" />
		<title>验证界面</title>
		
	</head>
	
<body>
  
    <%        
        var username = Request.QueryString("name");
        var pwd = Request.QueryString("pwd");
        var str = new String(pwd);
        var password = str.replace(" ", "");
        var conn = new ActiveXObject("ADODB.Connection");
        var rs = new ActiveXObject("ADODB.Recordset");
        var connectionstring = "DSN=MapGIS;Driver={MySQL ODBC 8.0 Driver};Server=localhost;Database=sys;User=root; Password=";
        conn.open(connectionstring);
        var sql = "select Password from user where id=" + "'"+username+"'";
        rs.open(sql, conn);
        /*Response.Write(rs.Fields("pwd")+'1222222');*/
        /*Response.Write(password+'123123');*/
        if (!rs.eof) {
            var _password = rs.Fields("Password");
            /*Response.Write("password: "+password+'1'+"\n"+"_password: "+_password+'1\n');*/
            //密码正确
            if (password==_password) {
                Response.Cookies("status") = "ok";
                Response.Redirect("index.asp");
            }
            //密码错误
            else {
                //Response.Redirect("login.asp");
                Response.Write("<meta http-equiv='Content - Type' charset='utf-8' />;<script>alert('密码错误！');location='login.asp'</script>");
                
            }
            
        }
        //账号未注册
        else {
            //Response.Redirect("login.asp");
            Response.Write("<meta http-equiv='Content - Type' charset='utf-8' />;<script>alert('账号不存在！');location='login.asp'</script>");
        }
    %>

   
</body>
</html>