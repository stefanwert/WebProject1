Vue.component("login", {
	data: function(){
		return {
				username: '',
				password: '',
		}
	},
	template: ` 
	<div class="d-flex justify-content-center">
		<div class="d-flex flex-column col-sm-3">
			<form>
			  <fieldset>
			    <legend>Prijavite se</legend>
			    <div class="form-group">
			      <label>Korisničko ime</label>
			      <input type="date" class="form-control" v-model="username" id="username" required  placeholder="Unesite korisničko ime" >
			    </div>
			    <div class="form-group">
			      <label for="exampleInputPassword1">Šifra</label>
			      <input type="password" class="form-control" v-model="password" id="password" placeholder="Šifra" required >
			    </div>
			    <button type="submit" id="login" v-on:click="login()"  class="btn btn-primary">Prijavite se</button>
			  </fieldset>
			</form>	 
		</div>
	</div> 
	`	,
	methods: {
		login: function (){
			alert("Login");
			window.location.href="admin.html";
		}
		
	}
	
});