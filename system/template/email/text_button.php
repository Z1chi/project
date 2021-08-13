<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		@media (max-width: 500px) {
			.logo {
				background-size: cover;
				height: 100px;
			}

			.logo img {
				width: 200px;
			}
		}
	</style>
</head>
<body style="background-color: #F5FAFF; color: #434343; font-family: Arial, sans-serif; line-height: 26px; margin: 0; border: 0; padding: 0;">
<table class="logo" style="width: 100%; height: 120px; border-collapse:collapse" width="100%" height="120">
	<tr>
		<td style="background-color: #027CEF; width: 100%; text-align: center; margin: 0; border: 0; padding: 0;" width="100%" bgcolor="#027CEF" align="center">
			<img src="<?=$URL_ASSETS?>/logo_500.png" style="width: 250px;" width="250">
		</td>
	</tr>
</table>


<table class="text_wrapper" style="margin-left: auto; margin-right: auto; text-align: justify; max-width: 670px; padding: 0 20px; width: 100%;" width="100%" align="justify">
	<td class="username" style="width: auto; height: 30px;  padding-top: 50px; padding-bottom: 3px;" height="30">
		<?=$TEXT?>
	</td>
</table>

<table>
	<div class="button_wrapper" style="margin-left: auto; margin-right: auto; text-align: center; padding-top: 2px; padding-top: 20px; padding-bottom: 10px;"><!--[if mso]>
		<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:40px;v-text-anchor:middle;width:200px;" arcsize="78%" stroke="f" fillcolor="#FF9700">
			<w:anchorlock/>
			<center>
		<![endif]-->
		<a href="<?=$BUTTON_URL?>" style="background-color:#48BF0A;border-radius:31px;color:white;display:inline-block;font-family:sans-serif;font-size:14px;font-weight:bold;line-height:40px;text-align:center;margin-left:auto;margin-right:auto;text-decoration:none;width:200px;-webkit-text-size-adjust:none; margin-bottom: 30px;"><?=$BUTTON_TEXT?></a>
		<!--[if mso]>
		</center>
		</v:roundrect>
		<![endif]-->
	</div>
</table>

<table class="text_wrapper_footer" style="margin-left: auto; margin-right: auto; max-width: 670px; padding: 0 20px; padding-bottom: 60px; width: 100%;" width="100%">
	<td>
		<p><strong><?=$TEXT_TEAM?></strong></p>
	</td>


	<table class="copyright" style="margin-left: auto; margin-right: auto; padding-top: 10px; padding-bottom: 10px; text-align: center; background-color: #04103B; width: 100%; font-weight: bold; font-size: 18px; color: white; line-height: 35px;" width="100%" align="center" bgcolor="#04103B">
		<td class="copyright" style="margin-left: auto; margin-right: auto; padding-top: 10px; padding-bottom: 10px; text-align: center; background-color: #04103B; width: 100%; font-weight: bold; font-size: 18px; color: white; line-height: 35px;" width="100%" align="center" bgcolor="#04103B"><?=$APP_NAME?> © 2018-<?=$YEAR?></td>
	</table>
</table></body>
</html>