//Everything here is copied from Arkenfox's user.js template
// https://github.com/arkenfox/user.js/
//I only included things I needed to change after following the recommended changes on Privacy Guides
// https://www.privacyguides.org/en/desktop-browsers/#firefox
//I didn't keep GUI changes because I find those annoying and I'm satisfied with this
//I also didn't keep any other changes that inconvenienced me
//Everything can be changed via about:config
//You can drop this file into your Firefox Profile Folder which you can easily find via about:support 

/* 0202: disable using the OS's geolocation service ***/
user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_gpsd", false); // [LINUX] [HIDDEN PREF]
user_pref("geo.provider.use_geoclue", false); // [FF102+] [LINUX]

/** TELEMETRY ***/
/* 0330: disable new data submission [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
 user_pref("datareporting.policy.dataSubmissionEnabled", false);
 /* 0331: disable Health Reports
  * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical... data ***/
 user_pref("datareporting.healthreport.uploadEnabled", false);
 /* 0332: disable telemetry
  * The "unified" pref affects the behavior of the "enabled" pref
  * - If "unified" is false then "enabled" controls the telemetry module
  * - If "unified" is true then "enabled" only controls whether to record extended data
  * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
  * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
  * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
 user_pref("toolkit.telemetry.unified", false);
 user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
 user_pref("toolkit.telemetry.server", "data:,");
 user_pref("toolkit.telemetry.archive.enabled", false);
 user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
 user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
 user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
 user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
 user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
 /* 0333: disable Telemetry Coverage
  * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
 user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
 user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
 user_pref("toolkit.coverage.endpoint.base", "");
 /* 0334: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
  * Defense-in-depth: currently covered by 0331 ***/
 user_pref("browser.ping-centre.telemetry", false);
 /* 0335: disable Firefox Home (Activity Stream) telemetry ***/
 user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
 user_pref("browser.newtabpage.activity-stream.telemetry", false);
 
 /** STUDIES ***/
 /* 0340: disable Studies
  * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies ***/
 user_pref("app.shield.optoutstudies.enabled", false);
 /* 0341: disable Normandy/Shield [FF60+]
  * Shield is a telemetry system that can push and test "recipes"
  * [1] https://mozilla.github.io/normandy/ ***/
 user_pref("app.normandy.enabled", false);
 user_pref("app.normandy.api_url", "");
 
 /** CRASH REPORTS ***/
 /* 0350: disable Crash Reports ***/
 user_pref("breakpad.reportURL", "");
 user_pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
    // user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+] [DEFAULT: false]
 /* 0351: enforce no submission of backlogged Crash Reports [FF58+]
  * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports  ***/
 user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]
 
 /** OTHER ***/
 /* 0360: disable Captive Portal detection
  * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
 user_pref("captivedetect.canonicalURL", "");
 user_pref("network.captive-portal-service.enabled", false); // [FF52+]
 /* 0361: disable Network Connectivity checks [FF65+]
  * [1] https://bugzilla.mozilla.org/1460537 ***/
 user_pref("network.connectivity-service.enabled", false);

 /* 0801: disable location bar making speculative connections [FF56+]
 * [1] https://bugzilla.mozilla.org/1348275 ***/
user_pref("browser.urlbar.speculativeConnect.enabled", false);

/* 1001: disable disk cache
 * [SETUP-CHROME] If you think disk cache helps perf, then feel free to override this
 * [NOTE] We also clear cache on exit (2811) ***/
user_pref("browser.cache.disk.enable", false);
/* 1002: disable media cache from writing to disk in Private Browsing
 * [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB ***/
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true); // [FF75+]
user_pref("media.memory_cache_max_size", 65536);

/** SSL (Secure Sockets Layer) / TLS (Transport Layer Security) ***/
/* 1201: require safe negotiation
 * Blocks connections to servers that don't support RFC 5746 [2] as they're potentially vulnerable to a
 * MiTM attack [3]. A server without RFC 5746 can be safe from the attack if it disables renegotiations
 * but the problem is that the browser can't know that. Setting this pref to true is the only way for the
 * browser to ensure there will be no unsafe renegotiations on the channel between the browser and the server
 * [SETUP-WEB] SSL_ERROR_UNSAFE_NEGOTIATION: is it worth overriding this for that one site?
 * [STATS] SSL Labs (Nov 2023) reports over 99.5% of top sites have secure renegotiation [4]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://datatracker.ietf.org/doc/html/rfc5746
 * [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
 * [4] https://www.ssllabs.com/ssl-pulse/ ***/
 user_pref("security.ssl.require_safe_negotiation", true);
 /* 1206: disable TLS1.3 0-RTT (round-trip time) [FF51+]
  * This data is not forward secret, as it is encrypted solely under keys derived using
  * the offered PSK. There are no guarantees of non-replay between connections
  * [1] https://github.com/tlswg/tls13-spec/issues/1001
  * [2] https://www.rfc-editor.org/rfc/rfc9001.html#name-replay-attacks-with-0-rtt
  * [3] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
 user_pref("security.tls.enable_0rtt_data", false);

 /** OCSP (Online Certificate Status Protocol)
   [1] https://scotthelme.co.uk/revocation-is-broken/
   [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
***/
/* 1211: enforce OCSP fetching to confirm current validity of certificates
 * 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
 * OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
 * It's a trade-off between security (checking) and privacy (leaking info to the CA)
 * [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
 * [SETTING] Privacy & Security>Security>Certificates>Query OCSP responder servers...
 * [1] https://en.wikipedia.org/wiki/Ocsp ***/
user_pref("security.OCSP.enabled", 1); // [DEFAULT: 1]
/* 1212: set OCSP fetch failures (non-stapled, see 1211) to hard-fail
 * [SETUP-WEB] SEC_ERROR_OCSP_SERVER_ERROR
 * When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
 * Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
 * It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
 * could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
 * [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
 * [2] https://www.imperialviolet.org/2014/04/19/revchecking.html ***/
user_pref("security.OCSP.require", true);

/** CERTS / HPKP (HTTP Public Key Pinning) ***/
/* 1223: enable strict PKP (Public Key Pinning)
 * 0=disabled, 1=allow user MiTM (default; such as your antivirus), 2=strict
 * [SETUP-WEB] MOZILLA_PKIX_ERROR_KEY_PINNING_FAILURE ***/
user_pref("security.cert_pinning.enforcement_level", 2);
/* 1224: enable CRLite [FF73+]
 * 0 = disabled
 * 1 = consult CRLite but only collect telemetry
 * 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results
 * 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" (default)
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985,1753071
 * [2] https://blog.mozilla.org/security/tag/crlite/ ***/
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);

/* 1246: disable HTTP background requests [FF82+]
 * When attempting to upgrade, if the server doesn't respond within 3 seconds, Firefox sends
 * a top-level HTTP request without path in order to check if the server supports HTTPS or not
 * This is done to avoid waiting for a timeout which takes 90 seconds
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945 ***/
 user_pref("dom.security.https_only_mode_send_http_background_request", false);