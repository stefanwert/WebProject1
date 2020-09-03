Vue.component("host", {
	data: function () {
		    return {
		      sc: null,
		      selectedStudent: {}
		    }
	},
	template: ` 
<div>
		Tabela host-ova
		<table border="1">
		<tr bgcolor="lightgrey">
			<th>UserName</th><th>Password</th><th>Name</th><th>Surname</th><th>Gender</th></tr>
			<tr v-for="i in sc" v-on:click="selectHost(s)">
			<td> {{i.userName}}</td>
			<td> {{i.password}}</td>
			<td> {{i.name}} </td>
			<td> {{i.surname}} </td>
			<td> {{i.gender}} </td>
			</tr>
		</table>
		<br /> 
		<button v-on:click="clearSc" >Obriši korpu</button>
		
	<p>
		<a href="#/">Proizvodi</a>
	</p>
	
</div>		  
`
	, 
	methods : {
		init : function() {
			this.sc = {};
		}, 
		selectHost: function(student) {
			this.selectedStudent = student;
    	},
		deleteHost : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Host')
		          .then(response => (this.init()))
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