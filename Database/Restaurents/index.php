



<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Đăng Nhập</title>
		<style>

		</style>
	</head>

<body>
	<div style="margin-left: 30%;">
		<div>
			<h1 style="color: black">Sign in</h1> 
		</div>
		<form name="formlogin" action="checklogin.php" method="post">
			<div><h2>
				<label  for="name">user</label>
				<input width = "100%" type="text" name="name" placeholder="Username" required/>
				<br>
				<label  for="password">pass</label>
				<input width = "100%" type="password" name="pass" placeholder="Password" required />
				<input type="submit" name="submit" value="submit"/>
				</h2>
			</div>
		</form>
		<br>
		<div>
			<a style="color: black" href="https://w">Contact us</a>
		</div>
	</div>
</body>
</html>
