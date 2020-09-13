Vue.component("apartment-detail", {
	data: function () {
		    return {
		      sc: null,
		      selectedGest: {}
		    }
	},
	template: ` 
<div>
		radiii
</div>		  
`
	, 
	methods : {
		
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