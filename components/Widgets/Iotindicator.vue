<template>
    <card>
        <div slot="header">
            <h4 class="card-title">{{config.selectedDevice.name}} - {{config.variableFullName}}</h4>
        </div>

        <i class="fa " :class="[config.icon, getIconColorClass()]" style="font-size: 35px"></i>

    </card>

</template>

<script>
    const topic = ""
    export default {
        props: ['config'],
        data() {
            return{
                value: false,
                topic: "",
                props: ['config']
             };
        },
        watch: {
            config: {
                inmediate: true,
                deep: true,
                handler() {
                    
                    this.$nuxt.$off(this.topic, this.processReceivedData) 
                    setTimeout(() => {
                        //this.value = false
                        this.topic = ""
                        //userId/did/uniquestr/sdata
                        this.topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata"
                        this.$nuxt.$on(topic, this.processReceivedData)
                        console.log(topic)
                        console.log("AQUI ESTOY :::::")
                        
                    }, 300);
                    this.value = false
                }
            }
        },
        mounted(){
             //userId/dId/uniquestr/sdata
            this.topic = ""
            const topic = this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata";
            console.log(topic);
            this.$nuxt.$on(topic, this.processReceivedData)
            
            
           
        },
        
        beforeDestroy(){

            this.value = 0
           this.$nuxt.$off(this.config.userId + "/" + this.config.selectedDevice.dId + "/" + this.config.variable + "/sdata", this.processReceivedData)
        },

        methods: {
            processReceivedData(data){

                try {
                    console.log("Receive")
                    console.log(data)
                    this.value = data.value
                } catch (error) {
                    console.log(error)
                }
                
            },

            getIconColorClass(){
                if(!this.value){
                    return "text-dark"
                }

                if(this.config.class == "success"){
                     return "text-success"
                }

                if(this.config.class == "primary"){
                    return "text-primary"
                }

                if(this.config.class == "warning"){
                    return "text-warning"
                }

                if(this.config.class == "danger"){
                    return "text-danger"
                }
          }
        }
    };

   //userId/dId/temperature/sdata
</script>