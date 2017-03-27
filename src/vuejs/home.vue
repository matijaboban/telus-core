<template>
<div class="row">



    <router-link to="/sec">Sec</router-link>
    <div class="col l12">
        <div class="row">
            <div class="col s12 m12 l7">
                <div class="card darken-1">
                    <div class="card-content">




                    </div>
                </div>
            </div>

            <div class="col s12 m12 l5">
                <div class="card darken-1">
                    <div class="card-content">

                    </div>
                </div>
            </div>
        </div>
      </div>


    </div>




</template>

<script>
    export default {
        name: 'home',
    data() {
        return {}
    },
    components: {},
    watch: {},
    mounted: function () {

        this.$parent.apiGet('https://jsonplaceholder.typicode.com').bind(this).then(function(response) {


            console.log(response.data);
            // // Add Client data
            // this.$set('client',response.data);
        });

        $(document).ready(function(){
            $('.tooltipped').tooltip({delay: 50});
        });
      },
    methods: {
        // Check input values for input and set input state parametar
        inputChange() {
            var formValueStatusCount = 0;

            // Process all form inputs
            for (var [key,inputValue] of Object.entries(this.$data.input)) {
                if (!inputValue == '') {
                    formValueStatusCount++;
                };
            }

            // set form status
            if (formValueStatusCount > 0) {
                this.$data.state.isThereInput = true;
            }
            else {
                this.$data.state.isThereInput = false;
            }
        },
        // Reset form values
        reset () {
            Object.assign(this.$data, this.$options.data());
        },
        help: function (event) {
        }
    }
}
</script>
