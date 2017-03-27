<template>
<div class="row">



    <router-link to="/">Go to home</router-link>
    <div class="col l12">
        <div class="row">
            <div class="col s12 m12 l7">
                <div class="card darken-1">
                    <div class="card-content">
                        <button @click="reset" class="btn-floating btn-small waves-effect waves-light red tooltipped float-right" data-position="bottom" data-delay="50" data-tooltip="Reset signature information">
                            <i class="material-icons">settings_backup_restore</i>
                                reset
                        </button>

                        <h5 class="title">Signature information</h5>

                        <div class="row">
                            <form class="col s12">

                                <!-- tab navigation -->
                                <div class="col s12">
                                    <ul class="tabs tabs-fixed-width">
                                        <li class="tab col s3"><a class="active" href="#tab1">Basics</a></li>
                                        <li class="tab col s3"><a href="#tab2">Contact</a></li>
                                        <li class="tab col s3"><a href="#tab3">Other</a></li>
                                        <li class="tab col s3"><a href="#tab4">Options</a></li>
                                    </ul>
                                </div>

                                <!-- tab content -->
                                <div id="tab1" class="row">

                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">account_circle</i>
                                        <input id="name" type="text" v-model="input.name" v-on:keyup="inputChange()">
                                        <label for="name">Name</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">account_circle</i>
                                        <input id="position" type="text" class="validate" v-model="input.position" v-on:keyup="inputChange()">
                                        <label for="position">Position in PeaceGeeks</label>
                                    </div>
                                </div>

                                <div id="tab2" class="row">

                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">phone</i>
                                        <input id="phone" type="tel" class="validate" v-model="input.phone" v-on:keyup="inputChange()">
                                        <label for="phone">Phone</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">email</i>
                                        <input id="email" type="email" class="validate" v-model="input.email" v-on:keyup="inputChange()">
                                        <label for="email">Email</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">speaker_phone</i>
                                      <input id="skype" type="text" class="validate" v-model="input.skype" v-on:keyup="inputChange()">
                                      <label for="skype">Skype</label>
                                    </div>
                                </div>

                                <div id="tab3" class="row">
                                    <div class="input-field col s12">
                                        <i class="material-icons prefix">enhanced_encryption</i>
                                        <input id="pgp_sig" type="text" class="validate" v-model="input.pgp_sig" v-on:keyup="inputChange()">
                                        <label for="pgp_sig">PGP signature</label>
                                    </div>
                                </div>

                                <div id="tab4" class="row">
                                    <div class="input-field col s12">
                                        <input type="checkbox" id="includeLogo" v-model="state.isLogoIncluded" />
                                        <label for="includeLogo">Include logo</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <input type="checkbox" id="includeOfficeAddress" v-model="state.isOfficeAddressIncluded" />
                                        <label for="includeOfficeAddress">Include office address</label>
                                    </div>

                                    <div class="input-field col s12">
                                        <input type="checkbox" id="includeCampaignCopy" v-model="state.isCampaignCopyIncluded"/>
                                        <label for="includeCampaignCopy">Include Google Impact Challenge campaign copy.</label>
                                    </div>
                                </div>

                            </form>

                        </div>

                    </div>
                </div>
            </div>

            <div class="col s12 m12 l5">
                <div class="card darken-1">
                    <div class="card-content">
                        <button v-show="state.isThereInput" data-clipboard-target="#signature_block" class="btn-floating btn-small waves-effect waves-light red tooltipped float-right btn_clip" data-position="bottom" data-delay="50" data-tooltip="Copy signature to clipboard">
                            <i class="material-icons">content_copy</i>
                        </button>

                        <h5 class="title">Signature preview</h5>

                        <div class="row">
                            <div id="signature_block" class="signature_preview text-black" v-if="state.isThereInput">

                                <div id="block_campaign" v-if="state.isCampaignCopyIncluded">
                                    <p>PeaceGeeks is a top 10 finalist for the Google Impact Challenge! You can help us to support immigrant and refugee empowerment in Canada by <a href="https://goo.gl/3mzNWr" target="_blank">voting PeaceGeeks.</a></p>
                                    <p>For more information, visit <a href="http://www.votepeacegeeks.org" target="_blank">VotePeaceGeeks.org!</a></p>
                                </div>

                                <div id="block_logo" v-if="state.isLogoIncluded">
                                    <a href="https://peacegeeks.org/" target="_blank"><img src="https://docs.google.com/uc?export=download&id=0B0fyI8OyUvBVRGJrcnVJdl80NWs&revid=0B0fyI8OyUvBVaDhQbVlkNmM0Q1VvaytvQUJpUUZxT3hpK2lZPQ" width="120" title="Peacegeeks"></a>
                                </div>

                                <div id="block_baseinfo" v-if="input.name || input.position">
                                    <b v-if="input.name">{{ input.name }}</b><span v-if="input.name && input.position">,</span> <i v-if="input.position">{{ input.position }}</i>
                                </div>

                                <div id="block_address" v-if="state.isOfficeAddressIncluded">
                                    <a class="text-black" href="https://www.google.ca/maps/place/128+W+Hastings+St,+Vancouver,+BC+V6B+1G9/@49.2819163,-123.1105061,17z/data=!3m1!4b1!4m5!3m4!1s0x548671798f7e2787:0xd8cd8b33d2f4488c!8m2!3d49.2819163!4d-123.1083174" target="_blank">
                                        #210 - 128 West Hastings Street
                                        <br>
                                        Vancouver, BC, V6B 1G8
                                    </a>
                                    <br>
                                </div>

                                <div style="font-size:12px">
                                    <span v-if="input.phone">
                                        <b>p.</b> {{ input.phone }}
                                    </span>

                                    <span v-if="input.phone && input.email"> | </span>

                                    <span v-if="input.email">
                                        <b>e.</b> <a :href="'mailto:' + input.email">{{ input.email }}</a>
                                    </span>
                                    <br>
                                </div>

                                <div style="font-size:12px">
                                    <span v-if="input.skype">
                                        <b>skype.</b> {{ input.skype }}
                                    </span>
                                    <br>
                                </div>

                                <div style="font-size:12px">
                                    <span v-if="input.pgp_sig">
                                        <b>pgp.</b> {{ input.pgp_sig }}
                                    </span>
                                    <br>
                                </div>
                                <br>
                            </div>

                            <div class="signature_preview" v-else> Add some values to generate the signature. </div>
                        </div>
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
        return {
            title: 'Test',
            input: {
                name: '',
                position: '',
                phone: '',
                email: '',
                skype: '',
                pgp_sig: ''
            },
            state: {
                isThereInput: false,
                isHelpActive: true,
                isLogoIncluded: true,
                isOfficeAddressIncluded: true,
                isCampaignCopyIncluded: false
            }
        }
    },
  components: {},
  watch: {},
  mounted: function () {
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
