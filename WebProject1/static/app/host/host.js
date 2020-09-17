Vue.component("host", {
	data: function () {
		    return {
		      hosts: null,
		      selectedHost: {}
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela domaćina</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Korisničko ime</th><th>Lozinka</th><th>Ime</th><th>Prezime</th><th>Pol</th></tr>
			<tr v-for="i in hosts" v-on:click="selectHost(i)">
				<td> {{i.userName}}</td>
				<td> {{i.password}}</td>
				<td> {{i.name}}</td>
				<td> {{i.surname}}</td>
				<td> {{i.gender}} </td>
			</tr>
		</table><br />
		<button type="button" class="btn btn-danger" v-on:click="deleteHost" >Obriši domaćina</button><br /> <br /> 
	</div>
</div>		  
`
	, 
	methods : {
		init : function() {
			this.hosts = {};
		}, 
		selectHost: function(host) {
			this.selectedHost = host;
			
    	},
		deleteHost : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Host',{'data':this.selectedHost})
		          .then(
		        	response=>{
		        		this.hosts = this.hosts.filter((item) => {
		        			return item.userName !=this.selectedHost.userName; });
		        		this.selectedHost= {};
		        	}
		          )
			}
		} 
	},
	mounted () {
        axios
          .get('/AllHost')
          .then(response => {
        		  	this.hosts = response.data;
          			console.log(this.hosts);
          });
    }
});