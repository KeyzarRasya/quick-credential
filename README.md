<h1>welcome to login-quick</h1>

<h2>Installation</h2>
npm install login-quick

<h2>Usage</h2>
<p>login-quick is designed to make developer job easier especially in creating login and signup logic, 
  most of the time we usually create the same login and signup logic for different application,
  its wasting our time to do that so using this package, your job can be a lot easier</p>

<h3>cred.login(model, toFind, {identifier, password}, {isHash})</h3>
<P>this method is used for checking if the account exist or not, this method will return status:200 if account found

![image](https://github.com/KeyzarRasya/quick-credential/assets/76760159/022080bf-414b-4cf7-a05f-f4ddc3ae91e8)

  
and return status:401 if its not</P>
<p><b>model</b>: your model to check the account is available or not (example: user model)</p>
<p><b>toFind</b>: what field you want to field as identifier? its up tp yout model, if you using username, you can go with username, if you using email, you can go with email</p>
<p><b>{identifier, password}</b>: once you declare what field you want to find, now you can fill the value of the fiels using identifier, password is used to verify that this is your account or not</p>
<p><b>{isHash}</b>: by default it set to false, but if you set hash to true in the signup method you need to turn this into true also</p>
