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
            guest: {username: '', password: '', name: '', surename: '', gender: ''},
        }
    },
    mounted: function() {
        axios
        .get('/Users/loggedin')
        .then(response => {
            this.loggedin = response.data;
        })
        .catch(error => {
            alert(error);
        })

        axios
        .get('/Guest/' + this.$route.params.username)
        .then(response => {
            this.guest = response.data.guest;
        })
        .catch(error => {
            alert(error.response.data);
        })
    },
    template: 
`
<div id="profilePreview" class="d-flex p-2 justify-content-center">
    <div class="d-flex flex-column p-2">
        <div class="d-flex flex-column p-2">
            <h4>{{guest.username}}</h4>
            <p>Korisničko ime: {{guest.userName}}</p>
            <p>Lozinka: {{guest.password}}</p>
            <p>Ime: {{guest.name}}</p>
            <p>Prezime: {{guest.surename}}</p>
            <p>Pol: {{guest.gender}}</p>
            <div class="d-flex flex-row p-2">
                <a  href="#" v-on:click.prevent="editUser" class="btn btn-primary m-2">Izmjeni</a> 
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