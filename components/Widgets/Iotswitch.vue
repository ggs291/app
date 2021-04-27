<template>

    <card>

        <div slot="header">

            <h3 class="card-category"> {{ config.selectedDevice.name }} - {{ config.variableFullName }}</h3>
        </div>

        
        
            <h3 class="card-title">
                <i  class="fa " :class="[config.icon, getIconColorClass()]" aria-hidden="true"
                    style="font-size: 30px;"></i>
                <base-switch @click="value = !value; sendValue()" :value="value" :type="config.class" size="lg" on-text="ON" off-text="OFF" style="margin-top: 10px; width: 40px;" class="mb-3 pull-right"
                >
                </base-switch>
            </h3>

    </card>

</template>


<script>
import BaseSwitch from '../BaseSwitch.vue';
    export default {
  components: { BaseSwitch },
        name: 'iotswitch',
        props: ['config'],
        
        data() {
            return {
                value: true
            };
        },
        watch: {
            config: {
                immediate: true,
                deep: true,
                handler() {
                }
            }
        },
        mounted() {
        },
        beforeDestroy() {
        },
        methods: {
            getIconColorClass() {
                //para apagar el icono 
                if (!this.value){
                    return "text-dark";
                }
                if (this.config.class == "success") {
                    return "text-success";
                }
                if (this.config.class == "primary") {
                    return "text-primary";
                }
                if (this.config.class == "warning") {
                    return "text-warning";
                }
                if (this.config.class == "danger") {
                    return "text-danger";
                }
            },
            sendValue(){
                const toSend = {
                    topic: this.config.userId + '/' + this.config.selectedDevice.dId + '/' + this.config.variable + '/actdata',
                    msg: {
                        value: this.value
                    }
                };
                $nuxt.$emit('mqtt-sender', toSend);
            }
        }
    };
</script>