Vue.component("pictureSave", {
	data: function () {
		    return {
		    	files: [],
				filePath: '',
				korisniciOrg: [],
				korisnici: [],
				resursi: [],
				diskovi: [],
				sviDiskovi : [],
				resursiOrg: [],
				putanja : ''
		    }
	},
	template: ` 
<div>
		<input multiple type ="file" ref='file' v-on:change='promeniPutanju()' name='slika' accept="image/x-png,image/jpeg" />
		<button class="dugme" v-on:click="submitFile()">Posalji sliku</button>
			    
			    
</div>		  
`
	, 
	methods : {
		promeniPutanju: function () {
			this.files = this.$refs.file.files;
			
		},
		submitFile: function(){
	        /*
	                Initialize the form data
	            */
				for(let file of this.files){
					let formData = new FormData();

		            /*
		                Add the form data we need to submit
		            */
		            formData.append('file', file);

		        /*
		          Make the request to the POST /single-file URL
		        */
		            axios.post( '/upload',
		                formData,
		                {
		                headers: {
		                    'Content-Type': 'multipart/form-data'
		                }
		              }
		            ).then(response => {
		          	this.filePath = response.data;
		          	//Uzmi okaci sad sliku
		          	this.putanja = this.filePath;
		        }).catch(error =>{
					console.log(error);
				});
				}
				

	      }
	}
	
});