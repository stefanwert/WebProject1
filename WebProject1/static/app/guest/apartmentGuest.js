Vue.component("apartment-guest", {
	data: function () {
		    return {
		    	apartments: null,
		      	selectedApartment: {},
		      	picture:'',
		      	listaApartmana:[],
		      	filterLista:[]
		    	
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<div class="row">
			<table>
				<tr >
				 <td @mouseover="showmenu('menuFilter')" @mouseleave="hidemenu('menuFilter')">
					 <p><b>Filter</b></p>
				  <table class="menu"  id="menuFilter" border="1">
					<tr>
						<td class="menu">
							<b>Cena</b>
						</td>
						<td class="menu">
							<table>
								<tr>
									<td class="menu"><b>OD</b></td>
									<td class="menu"><input id="odcena" type="number" name="odcena"></td>
									<td class="menu"><b>DO</b></td>
									<td class="menu"><input id="docena" type="number" name="docena"></td>
								</tr>
								<tr>
								</tr>
							</table>

						</td>	
					</tr>
					<tr>
						<td class="menu">
							<b>Broj soba</b>
						</td>
						<td class="menu">
							<table>
								<tr>
									<td class="menu"><b>OD</b></td>
									<td class="menu"><input id="odsobe" type="number" name="odsobe"></td>
									<td class="menu"><b>DO</b></td>
									<td class="menu"><input id="dosobe" type="number" name="odsobe"></td>
								</tr>
								<tr>
								</tr>
							</table>

						</td>
					</tr>
					<tr>
						<td class="menu">
							<b>Broj gostiju</b>
						</td>
						<td class="menu">
							<table>
								<tr>
									<td class="menu"><b>OD</b></td>
									<td class="menu"><input id="odgostiju" type="number" name="odsobe"></td>
									<td class="menu"><b>DO</b></td>
									<td class="menu"><input id="dogostiju" type="number" name="odsobe"></td>
								</tr>
								<tr>
								</tr>
							</table>

						</td>
					</tr>
					<tr>
						<td class="menu">
							<b>Po lokaciji</b>
						</td>
						<td class="menu">
							<table>
								<tr>
									<td class="menu"><input id="lokacija" type="text" ></td>
								</tr>
								<tr>
								</tr>
							</table>
						</td>
					</tr>
					
					<tr >
						<td class="menu"  colspan="2"><button class="dugme" name="buttonFiltriranja" v-on:click="pretragaiFilter">Filtriraj</button></td>
					</tr>
				  </table>
				 </td>
				</tr>
			</table>
		</div>
		<div class="d-flex justify-content-end p-2">
			<h4>Sortiraj po ceni:</h4>
			<button type="button" class="btn btn-danger btn-sm" v-on:click="sortiranjeRastuce()">Rastuće</button>
			<button type="button" class="btn btn-primary btn-sm" v-on:click="sortiranjeOpadajuce()">Opadajuće</button>
		</div>
		<div class="row">
				<div class="column" v-for="i in novaLista">
					<img v-on:click="showApartment(i)" style="height: 300px; width: 100%; display: block;" :src=getPictureAddres(i) alt="Card image">
					<div class="card-body">
						<p class="card-text" style="color:green;">
							Broj soba: {{i.numOfRooms}} 
							</br>Cena po danu je: {{i.pricePerNight}}
							</br>Broj gostiju: {{i.numOfGuests}}
							</br>Lokacija:{{i.location.address.address}}
						</p>
					</div>
				</div>
		</div>
	</div>
</div>			  
`
	, computed:{
		novaLista:function (){
			return this.filterLista;
			
		}
	},
	methods : {
		init : function() {
			this.ap = {};
		}, 
		showApartment: function(apartment) {
			var a="apartment-detail/";
			var b=apartment.id.toString();
			a = a + b
			promeniRutu(a);
			//promeniRutu("");
			
    	},
		deleteApartment : function () {
			if (confirm('Da li ste sigurni?') == true) {
				axios
		          .delete('/Apartment',{'data':this.selectedApartment})
		          .then(
		        	response=>{
		        		this.ap = this.ap.filter((item) => {
		        			return item.id !=this.selectedApartment.id; });
		        		this.selectedApartment= {};
		        	}
		          )
			}
		},
		getPictureAddres: function(i){
			return 'slike/'+i.pictures[0];
		},
		showmenu: function(data){
            document.getElementById(data).style.display="block";
        },
        hidemenu: function(data){
			document.getElementById(data).style.display="none";
        },
        pretragaiFilter:function(){
        	axios
            .get('/AllApartments')
            .then(response => {
          		  	this.apartments = response.data;
            });
        	 var odRam=document.getElementById("odcena").value;
        	 var doRam=document.getElementById("docena").value;
        	 if(!(odRam=="" || doRam=="")){
        		 odRam=parseInt(odRam);
            	 doRam=parseInt(doRam);
            	 //var lista=[];
            	 this.filterLista = []
            	 for(a of this.apartments){
            		 if(odRam<=a.pricePerNight && doRam>=a.pricePerNight){
            			this.filterLista.push(a);
            		 }
            	 }
        	 }else{
        		 this.filterLista=this.apartments;
        	 }
        	 //odavde je za broj soba
        	 var list = this.filterLista.slice();
        	 this.filterLista=[];
        	 var odsobe=document.getElementById("odsobe").value;
        	 var dosobe=document.getElementById("dosobe").value;
        	 if(!(odsobe=="" || dosobe=="")){
        		 odsobe=parseInt(odsobe);
        		 dosobe=parseInt(dosobe);
            	 //var lista=[];
            	 for(a of list){
            		 if(odsobe<=a.numOfRooms && dosobe>=a.numOfRooms){
            			this.filterLista.push(a);
            		 }
            	 }
        	 }else{
        		 this.filterLista=list;
        	 }
        	 //odavde je za broj gostiju
        	 var list = this.filterLista.slice();
        	 this.filterLista=[];
        	 var odsobe=document.getElementById("odgostiju").value;
        	 var dosobe=document.getElementById("dogostiju").value;
        	 if(!(odsobe=="" || dosobe=="")){
        		 odsobe=parseInt(odsobe);
        		 dosobe=parseInt(dosobe);
            	 //var lista=[];
            	 for(a of list){
            		 if(odsobe<=a.numOfGuests && dosobe>=a.numOfGuests){
            			this.filterLista.push(a);
            		 }
            	 }
        	 }else{
        		 this.filterLista=list;
        	 }
        	 
        	 //odavde za lokaciju
        	 var list = this.filterLista.slice();
        	 this.filterLista=[];
        	 var l2=document.getElementById("lokacija").value;
        	 if(!( l2=="")){
            	 for(a of list){
            		 var l1=a.location.address.address;
            		 l1=l1.toLowerCase();
            		 l2.toLowerCase();
            		 if(l1.includes(l2)){
            			this.filterLista.push(a);
            		 }
            	 }
        	 }else{
        		 this.filterLista=list;
        	 }
        },
        sortiranjeRastuce:function(){
        	axios
            .get('/AllApartments')
            .then(response => {
          		  	this.apartments = response.data;
            });
        	 var odRam=document.getElementById("odcena").value;
	       	 var doRam=document.getElementById("docena").value;
	       	 if(!(odRam=="" || doRam=="")){
	       		 odRam=parseInt(odRam);
	           	 doRam=parseInt(doRam);
	           	 this.filterLista = []
	           	 for(a of this.apartments){
	           		 if(odRam<=a.pricePerNight && doRam>=a.pricePerNight){
	           			this.filterLista.push(a);
	           		 }
	           	 }
	       	 }else{
	       		 this.filterLista=this.apartments;
	       	 }
	       	var len = this.filterLista.length;
	        for (var i = len-1; i>=0; i--){
	          for(var j = 1; j<=i; j++){
	            if(this.filterLista[j-1].pricePerNight>this.filterLista[j].pricePerNight){
	                var temp = this.filterLista[j-1];
	                this.filterLista[j-1] = this.filterLista[j];
	                this.filterLista[j] = temp;
	             }
	          }
	        }
	          	 
        },
        sortiranjeOpadajuce:function(){
        	axios
            .get('/AllApartments')
            .then(response => {
          		  	this.apartments = response.data;
            });
        	 var odRam=document.getElementById("odcena").value;
	       	 var doRam=document.getElementById("docena").value;
	       	 if(!(odRam=="" || doRam=="")){
	       		 odRam=parseInt(odRam);
	           	 doRam=parseInt(doRam);
	           	 this.filterLista = []
	           	 for(a of this.apartments){
	           		 if(odRam<=a.pricePerNight && doRam>=a.pricePerNight){
	           			this.filterLista.push(a);
	           		 }
	           	 }
	       	 }else{
	       		 this.filterLista=this.apartments;
	       	 }
	       	var len = this.filterLista.length;
	        for (var i = len-1; i>=0; i--){
	          for(var j = 1; j<=i; j++){
	            if(this.filterLista[j-1].pricePerNight<this.filterLista[j].pricePerNight){
	                var temp = this.filterLista[j-1];
	                this.filterLista[j-1] = this.filterLista[j];
	                this.filterLista[j] = temp;
	             }
	          }
	        }
	          	 
        },
        
	},
	
	mounted () {
		document.getElementById("menuFilter").style.display="none";
        axios
          .get('/AllApartments')
          .then(response => {
        		  	this.apartments = response.data;
        		  	for(a of this.apartments){
        		  		this.filterLista.push(a);
        		  	}
          });
        
    }
});
