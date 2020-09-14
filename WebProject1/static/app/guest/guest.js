Vue.component("guest", {
	data: function () {
		    return {
		      guests: null,
		      selectedGest: {}
		    }
	},
	template: ` 	  
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela gostiju</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Korisničko ime</th><th>Lozinka</th><th>Ime</th><th>Prezime</th><th>Pol</th></tr>
			<tr v-for="i in guests">
				<td> {{i.userName}}</td>
				<td> {{i.password}}</td>
				<td> {{i.name}}</td>
				<td> {{i.surname}}</td>
				<td> {{i.gender}} </td>
			</tr>
		</table><br />
		<button type="button" class="btn btn-danger" v-on:click="deleteGest" >Obriši gosta</button><br /> <br /> 
	</div>
</div>	
`, 
	methods : {
		init : function() {
			this.guests = {};
		}, 
		selectGest: function(gest) {
			this.selectedGest = gest;
			console.log(this.selectedGest);
			
    	},
		deleteGest : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Gest',{'data':this.selectedGest})
		          .then(
		        	response=>{
		        		this.guests = this.guests.filter((item) => {
		        			return item.userName !=this.selectedGest.userName; });
		        		this.selectedGest= {};
		        	}
		          )
			}
		} 
	},
	mounted () {
        axios
          .get('/AllGest')
          .then(response => {
        		  	this.guests = response.data;
          			console.log(this.guests);
          });
    }
});


Vue.component("viewProfile", {
    data: function() {
        return {
        	loggedin:{},
            guest: {username: '', password: '', name: '', surename: '', gender: ''},
        }
    },
    
    mounted: function() {
        axios
        .get('/loggedUser')
        .then(response => {
            this.loggedin = response.data;
        })
        .catch(error => {
            alert(error);
        })
        
    },
    template: 
`
<div class="container">
    <h2>Edit Profile</h2>
    <div class="row">
        <div class="col-md-9 justify-content-cente personal-info">
            <h3>Lični podaci</h3>
            <form class="form-horizontal justify-content-cente" role="form">
                <div class="form-group">
                    <label class="col-lg-3 control-label">Ime:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" v-model="loggedin.name">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Prezime:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" v-model="loggedin.surname">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label">Korisničko ime:</label>
                    <div class="col-md-8">
                        <input class="form-control" type="text" v-model="loggedin.userName">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label">Lozinka:</label>
                    <div class="col-md-8">
                        <input class="form-control" type="password" v-model="loggedin.password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label">Potvrdi lozinku:</label>
                    <div class="col-md-8">
                        <input class="form-control" type="password" v-model="loggedin.password">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label"></label>
                    <div class="col-md-8">
                        <input type="button" class="btn btn-primary" value="Sačuvaj promene">
                        <span></span>
                        <input type="reset" class="btn btn-danger" value="Odustani">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
`,
    methods: {
       
        editUser: function() {
            window.location.href = "guest.html#/edit/" + this.$route.params.username;
        },
        reload() {
            axios
            .get('guest/' + this.$route.params.username)
            .then(response => {
                this.guest = response.data.guest;
            })
            .catch(error => {
                alert(error.response.data);
            })
        },
    }
});