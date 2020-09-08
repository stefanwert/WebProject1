const app = new Vue({
  el: "#app",
  data() {
    return {
      filters: [
        "Bungalow",
        "Chalet",
        "Guesthouse",
        "Hotel",
        "Townhouse",
        "Apartment",
        "Boutique hotel",
        "Cabin",
        "Guest suite",
        "Hostel",
        "Loft",
        "Villa"
      ],
      search: "",
      checkedFilters: [],
      allSelected: false,
      selectAllText: 'Select All',
      activeTrigger: false,
      dropdown: false,
      showLoader: false
    };
  },
  computed: {
    filteredList() {
      return this.filters.filter(item => {
        return item.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    selectAll: function() {
      this.checkedFilters = [];
      this.selectAllText = this.selectAllText == "Select All" ? 'Clear All' : 'Select All';
      if (this.allSelected) { 
        for (filter in this.filters) {
          this.checkedFilters.push(this.filters[filter].toString());
        }
      }
    },
    showDropdown: function(){
      if(this.dropdown == false){
        this.dropdown = true;
        this.activeTrigger = true;
        TweenMax.fromTo(
          "#dropdown",
          0.55,
          {
            autoAlpha: 0,
            y: -10
          },
          {
            autoAlpha: 1,
            y: 0,
            ease: Power2.easeOut
          }
        );
      }else{
        this.dropdown = false;
        this.activeTrigger = false;
         TweenMax.to(
          "#dropdown",
          0.2,
          {
            autoAlpha: 0,
            y: -10,
            ease: Power2.easeOut
          });
      }

    }
  },
  created: function () {
          const customScroll = new SimpleBar(document.getElementById('customScroll'));
  }
});
