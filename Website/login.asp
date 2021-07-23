<%@ language="javascript"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8" />
		<title>登录界面</title>
		<link rel="stylesheet" href="css/style.css" />
	</head>

	<body>
	
		<div class="login">
			<div class="login_form">
				<div class="form">
					<div class="login_con">
						<span class="welcome">欢迎登陆</span>
						<br />
						<img src="src/images/user.png" class="user" />
						<input type="text" id="userName" name="userName" placeholder="请输入用户名" class="username same">
						<br />
						<img src="src/images/password.png" class="pass" />
						<input type="password" id="userPwd" name="userPwd" placeholder="请输入密码" class="password same" />
						<br />
						<input type="text" placeholder="请输入验证码" class="yanzhengma" />
						<img src="src/images/yanzhengma.png" style="margin-left: 20px;margin-top: 26px;">
						<div class="btn">
							<button type="button" onClick="login()" class="denglu">登录</button>
							<button type="button" onClick="register();" class="zhuce">注册</button>
						</div>
					</div>
				</div>
				</div>
			</div>
			<div class="footer">
				<a href="#">版权所有：cugsoft </a>&nbsp;
				<a href="#">技术支持：luxury</a>
			</div>
		

		<script>
			function login() {
				var _name = document.getElementById("userName").value;
                var _pwd = document.getElementById("userPwd").value;
				location.assign('setCookie.asp?name=' + _name + '&pwd='+_pwd);
                
			}
			function register() {
                window.location.href = "register.html";
            }
        </script>

	</body>

</html>