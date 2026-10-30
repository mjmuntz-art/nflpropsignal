# iPhone push notifications — staging setup

This branch prepares **NFL PropSignal** for OneSignal Web Push without changing the data-generation logic.
**No notifications are sent until OneSignal is configured and the Apps Script trigger is wired.**

## Current app and tags
- Repo: `mjmuntz-art/nflpropsignal`
- App key: `nfl_prop`
- OneSignal web origin: `https://mjmuntz-art.github.io` (shared by all four apps).
- Worker path: `/nflpropsignal/OneSignalSDKWorker.js`
- Worker scope: `/nflpropsignal/`
- Landing URL for messages: `https://mjmuntz-art.github.io/nflpropsignal/`

## OneSignal steps
1. Create a OneSignal **Web** app, integration **Custom Code**. Use the origin `https://mjmuntz-art.github.io`. With four apps on the same origin, plan to **use one OneSignal App ID** for all four, testing behavior on each installed Home Screen app before enabling automated sends.
2. The public **App ID** `4174a3fe-47af-44be-a68f-257caad1e247` and Safari Web ID are already entered in `push-config.js`. Never put the REST API key in GitHub.
3. Before merging, check whether OneSignal supports four independent iOS Home Screen subscriptions with separate service-worker scopes on this shared origin. Then merge and publish this branch after review. Open the app **from its iPhone Home Screen icon**, tap **Alerts**, tap **Enable notifications**, and approve the native iOS prompt.
4. Test one manually targeted push message. Configure automatic backend triggers only after that succeeds.

## Tag filters used by the Apps Script sender
To notify only users who explicitly enabled this app and event type, send through the OneSignal REST API with an AND filter:
- `push_nfl_prop_enabled=1`
- `push_nfl_prop_projections=1`, `push_nfl_prop_results=1`, or `push_nfl_prop_locked=1`

Avoid calling OneSignal `optOut()` when disabling one app, as all four apps are on the same origin. The UI instead disables that app using a tag.

## Recommended publication triggers
After a successful weekly projection build or freeze, notify for changed official selections or newly graded outcomes. The existing snapshot fingerprint is a useful reference, but should be separated by event type.

## Server security and deduplication
Place `ONESIGNAL_APP_ID` (public ID) and **ONESIGNAL_REST_API_KEY** (secret) in the Google Apps Script **Script Properties**. Only Apps Script sends messages to the OneSignal API.

For each event, compute a **stable fingerprint of published event data** (date + event type + relevant picks/results). Compare it to the previous sent fingerprint stored in Script Properties; send only if changed; store the new value **after** successful API response. Use `LockService` around the compare/send/store step to prevent overlapping triggers from duplicating alerts.

Example OneSignal send payload (from Apps Script's `UrlFetchApp.fetch`):
```javascript
const payload = {
  app_id: PropertiesService.getScriptProperties().getProperty('ONESIGNAL_APP_ID'),
  target_channel: 'push',
  headings: { en: 'Updated: NFL PropSignal' },
  contents: { en: 'New published data is available.' },
  url: 'https://mjmuntz-art.github.io/nflpropsignal/',
  filters: [
    { field: 'tag', key: 'push_nfl_prop_enabled', relation: '=', value: '1' },
    { operator: 'AND' },
    { field: 'tag', key: 'push_nfl_prop_projections', relation: '=', value: '1' }
  ]
};
const response = UrlFetchApp.fetch('https://api.onesignal.com/notifications', {
  method: 'post',
  headers: { Authorization: 'Key ' + PropertiesService.getScriptProperties().getProperty('ONESIGNAL_REST_API_KEY') },
  contentType: 'application/json',
  payload: JSON.stringify(payload),
  muteHttpExceptions: true
});
if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) {
  throw new Error('Push API error: ' + response.getContentText());
}
```

**Important:** This example is a send operation, not an installed trigger. It should be called only after validating publication success and deduplicating. Never run it directly from the browser. Different OneSignal web subscriptions across four installed Home Screen apps on one GitHub Pages origin must be tested for routing and isolation before production deployment.
