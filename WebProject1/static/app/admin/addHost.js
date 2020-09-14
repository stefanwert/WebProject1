Vue.component("addHost", {
	data: function(){
		return {
				host:{},
				firstName: '',
				lastName: '',
				username: '',
				password: '',
				gender: '',
		}
	},
	template: ` 
	<div class="d-flex justify-content-center">
		<div class="d-flex flex-column col-sm-3">
			<form>
			<fieldset>
			    <legend>Registrujte domacina</legend>
				  <div class="form-group">
				    <label>Ime</label>
				    <input type="text" v-model="firstName" class="form-control" id="fname" placeholder="Unesite ime" required>
				  </div>
				  <div class="form-group">
					<label>Prezime</label>
				    <input type="text" class="form-control" v-model="lastName" id="lname" placeholder="Unesite prezime" required>
				  </div>
				  <div class="form-group">
					<label>Korisničko ime</label>
				    <input type="text" class="form-control" id="username" v-model="username"  placeholder="Unesite korisničko ime" required>
				  </div>
				  <div class="form-group">
				    <label>Lozinka</label>
				    <input type="password" class="form-control" id="password" v-model="password" onfocus="this.value=''" placeholder="Unesite lozinku" required>
				  </div>
				  <div class="form-group">
				    <label>Potvrdi lozinku</label>
				    <input type="password" class="form-control" id="confirmPassword" onfocus="this.value=''" placeholder="Potvrdite lozinku" required>
				  </div>
				  <div class="form-group">
				    <label>Pol: </label>
				    <select name="pol" id="gender" v-model="gender">
					    <option value="musko" selected>Muško</option>
					    <option value="zensko">Žensko</option>
					</select>
				  </div>
				  <button type="submit" id="register" v-on:click="register()" class="btn btn-success">Registruj domaćina</button>
				 </fieldset>
			</form>	 
		</div>
	</div>  
			
	`	, 
	mounted(){
	},
	methods: {
		register: function(){
			if(!(this.password.equals(this.confirmPassword)))
			{
				alert("Lozinke se ne podudaraju");
				return;
			}
			ret={}
			ret.userName=this.username;
			ret.password=this.password;
			ret.name=this.firstName;
			ret.surname=this.lastName;
			ret.gender=this.gender;
			axios
			.post('/Host',ret)
			.then(response => {
				if(response.data!=null)
				{
					$("#register").after("<p style=\"color:white\">USPESNO STE SE LOGOVALI !!!<p>");
					this.username='';
					this.password='';
					this.firstName='';
					this.lastName='';
					this.gender='';
				}
			})
			.catch(error =>{
				$("#register").after("<p style=\"color:white\">VEC JE ZAUZETO KORISNICKO IME !!!<p>");
				});
		}
	},

});