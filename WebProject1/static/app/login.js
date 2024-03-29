Vue.component("login", {
	data: function(){
		return {
				username: '',
				password: '',
				v:{}
		}
	},
	template: ` 
	<div class="d-flex justify-content-center">
		<div class="d-flex flex-column col-sm-3">
			<form onsubmit="return false">
			  <fieldset>
			    <legend>Prijavite se</legend>
			    <div class="form-group">
			      <label>Korisničko ime</label>
			      <input type="text" class="form-control" v-model="username" id="username" required  placeholder="Unesite korisničko ime" >
			    </div>
			    <div class="form-group">
			      <label for="exampleInputPassword1">Lozinka</label>
			      <input type="password" class="form-control" v-model="password" onfocus="this.value=''" id="password" placeholder="Lozinka" required >
			    </div>
			    <button  id="login" v-on:click="login()"  class="btn btn-primary">Prijavite se</button>
			  </fieldset>
			</form>	 
		</div>
	</div> 
	`	,
	methods: {
		login: function (){
			this.v.userName=this.username;
			this.v.password=this.password;
			axios
	          .post('/Login',this.v)
	          .then(
	        	response=>{
	        		//var data = JSON.parse(response.data); 
	    			if(response.data.uslov == "TRUE"){
	    				window.location.href = response.data.path;
	    			}
	    			else{
	    				$("#login").before("<p style=\"color:red\">Uneto korisničko ime ili lozinka je pogresna<p>");
	    			}
	        	}
	          );
		}
		
	},
	
});


/*window.onload = function() {
	$.ajax({
		url: "/",
		type:"GET",
		contentType:"application/json",
		dataType:"json",
		
	});
	};*/