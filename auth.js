// auth.js

const ADMIN_PIN = "11302024";
const TL_PINS = {
  "LEE": "220685",
  "DARAZ": "805441",
  "ONEMEN": "472199",
  "XYZ": "133548",
  "JAVED": "592297",
  "AIMAN": "938106",
  "BERLIN": "390933",
  "SHARIF": "475183",
  "KING": "229126",
  "OSMAN": "563902",
  "KANAK": "516698",
  "MIR": "356813",
  "RC": "196835",
  "SABBIR": "423391",
  "JEWEL": "423561",
  "DEAN": "423461"
};

// -------------------------
// Admin Access
// -------------------------
window.requireAdmin = async function() {
  if (sessionStorage.getItem("isAdmin") === "true") return true;
  const entered = prompt("🔐 Enter Admin PIN:");
  if (entered === ADMIN_PIN) {
    sessionStorage.setItem("isAdmin", "true");
    return true;
  }
  throw new Error("Invalid Admin PIN");
};

// -------------------------
// Team Leader Access
// -------------------------
window.requireTeamLeader = async function(tlName) {
  const tl = tlName.toUpperCase();
  if (!TL_PINS[tl]) throw new Error("Team Leader not registered");

  // Check session
  if (sessionStorage.getItem("currentTL") === tl) return true;

  const entered = prompt(`🔐 Enter PIN for Team Leader: ${tl}`);
  if (entered === TL_PINS[tl]) {
    sessionStorage.setItem("currentTL", tl);
    return true;
  }
  throw new Error("Invalid TL PIN");
};

// Unified check
window.checkTLAccess = async function(tlName) {
  if (!tlName) throw new Error("Team Leader not specified");
  return await window.requireTeamLeader(tlName);
};
