<template>
    <div>
        <nav class="top-nav">
            <div class="nav-wrapper"><a class="page-title">{{ title }}</a></div>
        </nav>

        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    data() {
        return {
            title: 'Telus'
        }
    },
    methods: {
        apiGet: function(apiEndpoint) {
            return this.$http.get(apiEndpoint).then(function(response){
                return response;
            });
        },
        apiPut: function(apiEndpoint, data, options) {
            return this.$http.put(apiEndpoint,data,options).then(function(response){
                return response;
            });
        },
        apiPost: function(apiEndpoint, data, options) {
            return this.$http.post(apiEndpoint,data,options).then(function(response){
                return response;
            });
        },
        apiDelete: function(apiEndpoint) {
            return this.$http.delete(apiEndpoint).then(function(response){
                return response;
            });
        }
    },
}
</script>
