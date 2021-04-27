const express = require('express')
const router = express.Router()
const axios = require('axios')
const {checkAuth} = require('../middlewares/authentication.js')

import Device from '../models/device.js'
import AlarmRule from '../models/emqx_alarm_rule.js'
import SaverRule from '../models/emqx_saver_rule.js'
import Template from '../models/template.js'
import EmqxAuthRule from "../models/emqx_auth.js";
import Data from "../models/data.js";

/*
  __  __  ____  _____  ______ _       _____ 
 |  \/  |/ __ \|  __ \|  ____| |     / ____|
 | \  / | |  | | |  | | |__  | |    | (___  
 | |\/| | |  | | |  | |  __| | |     \___ \ 
 | |  | | |__| | |__| | |____| |____ ____) |
 |_|  |_|\____/|_____/|______|______|_____/
 */ 

/*         _____ _____
     /\   |  __ \_   _|
    /  \  | |__) || |  
   / /\ \ |  ___/ | |  
  / ____ \| |    _| |_ 
 /_/    \_\_|   |_____|
*/

const auth ={
    auth:{
        username: 'admin',
        password: process.env.EMQX_DEFAULT_APPLICATION_SECRET
    }
}

//GET DEVICES
router.get("/device", checkAuth, async (req, res) =>{

    try {
        const userId = req.userData._id
        //get devices
        var devices = await Device.find({userId: userId})
        //descoupling
        devices = JSON.parse(JSON.stringify(devices))
        
        //get saver rules
        const saverRules = await getSaverRules(userId)

        //get templates
        const templates = await getTemplate(userId)

        // get alarm rule
        const alarmRules = await getAlarmRules(userId)

        //saver rules to -> devices
        devices.forEach((device, index) => {
            devices[index].saverRule = saverRules.filter(
              saverRule => saverRule.dId == device.dId)[0] 
            
            devices[index].template = templates.filter(
                template =>  template._id == device.templateId)[0]

            devices[index].alarmRules = alarmRules.filter(alarmRule => alarmRule.dId == device.dId)
            
        })
        

        const toSend = {
        status: "success",
        data: devices
        }

        res.json(toSend)

    } catch (error) {

        console.log("ERROR GETTING DEVICES")
        console.log(error)
        const toSend = {
        status: "error",
        error: error
        }

    return res.status(500).json(toSend)
    }

    

})

//NEW DEVICE
router.post("/device", checkAuth, async (req, res) =>{

    try {
        const userId = req.userData._id

        var newDevice = req.body.newDevice
    

        newDevice.userId = userId

        newDevice.createdTime = Date.now()

        newDevice.password = makeid(10)       

        await createSaverRule(userId, newDevice.dId, true)

        const device = await Device.create(newDevice)

        await selectDevice(userId, newDevice.dId)

        const toSend = {
        status: "success"
    }

    return res.json(toSend)


 
 } catch (error) {
     console.log("ERROR CREATING NEW DEVICE")
     console.log(error)

     const toSend = {
        status: "error",
        error: error
    }

    return res.status(500).json(toSend)
        
    }
})

//DELETE DEVICE
router.delete("/device", checkAuth, async (req, res) =>{

    try {

        const userId = req.userData._id
        const dId = req.query.dId

        await deleteSaverRule(dId)

        //deleting all posible alarm rules
        await deleteAllAlarmRules(userId, dId);

        //deleting all posible mqtt device credentials
        await deleteMqttDeviceCredentials(dId);

        //deleting data mqtt
        await deleteMqttDataDevices(dId)
    
        const result = await Device.deleteOne({userId: userId, dId: dId})
    
        const toSend = {
            status: "success",
            data: result
        }
    
        return res.json(toSend)

    } catch (error) {
        console.log("ERROR DELETING DEVICE")
        console.log(error)

        const toSend = {
            status: "error"
        }
    
        return res.json(toSend)
        
    }
 

})

//UPDATE DEVICE (SELECTOR)
router.put("/device", checkAuth, async (req, res) =>{

    const dId = req.body.dId
    const userId = req.userData._id
    if(await selectDevice(userId,dId)){

        const toSend = {
            status: "success"
        }
    
        return res.json(toSend)

    }else{
        const toSend = {
            status: "error"
        }
    
        return res.json(toSend)
    }
    

})

//SAVER-RULE STATUS UPDATER
router.put('/saver-rule', checkAuth, async(req, res) => {

    const rule = req.body.rule

    await updateSaverRuleStatus(rule.emqxRuleId, rule.status)

    const toSend = {
        status: "success"
    }

    res.json(toSend)
})

/*
  ______ _    _ _   _ _______ _____ ____  _   _  _____ 
 |  ____| |  | | \ | |__   __|_   _/ __ \| \ | |/ ____|
 | |__  | |  | |  \| |  | |    | || |  | |  \| | (___  
 |  __| | |  | | . ` |  | |    | || |  | | . ` |\___ \ 
 | |    | |__| | |\  |  | |   _| || |__| | |\  |____) |
 |_|     \____/|_| \_|  |_|  |_____\____/|_| \_|_____/ 
*/

async function getAlarmRules(userId) {

    try {
        const rules = await AlarmRule.find({userId})
        return rules

    } catch (error) {
        return "error"
    }
}


async function  selectDevice(userId, dId){

    try {
        const result = await Device.updateMany({userId: userId}, {selected: false})
        const result2 = await Device.updateOne({dId: dId, userId: userId},{selected:true})
    
        return true
    } catch (error) {
        console.log("ERROR IN 'selectedDevice' FUNCTION")
        console.log(error)
        return false
    }

}


/*
//SAVER RULES FUNCTION
*/
//get templates
async function getTemplate(userId) {
    try {
        const templates = await Template.find({ userId: userId})
        return templates
    } catch (error) {

        return false
    }
}
//get saver rules

async function getSaverRules(userId) {
    try {
        const rules = await SaverRule.find({ userId: userId})
        return rules
    } catch (error) {
        console.log("Error enviando RULES")
        console.log(error)
        return false
    }
}

//Create saver rule
async function createSaverRule(userId, dId, status) {

    try {
        const url = "http://localhost:8085/api/v4/rules"

        const topic = userId + "/" + dId + "/+/sdata"
    
        const rawsql = "SELECT topic, payload FROM \"" + topic + "\" WHERE payload.save = 1"
    
        var newRule = {
            rawsql: rawsql,
            actions: [
                {
                    name: "data_to_webserver",
                    params: {
                        $resource: global.saverResource.id,
                        payload_tmpl: '{"userId":"' + userId + '","payload":${payload},"topic":"${topic}"}'
                    }
                }
            ],
            description: "SAVER-RULE",
            enabled: status
        }
    
        //save rule in emqx - grabamos regla en emqx
        const res = await axios.post(url, newRule, auth)
    
    
        if (res.status === 200 && res.data.data) {
            console.log(res.data.data)
    
            await SaverRule.create({
                userId: userId,
                dId: dId,
                emqxRuleId: res.data.data.id,
                status: status
            })
    
            return true
        }else {
            console.log("Aqui esta el error ERRROR")
            return false
        }
    } catch (error) {
        console.log("Error creating SAVER RULE")
        console.log(error)
        return false
    }


}


//Update saver rule
async function updateSaverRuleStatus(emqxRuleId, status) {

    const url = "http://localhost:8085/api/v4/rules/" + emqxRuleId

    const newRule = {
        enabled: status
    }

    const res = await axios.put(url, newRule, auth)

    if (res.status === 200 && res.data.data) {
        await SaverRule.updateOne({ emqxRuleId: emqxRuleId}, {status: status})
        console.log("Saver Rule Status Update...".green)
        return {
            status: "success",
            action: "update"
        }
    }
}
//delete saver rule

async function deleteSaverRule(dId) {

    try {
        const mongoRule = await SaverRule.findOne({dId: dId})

        const url = "http://localhost:8085/api/v4/rules/" + mongoRule.emqxRuleId

        const emqxRule = await axios.delete(url, auth)

        const deleted = await SaverRule.deleteOne({dId: dId})

        return true
    } catch (error) {
        console.log("Error Deleting Saver Rule")
        console.log(error)
        return false
    }
}

//delete ALL alarm Rules...
async function deleteAllAlarmRules(userId, dId) {
    try {
      const rules = await AlarmRule.find({ userId: userId, dId: dId });
  
      if (rules.length > 0) {
        asyncForEach(rules, async rule => {
          const url = "http://localhost:8085/api/v4/rules/" + rule.emqxRuleId;
          const res = await axios.delete(url, auth);
        });
  
        await AlarmRule.deleteMany({ userId: userId, dId: dId });
      }
  
      return true;
    } catch (error) {
      console.log(error);
      return "error";
    }
}

  // We can solve this by creating our own asyncForEach() method:
// thanks to Sebastien Chopin - Nuxt Creator :)
// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

//delete ALL emqx device  auth rules
async function deleteMqttDeviceCredentials(dId) {

    try {
      await EmqxAuthRule.deleteMany({ dId: dId, type: "device" });
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

async function deleteMqttDataDevices(dId) {
    try {
      await Data.deleteMany({dId: dId});
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
}

function makeid(length) {
    var result =''
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var charactersLength = characters.length
    for (var i = 0; i < length; i ++) {
      result += characters.charAt (
        Math.floor(Math.random() * charactersLength)
      )
    }
    return result
}

module.exports = router