Vue.component("gest", {
	data: function () {
		    return {
		      sc: null,
		      selectedGest: {}
		    }
	},
	template: ` 
<div>
		Tabela gest-ova
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
		<button v-on:click="deleteGest" >Obriši korpu</button>
</div>		  
`
	, 
	methods : {
		init : function() {
			this.sc = {};
		}, 
		selectHost: function(gest) {
			this.selectedGest = gest;
			console.log(this.selectedGest);
			
    	},
		deleteGest : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Gest',{'data':this.selectedGest})
		          .then(
		        	response=>{
		        		this.sc = this.sc.filter((item) => {
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
        		  	this.sc = response.data;
          			console.log(this.sc);
          });
    }
});