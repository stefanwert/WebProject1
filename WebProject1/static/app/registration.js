Vue.component("registration", {
	data: function(){
		return {
				user:{},
				role: null,
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
			    <legend v-if="role === 'ADMIN'">Registrujte domacina</legend>
			    <legend v-if="role === null">Registrujte se</legend>
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
				    <label>Šifra</label>
				    <input type="password" class="form-control" id="password" v-model="password" placeholder="Unesite šifru" required>
				  </div>
				  <div class="form-group">
				    <label>Pol</label></br>
				    <select name="cars" id="gender" v-model="gender">
					    <option value="Musko">Musko</option>
					    <option value="Zensko">Zensko</option>
					    <option value="Drugo">Drugo</option>
					</select>
				  </div>
				  <button type="submit" id="register" v-on:click="register()" class="btn btn-success">Registrujte se</button>
				 </fieldset>
			</form>	 
		</div>
	</div>  
			
	`	, 
	mounted(){
	},
	methods: {
		register: function(){
			ret={}
			ret.userName=this.username;
			ret.password=this.password;
			ret.name=this.firstName;
			ret.surname=this.lastName;
			ret.gender=this.gender;
			axios
			.post('/Gest',ret)
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