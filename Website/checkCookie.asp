<%@ language="javascript"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
</head>
<body>

      <%  
          var cookie = Request.Cookies("status");
          ////没有成功登陆过
          //if (cookie == null) {
          //    /*Response.Write("1");*/
          //    Response.Redirect("login.asp");
          //}
          //else if (cookie == "ok") {
          //    /*Response.Write("2");*/
          //    Response.Redirect("index.html");
          //}
          //else {
          //    /*Response.Write("3");*/
          //    Response.Redirect("login.asp");
          //}
          if ((cookie != "ok")) {
              Response.Redirect("login.asp");
          }
          
         ///* Response.Write(Request.Cookies("status"));*/
          
       
      %>

    

</body>
</html>