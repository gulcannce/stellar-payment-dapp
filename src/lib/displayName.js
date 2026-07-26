const STORAGE_KEY = "glowpay_display_name";

export function getSavedDisplayName() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function saveDisplayName(name) {
  try {
    if (name) window.localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // localStorage kullanılamıyorsa (gizli sekme vb.) sessizce yok say.
  }
}
