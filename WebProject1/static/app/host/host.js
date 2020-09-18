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
function checkDate(date1,date2){
	return  date1.getDate() == date2.getDate() && 
			date1.getMonth() == date2.getMonth() &&
			date1.getYear() == date2.getYear();
}

Vue.component("apartment-guest", {
	data: function () {
		    return {
		    	apartments: null,
		      	selectedApartment: {},
		      	picture:'',
		      	listaApartmana:[],
		      	filterLista:[],
		      	selectedDate:new Date(),
		      	selectedDate2:new Date(),
		    	
		    }
	},
	template: ` 
<div class="d-flex justify-content-center">
	<div class="d-flex flex-column ">
		<div class="d-row justify-content-center">
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
									<td class="menu"><input id="odcena" type="number" name="odcena">
									</td>
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
							</table>
						</td>
					</tr>
					<tr>
						<b>Po datumu</b>
						<table>
							<tr>
							<td style="color:black;">
								<vuejs-datepicker v-model="selectedDate"></vuejs-datepicker>
							</td>
							<td style="color:black;">
								<vuejs-datepicker v-model="selectedDate2"></vuejs-datepicker>
							</td>
							<td>
								<button type="button" class="btn btn-primary btn-sm" v-on:click="filtrirajPoDatumu()">Po datumu</button>
							</td>
					</tr>
			</table>
					</tr>
					<tr >
						<td class="menu"  colspan="2"><button class="btn btn-primary btn-sm" name="buttonFiltriranja" v-on:click="pretragaiFilter">Filtriraj</button></td>
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
				<div id="users" class="d-flex p-2 justify-content-center">
				    <div class="d-flex flex-column p-2">
						<div class="d-flex flex-row flex-wrap p-2">
								<div v-for="i in novaLista" class="p-3">
									<div class="card border-light mb-3" style="max-width: 16rem;">
										<img v-on:click="showApartment(i)" style="height: 200px; width: 100%; display: block;" :src=getPictureAddres(i) alt="Card image">
									<div class="card-body">
									</div>
										<ul class="list-group list-group-flush">
												<li class="list-group-item">Broj gostiju: {{i.numOfGuests}}</li>
												<li class="list-group-item">Broj soba: {{i.numOfRooms}}</li>
												<li class="list-group-item">Cena po noćenju: {{i.pricePerNight}}</li>
												<li class="list-group-item">Adresa: {{i.location.address.address}}</li>
										</ul>
								    </div>
						        </div>
					      </div>
				      </div>
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
        filtrirajPoDatumu:function(){
        	var list = this.filterLista.slice();
       	 	this.filterLista=[];
       	 	var selectedDate=this.selectedDate;
       	 	var selectedDate2=this.selectedDate2;
       	 	for(a of this.apartments){
       	 		var i=0;
       	 		var j=0;
       	 		for(dTocheck=selectedDate;
       	 		dTocheck.getDate()<=selectedDate2.getDate()  
       	 		&& dTocheck.getMonth()<=selectedDate2.getMonth() 
       	 		&&dTocheck.getYear()<=selectedDate2.getYear()
       	 		;  dTocheck.setDate(dTocheck.getDate()+1)){
       	 			//for petlja
       	 			j++
	       	 		for(d of a.availableDates){
	       	 			var d2=new Date(d);
	       	 			if(checkDate(d2,dTocheck)){
	       	 				i++;
	       	 				break;
	       	 			}
	       	 			
	       	 		}
       	 			if(i==j){
       	 				this.filterLista.push(a);
       	 			}
       	 		}
       	 	}
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
        	 //po datumu
        	 var list = this.filterLista.slice();
        	 this.filterLista=[];
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
          .get('/AllApartmentsForHost')
          .then(response => {
        		  	this.apartments = response.data;
        		  	for(a of this.apartments){
        		  		this.filterLista.push(a);
        		  	}
          });
        
    },
    components: {
      	vuejsDatepicker
      }
});
