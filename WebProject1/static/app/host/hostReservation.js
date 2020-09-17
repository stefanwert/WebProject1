Vue.component("host-reservation", {
	data: function () {
		    return {
		    	reservation: null,
		    	selectedReservation: {},
		    }
	},
	template: ` 
<div>
	<div class="d-flex justify-content-center">
		<table  class="table table-hover" border="3">
			<tr class="table-info" bgcolor="lightgrey">
				<th>Id</th><th>Broj nocenja</th><th>Od</th><th>Cena po noci</th><th>Host</th><th>Guest</th><th>Status</th></tr>
				<tr v-for="r in reservation" v-on:click="selectReservation(r)">
					<td> {{r.apartmentId}}</td>
					<td> {{r.numOfNights}}</td>
					<td> {{r.startDate}}</td>
					<td> {{r.totalPrice}}</td>
					<td> {{r.hostUserName}}</td>
					<td> {{r.guestUserName}}</td>
					<td> {{r.reservStatus}}</td>
				</tr>
		</table><br />
	</div>
	<div class="d-flex flex-row row-sm-2 justify-content-around">
			<div class="d-flex flex-column ">
				<button type="button" class="btn btn-info" v-on:click="accept()" >Prihvati rezervaciju</button><br /> 
			</div>
			<div class="d-flex flex-column ">
				<button type="button" class="btn btn-danger" v-on:click="decline()" >Odbi rezervaciju</button><br /> 
			</div>
	</div>

</div>		  
`
	, 
	methods : {
		selectReservation: function(reservation) {
			this.selectedReservation = reservation;
			console.log(this.selectedReservation);
    	},
    	accept: function(){
    		this.selectedReservation.reservStatus="ACCEPTED";
    		axios
            .put('/ReservationHost',this.selectedReservation)
            .then(response => {
            	promeniRutu("HostReservation");
            });
    	},
    	decline: function(){
    		this.selectedReservation.reservStatus="DENIED";
    		axios
            .put('/ReservationHost',this.selectedReservation)
            .then(response => {
            	promeniRutu("HostReservation");
            });
    	}
    	
	},
	
	mounted () {
        axios
          .get('/ReservationHost')
          .then(response => {
        		  	this.reservation = response.data;
          			console.log(this.ap);
          });
    }
});
