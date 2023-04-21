'use strict';

const Logger = require('../helper/logger.js');

const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

const { PullTimer, http } = require('homebridge-http-base');

class OutletAccessory {
  constructor(api, accessory, accessories, FakeGatoHistoryService, telegram) {
    this.api = api;
    this.accessory = accessory;
    this.accessories = accessories;
    this.FakeGatoHistoryService = FakeGatoHistoryService;
    this.Telegram = telegram;

    this.getService();
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // Services
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  async getService() {
    let service = this.accessory.getService(this.api.hap.Service.Outlet);

    if (!service) {
      Logger.info('Adding Outlet service', this.accessory.displayName);
      service = this.accessory.addService(
        this.api.hap.Service.Outlet,
        this.accessory.displayName,
        this.accessory.context.config.type
      );
    }

    if (!service.testCharacteristic(this.api.hap.Characteristic.CurrentConsumption))
      service.addCharacteristic(this.api.hap.Characteristic.CurrentConsumption);

    if (!service.testCharacteristic(this.api.hap.Characteristic.TotalConsumption))
      service.addCharacteristic(this.api.hap.Characteristic.TotalConsumption);

    this.historyService = new this.FakeGatoHistoryService('energy', this.accessory, { storage: 'fs' });

    await timeout(250);

    service
      .getCharacteristic(this.api.hap.Characteristic.CurrentConsumption)
      .on('change', this.changedState.bind(this));

    service.getCharacteristic(this.api.hap.Characteristic.On).on('set', this.setState.bind(this));

    this.start();
    this.refreshHistory(service);
  }

  start() {
    this.pullTimer = new PullTimer(this.log, 5000, this.getStatus.bind(this), (value) => {});
    this.pullTimer.start();
  }

  async getStatus() {
    if (this.pullTimer) {
      this.pullTimer.resetTimer();
    }

    http.httpRequest('http://10.0.2.1/status', (error, response, body) => {
      Logger.warn('Data', body);
      const json = JSON.parse(body);

      this.accessory
        .getService(this.api.hap.Service.Outlet)
        .getCharacteristic(this.api.hap.Characteristic.On)
        .updateValue(json.relays[0].ison);

      this.accessory
        .getService(this.api.hap.Service.Outlet)
        .getCharacteristic(this.api.hap.Characteristic.OutletInUse)
        .updateValue(json.meters[0].power > 0);

      this.accessory
        .getService(this.api.hap.Service.Outlet)
        .getCharacteristic(this.api.hap.Characteristic.CurrentConsumption)
        .updateValue(json.meters[0].power);

      this.accessory
        .getService(this.api.hap.Service.Outlet)
        .getCharacteristic(this.api.hap.Characteristic.TotalConsumption)
        .updateValue(json.meters[0].total);

      if (json.meters[0].power >= this.accessory.context.config.startValue && !this.accessory.context.started) {
        this.accessory.context.started = true;

        if (this.Telegram) this.Telegram.send('started', this.accessory.displayName);

        const motionAccessory = this.accessories.find(
          (accessory) => accessory.displayName === this.accessory.displayName + ' Motion'
        );

        if (motionAccessory) {
          motionAccessory
            .getService(this.api.hap.Service.MotionSensor)
            .getCharacteristic(this.api.hap.Characteristic.MotionDetected)
            .updateValue(1);
        } else {
          Logger.info('Started', this.accessory.displayName);
        }
      } else if (json.meters[0].power < this.accessory.context.config.startValue && this.accessory.context.started) {
        this.accessory.context.started = false;

        if (this.Telegram) this.Telegram.send('finished', this.accessory.displayName);

        const motionAccessory = this.accessories.find(
          (accessory) => accessory.displayName === this.accessory.displayName + ' Motion'
        );

        if (motionAccessory) {
          motionAccessory
            .getService(this.api.hap.Service.MotionSensor)
            .getCharacteristic(this.api.hap.Characteristic.MotionDetected)
            .updateValue(0);
        } else {
          Logger.info('Finished', this.accessory.displayName);
        }
      }
    });
  }

  async setState(state, callback) {
    // let cmd = state ? 'on' : 'off';
    //
    // try {
    //   if (this.client) {
    //     Logger.debug(
    //       'Send cmd (' + this.accessory.context.config.topics.statusSet + ') => ' + cmd,
    //       this.accessory.displayName
    //     );
    //
    //     await this.client.publish(this.accessory.context.config.topics.statusSet, cmd);
    //   } else {
    //     Logger.warn('Not connected to mqtt broker!', this.accessory.displayName);
    //
    //     setTimeout(() => {
    //       this.accessory
    //         .getService(this.api.hap.Service.Outlet)
    //         .getCharacteristic(this.api.hap.Characteristic.On)
    //         .updateValue(state ? false : true);
    //     }, 1000);
    //   }
    // } catch (err) {
    //   Logger.error('An error occured during setting state to ' + cmd, this.accessory.displayName);
    //   Logger.error(err);
    // }

    // Do nothing
    callback(null);
  }

  async changedState(value) {
    if (value.oldValue !== value.newValue) {
      Logger.debug(
        'Current consumption changed from ' + value.oldValue + 'W to ' + value.newValue + 'W',
        this.accessory.displayName
      );

      this.historyService.addEntry({ time: Math.round(new Date().valueOf() / 1000), power: value.newValue });
    }
  }

  refreshHistory(service) {
    let power = service.getCharacteristic(this.api.hap.Characteristic.CurrentConsumption).value;

    this.historyService.addEntry({
      time: Math.round(new Date().valueOf() / 1000),
      power: power,
    });

    setTimeout(() => {
      this.refreshHistory(service);
    }, 10 * 60 * 1000);
  }
}

module.exports = OutletAccessory;
