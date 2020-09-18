Vue.component("comments", {
	data: function () {
		    return {
		    	cm: null,
		      	selectedComment: {},
		    };
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<legend>Tabela komentara</legend>
		<table  class="table table-hover" border="3">
		<tr class="table-info" bgcolor="lightgrey">
			<th>Apartman</th><th>Gost</th><th>Komentar</th><th>Rejting</th></tr>
			<tr v-for="i in cm" v-on:click="selectComment(i)">
				<td> {{i.gestUserName}}</td>
				<td> {{i.idAppartment}}</td>
				<td> {{i.commentText}}</td>
				<td> {{i.rating}} </td>
			</tr>
		</table><br />
		<button type="button" class="btn btn-danger" v-on:click="deleteComment" >Obriši komentar</button><br /> <br /> 
	</div>
</div>		  
`
	, 
	methods : {
		init : function() {
			this.cm = {};
		}, 
		selectComment: function(comment) {
			this.selectedComment = comment;
			
    	},
		deleteComment : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Comments',{'data':this.selectedComment.getCommentText()})
		          .then(
		        	response=>{
		        		this.cm = this.cm.filter((item) => { }
		        		);
		        		this.selectedComment= {};
		        	});
		        	}	
			}
		},
		
	mounted () {
        axios
          .get('/CommentsHost')
          .then(response => {
        		  	this.cm = response.data;
          			console.log(this.cm);
          });
    }
});