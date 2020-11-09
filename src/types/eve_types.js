'use strict';

const inherits = require('util').inherits;

module.exports = {
  registerWith: function (hap) {
    const Characteristic = hap.Characteristic;
    const Service = hap.Service;

    /// /////////////////////////////////////////////////////////////////////////
    // ResetTotal
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.ResetTotal = function() {
      Characteristic.call(this, 'Reset Total', 'E863F112-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.UINT32,
        unit: Characteristic.Units.SECONDS,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.ResetTotal, Characteristic);
    Characteristic.ResetTotal.UUID = 'E863F112-079E-48FF-8F27-9C2605A29F52';

    /// /////////////////////////////////////////////////////////////////////////
    // HistoryStatus
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.HistoryStatus = function() {
      Characteristic.call(this, 'History Status', 'E863F116-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.DATA,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.HistoryStatus, Characteristic);
    Characteristic.HistoryStatus.UUID = 'E863F116-079E-48FF-8F27-9C2605A29F52';

    /// /////////////////////////////////////////////////////////////////////////
    // HistoryEntries
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.HistoryEntries = function() {
      Characteristic.call(this, 'History Entries', 'E863F117-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.DATA,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.HistoryEntries, Characteristic);
    Characteristic.HistoryEntries.UUID = 'E863F117-079E-48FF-8F27-9C2605A29F52';

    /// /////////////////////////////////////////////////////////////////////////
    // HistoryRequest
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.HistoryRequest = function() {
      Characteristic.call(this, 'History Request', 'E863F11C-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.DATA,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.HistoryRequest, Characteristic);
    Characteristic.HistoryRequest.UUID = 'E863F11C-079E-48FF-8F27-9C2605A29F52';

    /// /////////////////////////////////////////////////////////////////////////
    // SetTime
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.SetTime = function() {
      Characteristic.call(this, 'Set Time', 'E863F121-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.DATA,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY, Characteristic.Perms.WRITE]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.SetTime, Characteristic);
    Characteristic.SetTime.UUID = 'E863F121-079E-48FF-8F27-9C2605A29F52';
    
    /// /////////////////////////////////////////////////////////////////////////
    // LastActivation
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.LastActivation = function() {
      Characteristic.call(this, 'Last Activation', 'E863F11A-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.UINT32,
        unit: Characteristic.Units.SECONDS,
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.LastActivation, Characteristic);
    Characteristic.LastActivation.UUID = 'E863F11A-079E-48FF-8F27-9C2605A29F52';
    
    /// /////////////////////////////////////////////////////////////////////////
    // CurrentConsumption
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.CurrentConsumption = function() {
      Characteristic.call(this, 'Current Consumption', 'E863F10D-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.FLOAT,
        unit: 'W',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.CurrentConsumption, Characteristic);
    Characteristic.CurrentConsumption.UUID = 'E863F10D-079E-48FF-8F27-9C2605A29F52';
    
    /// /////////////////////////////////////////////////////////////////////////
    // TotalConsumption
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.TotalConsumption = function() {
      Characteristic.call(this, 'Total Consumption', 'E863F10C-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.FLOAT,
        unit: 'kWh',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.TotalConsumption, Characteristic);
    Characteristic.TotalConsumption.UUID = 'E863F10C-079E-48FF-8F27-9C2605A29F52';
    
    /// /////////////////////////////////////////////////////////////////////////
    // Volts
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.Volts = function() {
      Characteristic.call(this, 'Volts', 'E863F10A-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.FLOAT,
        unit: 'V',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.Volts, Characteristic);
    Characteristic.Volts.UUID = 'E863F10A-079E-48FF-8F27-9C2605A29F52';
    
    /// /////////////////////////////////////////////////////////////////////////
    // Amperes
    /// ///////////////////////////////////////////////////////////////////////// 
    Characteristic.Amperes = function() {
      Characteristic.call(this, 'Amperes', 'E863F126-079E-48FF-8F27-9C2605A29F52');
      this.setProps({
        format: Characteristic.Formats.FLOAT,
        unit: 'A',
        perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
      });
      this.value = this.getDefaultValue();
    };
    inherits(Characteristic.Amperes, Characteristic);
    Characteristic.Amperes.UUID = 'E863F126-079E-48FF-8F27-9C2605A29F52';

    /// /////////////////////////////////////////////////////////////////////////
    // Outlet
    /// ///////////////////////////////////////////////////////////////////////// 
    Service.Outlet = function(displayName, subtype) {
      Service.call(this, displayName, '00000047-0000-1000-8000-0026BB765291', subtype);
      
      // Required Characteristics
      this.addCharacteristic(Characteristic.On);
      this.addCharacteristic(Characteristic.OutletInUse);

      // Optional Characteristics EVE
      this.addOptionalCharacteristic(Characteristic.CurrentConsumption);
      this.addOptionalCharacteristic(Characteristic.TotalConsumption);
      this.addOptionalCharacteristic(Characteristic.Volts);
      this.addOptionalCharacteristic(Characteristic.Amperes);

      // Optional Characteristics
      this.addOptionalCharacteristic(Characteristic.Name);
    
    };
    inherits(Service.Outlet, Service);
    Service.Outlet.UUID = '00000047-0000-1000-8000-0026BB765291';
    
    /// /////////////////////////////////////////////////////////////////////////
    // MotionSensor
    /// ///////////////////////////////////////////////////////////////////////// 
    Service.MotionSensor = function(displayName, subtype) {
      Service.call(this, displayName, '00000085-0000-1000-8000-0026BB765291', subtype);
      // Required Characteristics
      this.addCharacteristic(Characteristic.MotionDetected);

      // Optional Characteristics EVE
      this.addOptionalCharacteristic(Characteristic.LastActivation);

      // Optional Characteristics
      this.addOptionalCharacteristic(Characteristic.StatusActive);
      this.addOptionalCharacteristic(Characteristic.StatusFault);
      this.addOptionalCharacteristic(Characteristic.StatusTampered);
      this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
      this.addOptionalCharacteristic(Characteristic.Name);
    };
    inherits(Service.MotionSensor, Service);
    Service.MotionSensor.UUID = '00000085-0000-1000-8000-0026BB765291';

  }
};