Vue.component("hostAdd", {
	data: function () {
		    return {
		    	userName:'',
		    	password:'',
		    	name:'',
		    	surname:'',
		    	gender:''
		    }
	},
	template: ` 
<div>
		Dodavanje host-ova !!!
		<br>
		
		<label>Username:</label>
		<input type="text" v-model="userName" /> <br />
		
		<label>Password:</label>
		<input name="ime" type="text" v-model="password"  /> <br />
		
		<label>Name:</label>
		<input type="text" v-model="name"  /> <br />
		
		<label>Surname:</label>
		<input type="text" v-model="surname"  /> <br />
		
		<label>Gender:</label>
		<input type="text" v-model="gender"  /> <br />
	
		<button v-on:click="add()">Add host</button>
</div>		  
`
	, 
	methods : {
		add:function(){
			ret={}
			ret.userName=this.userName;
			ret.password=this.password;
			ret.name=this.name;
			ret.surname=this.surname;
			ret.gender=this.gender;
			axios
			.post('/Host',ret);
		}
	}
	
});