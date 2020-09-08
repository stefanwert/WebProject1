Vue.component("host", {
	data: function () {
		    return {
		      sc: null,
		      selectedHost: {}
		    }
	},
	template: ` 
<div>
		Tabela host-ova
		<table border="1">
		<tr bgcolor="lightgrey">
			<th>UserName</th><th>Password</th><th>Name</th><th>Surname</th><th>Gender</th></tr>
			<tr v-for="i in sc" v-on:click="selectHost(i)">
			<td> {{i.userName}}</td>
			<td> {{i.password}}</td>
			<td> {{i.name}} </td>
			<td> {{i.surname}} </td>
			<td> {{i.gender}} </td>
			</tr>
		</table>
		<br /> 
		<button v-on:click="deleteHost" >Obriši korpu</button>
</div>		  
`
	, 
	methods : {
		init : function() {
			this.sc = {};
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
		        		this.sc = this.sc.filter((item) => {
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
        		  	this.sc = response.data;
          			console.log(this.sc);
          });
    }
});