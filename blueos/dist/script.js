function login()
{
 var password = document.getElementById("pass");
  if(password.value=="")
{alert("Type bluecomm as password");
return false;
}
  if(password.value=="bluecomm")
{document.getElementById("form").style.height="0%";
document.getElementById("pass").value="";

  }
  else{
  alert("Type bluecomm -is the password");
document.getElementById("pass").value="";
return false;

} 
} 
function windlogin(e) {
 if (e.keyCode == 13) {
   login();

   document.getElementById("pass").value="";

 }
}	
function gologin()
{document.getElementById("form").style.height="100%";
    
}