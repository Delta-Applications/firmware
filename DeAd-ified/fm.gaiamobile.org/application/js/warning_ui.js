/* exported WarningUI */
'use strict';

(function(exports) {

  var WarningUI = function() {};

  WarningUI.prototype.update = function() {
    var hiddenState = false;

    // If current device has no valid antenna,
    // antenna warning UI should be shown
    hiddenState = HeadphoneState.deviceWithValidAntenna;
    FMElementAntennaUnplugWarning.hidden = hiddenState;

    // If current airplane mode is enabled,
    // airplane mode warning UI should be shown
    hiddenState = !FMRadio.airplaneModeEnabled;
    FMElementAirplaneModeWarning.hidden = hiddenState;

    // If current airplane mode is enabled, or current device has no valid antenna,
    // fm container element should be hidden
    hiddenState = FMRadio.airplaneModeEnabled || !HeadphoneState.deviceWithValidAntenna;
    FMElementFMContainer.hidden = hiddenState;
    var status = hiddenState ? StatusManager.STATUS_WARNING_SHOWING : StatusManager.status;

    // Favorite list warning UI should be hidden always
    // shown only while favorites list is empty while showing favorite list
    FMElementFavoriteListWarning.hidden = true;
    if (status === StatusManager.STATUS_FAVORITE_SHOWING) {
      var favoritelist = FrequencyManager.getFavoriteFrequencyList();
      hiddenState = (favoritelist && favoritelist.length > 0)
        || (status !== StatusManager.STATUS_FAVORITE_SHOWING);
      FMElementFavoriteListWarning.hidden = hiddenState;
    }

    StatusManager.update(status);
  };

  exports.WarningUI = new WarningUI();
})(window);
