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
			<tr v-for="i in guests" v-on:click="selectGest(i)">
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
        }
    },
    
    mounted: function() {
        axios
        .get('/loggedUser')
        .then(response => {
            this.loggedin = response.data;
            this.loggedin.confirmPassword=this.loggedin.password;
        })
        .catch(error => {
            alert(error);
        });
        
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
                        <input class="form-control" type="text" v-model="loggedin.name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Prezime:</label>
                    <div class="col-lg-8">
                        <input class="form-control" type="text" v-model="loggedin.surname" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label">Korisničko ime:</label>
                    <div class="col-md-8">
                        <input class="form-control" type="text" v-model="loggedin.userName" disabled >
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label">Lozinka:</label>
                    <div class="col-md-8">
                        <input class="form-control" type="password" v-model="loggedin.password" onfocus="this.value=''" required>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-md-3 control-label">Potvrdi lozinku:</label>
                    <div class="col-md-8">
                        <input class="form-control" type="password" v-model="loggedin.confirmPassword" onfocus="this.value=''" required>
                    </div>
                </div>
                <div class="form-group">
                  <br />
                    <div class="col-md-8">
                        <input type="button" class="btn btn-primary" v-on:click="editUser()" value="Sačuvaj promene">
                        <span></span>
                        <input type="reset" class="btn btn-danger" value="Odustani" href="#/AppartmentGuest">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
`,
    methods: {
       
        editUser: function() {
        	
            if(!(this.loggedin.password==this.loggedin.confirmPassword))
			{
				$("#editUser").after("<p style=\"color:white\">Lozinke se ne podudaraju!<p>");
            	alert("Lozinke se ne podudaraju");
            	return;
			}
            axios
            .put('/Gest',this.loggedin)
            .then(response => {
                //this.guest = response.data.guest;
            	if(response.data!=null)
				{
					$("#editUser").after("<p style=\"color:white\">Uspešno ste izmenili podatke!<p>");
				}
            });
        },
        reload() {
        	if(!(this.loggedin.password==this.loggedin.confirmPassword))
			{
				alert("Lozinke se ne podudaraju");
				return;
			}
            axios
            .put('/Gest',this.loggedin)
            .then(response => {
                //this.guest = response.data.guest;
            })
            .catch(error => {
                alert(error.response.data);
            })
        },
    }
});