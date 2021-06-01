<template>
  <div>
    <!-- WIDGET CONFIGURATOR -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Widgets</h4>
        </div>

        <div class="row">

          <!-- WIDGET SELECTOR AND FORMS -->
          <div class="col-md-6">

            <!-- WIDGET SELECTOR -->
            <el-select
              v-model="widgetType"
              class="select-success"
              placeholder="Select Widget"
              style="width: 100%;"
              >

              <el-option
                class="text-dark"
                value="numberchart"
                label="Numbert Chart INPUT <-"
                >

              </el-option>
              <el-option
              class="text-dark"
              value="indicator"
              label="Boolean Indicator INPUT <-"
              >

              </el-option>
              <el-option
              class="text-dark"
              value="map"
              label="Map INPUT <-"
              >

              </el-option>
              <el-option
              class="text-dark"
              value="switch"
              label="Switch OUTPUT <-"
              >

              </el-option>
              <el-option
              class="text-dark"
              value="button"
              label="Button OUTPUT <-"
              >

              </el-option>
            </el-select>

            <br>
            <br>

            <!-- FORMS NUMBER CHART TYPE -->
            <div v-if="widgetType== 'numberchart'">
              <base-input
              v-model="ncConfig.variableFullName"
              label="Var Name"
              type="text"
              >
              </base-input>

              <base-input
              v-model="ncConfig.unit"
              label="Unit"
              type="text"
              >
              </base-input>

              <base-input
              v-model="ncConfig.decimalPlaces"
              label="Decimal Places"
              type="number"
              >
              </base-input>

              <!--<base-input
              v-model="ncConfig.icon"
              label="Icon"
              type="text"
              >
              </base-input> -->
              
              Select Icon
              <el-select v-model="ncConfig.icon"
              class="select-success"
              placeholder="Select Icon"
              style="width: 100%;"
              >

                <el-option class="text-icon"
                value="fa-cloud"
                label="Nube"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-wind"
                label="Wind"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-thermometer-half"
                label="Thermometer"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-water"
                label="Water"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-gas-pump"
                label="Gas"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-fire"
                label="Fire"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-burn"
                label="Burn"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-percent"
                label="Humidity %"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-sun"
                label="Sun"
                >
                </el-option>

              </el-select>
              <br>
              <br>

              <base-input 
              v-model.number="ncConfig.variableSendFreq"
              label="Send Freq"
              type="number"
              >  
              </base-input>

              <br>

              <base-input
              v-model="ncConfig.chartTimeAgo"
              label="Chart Back time (mins)"
              type="number"
              >
              </base-input>

              <br>
              Select Class
              <el-select v-model="ncConfig.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >

                <el-option class="text-success"
                  value="success"
                  label="Success"
                >  
                </el-option>

                <el-option class="text-primary"
                  value="primary"
                  label="Primary"
                >  
                </el-option>

                <el-option class="text-warning"
                  value="warning"
                  label="Warning"
                >  
                </el-option>

                <el-option class="text-danger"
                  value="danger"
                  label="Danger"
                >  
                </el-option>
              </el-select>

              <br><br>Column Width
              
              <el-select v-model="ncConfig.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >
                <el-option class="text-dark"
                  value="col-md-3"
                  label="col-md-3"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-4"
                  label="col-md-4"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-6"
                  label="col-md-6"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-12"
                  label="col-md-12"
                >
                </el-option>
              </el-select>
            </div>


            <!-- FORM SWITCH TYPE -->
            <div
              v-if="widgetType=='switch'"
            >

              <base-input 
                v-model="configSwitch.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>

              <!--<base-input
                v-model="configSwitch.icon"
                label="Icon"
                type="text"
              >
              </base-input>-->

              Select Icon
              <el-select v-model="configSwitch.icon"
              class="select-success"
              placeholder="Select Icon"
              style="width: 100%;"
              >

                <el-option class="text-icon"
                value="fa-plug"
                label="Plug"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-toggle-on"
                label="Toggle"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-radiation"
                label="Radiation"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-bolt"
                label="Bolt"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-radiation"
                label="Fan"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-atom"
                label="Atom"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-burn"
                label="Burn"
                >
                </el-option>

              </el-select>
              <br>
              <br>
              Select Class
              <el-select 
                v-model="configSwitch.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                >
                </el-option>

                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                >
                </el-option>

                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                >
                </el-option>

                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                >
                </el-option>

              </el-select>

              <br>
              <br>

              Column width
              <el-select
                v-model="configSwitch.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >

                <el-option class="text-dark"
                  value="col-md-3"
                  label="col-md-3"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-4"
                  label="col-md-4"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-6"
                  label="col-md-6"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-12"
                  label="col-md-12"
                >
                </el-option>

              </el-select>

            </div>


            <!-- FORM BUTTON TYPE -->

            <div v-if="widgetType == 'button'">

              <base-input 
                v-model="configButton.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>

              <base-input 
                v-model="configButton.message"
                label="Message to send"
                type="text"
              >
              </base-input>

              <base-input 
                v-model="configButton.text"
                label="Button text"
                type="text"
              >
              </base-input>

              <!--<base-input 
                v-model="configButton.icon"
                label="Icon"
                type="text"
              >
              </base-input>-->

             Select Icon
              <el-select v-model="configButton.icon"
              class="select-success"
              placeholder="Select Icon"
              style="width: 100%;"
              >

                <el-option class="text-icon"
                value="fa-stop"
                label="Emergency Stop"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-plus-circle"
                label="Plus Button"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-power-off"
                label="Power"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-cog"
                label="Start"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-th"
                label="Multiple Control"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-lock"
                label="Lock"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-crosshairs"
                label="Init Button"
                >
                </el-option>

              </el-select>
              <br> 

              <br>

              Select Class
              <el-select 
                v-model="configButton.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >
                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                >
                </el-option>

                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                >
                </el-option>

                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                >
                </el-option>

                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                >
                </el-option>

              </el-select>

              <br><br>

              Column width
              <el-select
                v-model="configButton.column"
                class="select-success"
                placeholder="Select Column Width"
                style="width: 100%;"
              >

                <el-option class="text-dark"
                  value="col-md-3"
                  label="col-md-3"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-4"
                  label="col-md-4"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-6"
                  label="col-md-6"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-12"
                  label="col-md-12"
                >
                </el-option>
              </el-select>

            </div>

            <!-- FORM INDICATOR TYPE -->
            <div v-if="widgetType == 'indicator'">

              <base-input
                v-model="configIndicator.variableFullName"
                label="Var Name"
                type="text"
              >
              </base-input>

              <!--<base-input
                v-model="configIndicator.icon"
                label="Icon"
                type="text"
              >
              </base-input>-->

              Select Icon
              <el-select v-model="configIndicator.icon"
              class="select-success"
              placeholder="Select Icon"
              style="width: 100%;"
              >

                <el-option class="text-icon"
                value="fa-circle"
                label="Circle"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-circle-notch"
                label="Notch"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-lightbulb"
                label="Bulb"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-solar-panel"
                label="Panel"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-microchip"
                label="Microchip"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-fan"
                label="Fan"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-door-open"
                label="Door"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-bell"
                label="Bell"
                >
                </el-option>

                <el-option class="text-icon"
                value="fa-lock"
                label="Lock"
                >
                </el-option>

              </el-select>

              <br>

              <base-input
                v-model="configIndicator.variableSendFreq"
                label="Send Freq"
                type="text"
              ></base-input>

              <br>
              Select Class
              <el-select v-model="configIndicator.class"
                class="select-success"
                placeholder="Select Class"
                style="width: 100%;"
              >

                <el-option
                  class="text-success"
                  value="success"
                  label="Success"
                >
                </el-option>

                <el-option
                  class="text-primary"
                  value="primary"
                  label="Primary"
                >
                </el-option>

                <el-option
                  class="text-warning"
                  value="warning"
                  label="Warning"
                >
                </el-option>

                <el-option
                  class="text-danger"
                  value="danger"
                  label="Danger"
                >
                </el-option>

              </el-select>

              <br><br><br>
              Column Width
              <el-select 
                v-model="configIndicator.column"
                class="select-success"
                style="width: 100%;"
              >

               <el-option class="text-dark"
                  value="col-md-3"
                  label="col-md-3"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-4"
                  label="col-md-4"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-6"
                  label="col-md-6"
                >
                </el-option>

                <el-option class="text-dark"
                  value="col-md-12"
                  label="col-md-12"
                >
                </el-option> 
              </el-select>

              <br><br>
            </div>
  
          </div>

          <!-- WIDGET PREVIEW -->
          <div class="col-md-6">
            <rtnumberchart 
              v-if="widgetType=='numberchart'"
              :config="ncConfig"
            >
            </rtnumberchart>

            <iotswitch
              v-if="widgetType=='switch'"
              :config="configSwitch"
            >
            </iotswitch>

            <iotbutton
              v-if="widgetType=='button'"
                :config="configButton"
            >
            </iotbutton>

            <iotindicator
              v-if="widgetType == 'indicator'"
              :config="configIndicator"
            >
            </iotindicator>

          </div>
        </div>

        <!-- ADD WIDGET BUTTON -->
        <div class="row pull-right">
          <div class="col-md-12">
            <base-button native-type="submit"
              type="primary"
              class="mb-3"
              size="lg"
              @click="addNewWidget()">
              Add Widget
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- DASHBOARD PREVIEW -->
    <div class="row">
      
      <div 
        v-for="(widget, index) of widgets" 
        :key="index" 
        :class="[widget.column]">

        <i
          aria-hidden="true"
          class="fa fa-trash text-warning pull-right"
          @click="deleteWidget(index)"
          style="margin-bottom: 10px;"
        > 
        </i>

        <rtnumberchart
          v-if="widget.widget == 'numberchart'"
          :config="widget"
        >
        </rtnumberchart>

        <iotswitch 
          v-if="widget.widget == 'switch'"
          :config="widget"
        >
        </iotswitch>

        <iotbutton
          v-if="widget.widget == 'button'"
          :config="widget"
        >
        </iotbutton>

        <iotindicator 
          v-if="widget.widget == 'indicator'"
          :config="widget"
        >
        </iotindicator>  
      </div>
      
    </div>

    <!-- SAVE TEMPLATE -->
    <div class="row" v-if="widgets.length > 0">
      <card>
        <div slot="header">
          <h4 class="card-title">Save template</h4>
        </div>

        <div class="row">
          <base-input 
            class="col-md-4"
            v-model="templateName"
            label="Template name"
            type="text"
          >
          </base-input>

          <base-input
            class="col-md-8"
            v-model="templateDescription"
            label="Template description"
            type="text"
          >
          </base-input>
        </div>

        <br><br>

        <div class="row">
          <div class="col-md-12">
            <base-button 
              native-type="submit"
              type="primary"
              class="mb-3 pull-right"
              size="lg"
              @click="saveTemplate()"
            >
              Save template
            </base-button>
          </div>
        </div>
      </card>
    </div>

    <!-- TEMPLATE TABLES -->
    <div class="row">
      <card>
        <div slot="header">
          <h4 class="card-title">Templates</h4>
        </div>

        <div class="row">
          <el-table :data="templates">
            <el-table-column min-width="50" label="#" align="center">
              <div class="photo" slot-scope="{row, $index}">
                {{$index + 1}}
              </div>
            </el-table-column>

            <el-table-column 
              prop="name"
              label="Name"
            >
            </el-table-column>

            <el-table-column 
              prop="description"
              label="Description"
            >
            </el-table-column>

            <el-table-column 
              prop="widgets.length"
              label="Widgets"
            >
            </el-table-column>

            <el-table-column
              header-align="right"
              align="right"
              label="Actions"
            >
              <div 
                slot-scope="{row, $index}"
                class="text-right table-actions"
              >
              
                <el-tooltip
                  content="Delete"
                  effect="light"
                  :open-delay="300"
                  placement="top"
                >
                  <base-button 
                    @click="deleteTemplate(row)"
                    type="danger"
                    icon
                    size="sm"
                    class="btn-link"
                  >
                    <i class="tim-icons icon-simple-remove">
                    </i>
                  </base-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div> 
      </card>
    </div>

    <!-- JSON --> 

  </div>
</template>

<script>
import {Table, TableColumn} from "element-ui"
import {Select, Option} from "element-ui"
import { BaseSwitch } from '~/components';


export default {
  middleware: 'authenticated',
  components: {
    [BaseSwitch.name]: BaseSwitch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Option.name]: Option,
    [Select.name]: Select
   },
  data() {
    return {
      widgets:[],
      templates:[],
      widgetType: "",
      templateName: "",
      templateDescription: "",

      ncConfig:{
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "Volts",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "10",
        unit: "Watts",
        class: "success",
        column: "col-md-6",
        decimalPlaces: "2",
        widget: "numberchart",
        icon: "fa-thermometer-half",
        chartTimeAgo: 60,
        demo: true
      },

      configSwitch: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "Luz",
        variable: "varname",
        variableType: "output",
        class: "danger",
        widget: "switch",
        icon: "fa-toggle-on",
        column: "col-md-6",
      },

      configIndicator: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888"
        },
        variableFullName: "Luz",
        variable: "varname",
        variableType: "input",
        variableSendFreq: "10",
        class: "success",       
        widget: "indicator",
        icon: "fa-lightbulb",
        column: "col-md-6"   
      },

      configButton: {
        userId: "userid",
        selectedDevice: {
          name: "Home",
          dId: "8888",
          templateName: "Fan number one",
          templateId: "9586h564",
          saverRule: false
        },
        variableFullName: "Fan",
        variable: "var1",
        variableType: "output",
        icon: "fa-power-off",
        column: "col-md-6",
        widget: "button",
        class: "success", 
        message: "{'fanstatus': 'stop'}"      
      },

    };
  },
  mounted(){
    this.getTemplates()
  },
  methods: {
    //Get Template
    async getTemplates(){

      const axiosHeaders = {
        headers: {
            token: this.$store.state.auth.token
        }
      }
      
      try {
        const res = await this.$axios.get("/template", axiosHeaders)
        console.log(res.data)

        if (res.data.status == "success"){
          this.templates = res.data.data
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Error getting templates"
        })
        console.log(error)
        return
      }
    },

//Save Template
    async saveTemplate(){
      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        }
      }
      const toSend = {
        template: {
          name: this.templateName,
          description: this.templateDescription,
          widgets: this.widgets
        }
      }

      try {
        const res = await this.$axios.post("/template", toSend, axiosHeaders)

        if (res.data.status == "success"){
          this.$notify({type: 'success', icon: 'tim-icons icon-alert-circle-exc', message: 'Template ' + toSend.template.name + ' created'})
          this.getTemplates()

          this.widgets = []
          this.templateName = []
          this.templateDescription = []
        }
      } catch (error) {
          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: "Error creating template..."
          })
          console.log(error)
          return
      }
    },

    //Delete Template
    async deleteTemplate(template) {

      const axiosHeaders = {
        headers: {
          token: this.$store.state.auth.token
        },
        params: {
          templateId:template._id
        }
      }

      console.log(axiosHeaders)

      try {
        const res = await this.$axios.delete("/template", axiosHeaders)
        console.log(res.data)

        if (res.data.status == "fail" && res.data.error == "template in use") {

          this.$notify({
            type: "danger",
            icon: "tim-icons icon-alert-circle-exc",
            message: template.name + " is in use. First remove the devices linked to the template!"
          });
          
          return;
        }

        if (res.data.status == "success") {
          this.$notify({
            type: "success",
            icon: "tim-icons icon-alert-circle-exc",
            message: template.name + " was deleted"
          })

          this.getTemplates()
        }
      } catch (error) {
        this.$notify({
          type: "danger",
          icon: "tim-icons icon-alert-circle-exc",
          message: "Template can't deleted"

        })
      }
    },

    // Add Widget
    addNewWidget() {
      if (this.widgetType == "numberchart") {
        this.ncConfig.variable = this.makeid(10)
        this.widgets.push(JSON.parse(JSON.stringify(this.ncConfig)))
      }
      if (this.widgetType == "switch") {
        this.configSwitch.variable = this.makeid(10)
        this.widgets.push(JSON.parse(JSON.stringify(this.configSwitch)))
      }
      if (this.widgetType == "button") {
        this.configButton.variable = this.makeid(10)
        this.widgets.push(JSON.parse(JSON.stringify(this.configButton)))
      }
      if (this.widgetType == "indicator") {
        this.configIndicator.variable = this.makeid(10)
        this.widgets.push(JSON.parse(JSON.stringify(this.configIndicator)))
      }
    },
    
    //Delete Widget
    deleteWidget(index) {
      this.widgets.splice(index, 1)
    },

    //Make Id
    makeid(length) {
      var result = ""
      var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      var charactersLength = characters.length
      for (var i = 0; i < length; i ++) {
        result += characters.charAt (
          Math.floor(Math.random() * charactersLength)
        )
      }
      return result
    }
  }
}
</script>