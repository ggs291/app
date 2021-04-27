<template>
    
    <div class="row" v-if="$store.state.devices.length > 0">
        
      
        <div 
            v-for="(widget, index) in $store.state.selectedDevice.template.widgets" 
            :key="index" 
            :class="[widget.column]"
            :value="fixWidget(widget)"
        >
        <!---
        <Json :value="fixWidget(widget)"></Json> --->

            <rtnumberchart
                v-if="widget.widget == 'numberchart'"
                :config="fixWidget(widget)"
            >
            </rtnumberchart>

            <iotswitch 
                v-if="widget.widget == 'switch'"
                :config="fixWidget(widget)"
            >
            </iotswitch>
            
            <iotbutton
                v-if="widget.widget == 'button'"
                :config="fixWidget(widget)"
            >
            </iotbutton>

            <iotindicator 
                v-if="widget.widget == 'indicator'"
                :config="fixWidget(widget)"
            >
            </iotindicator>  
        </div>
      
    </div>

    <div v-else>

        Select a Device...

    </div>

</template>

<script>
import Json from '~/components/Json.vue';
export default {
    middleware: 'authenticated',
    name: 'Dashboard',

    components: {
        [Json.name]: Json
    },

    mounted() {

    },

    methods: {

        fixWidget(widget){
            var widgetCopy = JSON.parse(JSON.stringify(widget))
            widgetCopy.selectedDevice.dId = this.$store.state.selectedDevice.dId
            widgetCopy.selectedDevice.name = this.$store.state.selectedDevice.name
            widgetCopy.userId = this.$store.state.selectedDevice.userId

            if (widget.widget == "numberchart"){
                widgetCopy.demo = false
            }

            return widgetCopy
        }
    }
}     
</script>