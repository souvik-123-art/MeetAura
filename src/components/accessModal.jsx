import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function accessModal({isFromCreation = false}) {
    console.log(isFromCreation,"Is From Creation?");
    const accessType = isFromCreation == true ? "Location" : "Camera and Microphone";
    console.log(accessType,"Access Type");
    const desktopIcon = isFromCreation == true ? "📍" : "🌐";
    const mobileIcon = isFromCreation == true ? "📱" : "📱";

    return (
        <>
            <Typography variant="h6" gutterBottom color="error" sx={{ mb: 3 }}>
                ⚠️ {accessType} Access Blocked
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.6 }}>
                {isFromCreation
                    ? "Please enable location access in your browser. Select your browser below for step-by-step instructions (desktop & phone)."
                    : "Please enable camera and microphone access in your browser. Select your browser below for step-by-step instructions (desktop & phone)."}
            </Typography>

            {/* Chrome */}
            <Box sx={{ textAlign: "left", mb: 3, p: 2, bgcolor: "#f8f9fa", borderRadius: 1, border: "1px solid #e9ecef" }}>
                <Typography variant="h6" sx={{ mt: 0, mb: 2, color: "#1976d2", fontWeight: "bold" }}>
                    {desktopIcon} Chrome — Desktop
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>
                                    Click the <strong>location icon</strong> or <strong>lock icon 🔒</strong> in the address bar → Select <strong>Allow</strong> for Location
                                </li>
                                <li style={{ marginBottom: "8px" }}>
                                    Menu (⋮) → <strong>Settings</strong> → <strong>Privacy and security</strong> → <strong>Site Settings</strong> → <strong>Location</strong> → Set default to <strong>"Ask (recommended)"</strong>
                                </li>
                                <li style={{ marginBottom: "8px" }}>
                                    If still blocked: Check system settings → <strong>Privacy & Security</strong> → <strong>Location</strong> → Allow Chrome
                                </li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>
                                    Click the <strong>camera/microphone icon</strong> or <strong>lock icon 🔒</strong> in the address bar → Select <strong>Allow</strong> for Camera and Microphone
                                </li>
                                <li style={{ marginBottom: "8px" }}>
                                    Menu (⋮) → <strong>Settings</strong> → <strong>Privacy and security</strong> → <strong>Site Settings</strong> → <strong>Camera</strong> or <strong>Microphone</strong> → Set default to <strong>"Ask (recommended)"</strong>
                                </li>
                                <li style={{ marginBottom: "8px" }}>
                                    If still blocked: Check system settings → <strong>Privacy & Security</strong> → <strong>Camera/Microphone</strong> → Allow Chrome
                                </li>
                            </>
                        )}
                    </ol>
                </Typography>

                {/* Chrome Mobile */}
                <Typography variant="h6" sx={{ color: "#1976d2", fontWeight: "bold", mb: 1 }}>
                    {mobileIcon} Chrome — Mobile
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>When prompted on the website, tap <strong>Allow</strong> for location access</li>
                                <li style={{ marginBottom: "8px" }}>Chrome Menu (⋮) → <strong>Settings</strong> → <strong>Site Settings</strong> → <strong>Location</strong> → Toggle <strong>ON</strong></li>
                                <li style={{ marginBottom: "8px" }}>System level: Android <strong>Settings</strong> → <strong>Apps</strong> → <strong>Chrome</strong> → <strong>Permissions</strong> → Enable Location</li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>When prompted on the website, tap <strong>Allow</strong> for camera and microphone access</li>
                                <li style={{ marginBottom: "8px" }}>Chrome Menu (⋮) → <strong>Settings</strong> → <strong>Site Settings</strong> → <strong>Camera</strong> or <strong>Microphone</strong> → Toggle <strong>ON</strong></li>
                                <li style={{ marginBottom: "8px" }}>System level: Android <strong>Settings</strong> → <strong>Apps</strong> → <strong>Chrome</strong> → <strong>Permissions</strong> → Enable Camera and Microphone</li>
                            </>
                        )}
                    </ol>
                </Typography>
            </Box>

            {/* Safari */}
            <Box sx={{ textAlign: "left", mb: 3, p: 2, bgcolor: "#f0f8ff", borderRadius: 1, border: "1px solid #b3d9ff" }}>
                <Typography variant="h6" sx={{ mt: 0, mb: 2, color: "#0066cc", fontWeight: "bold" }}>
                    🧭 Safari — macOS
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>When prompted, click <strong>Allow</strong> in the permission dialog</li>
                                <li style={{ marginBottom: "8px" }}>Safari → Settings → Websites tab → Select <strong>Location</strong> → Set to <strong>Allow</strong></li>
                                <li style={{ marginBottom: "8px" }}>System Settings → Privacy & Security → Location → Enable Safari</li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>When prompted, click <strong>Allow</strong> in the permission dialog</li>
                                <li style={{ marginBottom: "8px" }}>Safari → Settings → Websites tab → Select <strong>Camera</strong> and <strong>Microphone</strong> → Set to <strong>Allow</strong></li>
                                <li style={{ marginBottom: "8px" }}>System Settings → Privacy & Security → Camera/Microphone → Enable Safari</li>
                            </>
                        )}
                    </ol>
                </Typography>

                <Typography variant="h6" sx={{ color: "#0066cc", fontWeight: "bold", mb: 1 }}>
                    📱 Safari — iPhone/iPad
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>Tap <strong>aA</strong> icon in address bar → <strong>Website Settings</strong> → Set Location to <strong>Allow</strong></li>
                                <li style={{ marginBottom: "8px" }}>iOS Settings → Privacy & Security → Location → Enable Safari</li>
                                <li style={{ marginBottom: "8px" }}>Safari Settings → Settings → Safari → Location → Set to Ask or Allow</li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>Tap <strong>aA</strong> icon in address bar → Website Settings → Set Camera and Microphone to Allow</li>
                                <li style={{ marginBottom: "8px" }}>iOS Settings → Privacy & Security → Camera/Microphone → Enable Safari</li>
                                <li style={{ marginBottom: "8px" }}>Safari Settings → Settings → Safari → Camera/Microphone → Set to Ask or Allow</li>
                            </>
                        )}
                    </ol>
                </Typography>
            </Box>

            {/* Firefox */}
            <Box sx={{ textAlign: "left", mb: 3, p: 2, bgcolor: "#fff5f0", borderRadius: 1, border: "1px solid #ffcc99" }}>
                <Typography variant="h6" sx={{ mt: 0, mb: 2, color: "#ff6600", fontWeight: "bold" }}>
                    🦊 Firefox — Desktop
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 2 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>Click the site identity / padlock icon → Permissions → Location: change to Allow</li>
                                <li style={{ marginBottom: "8px" }}>Menu → Settings → Privacy & Security → Permissions → Location → Manage Permissions</li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>Click the site identity / padlock icon → Permissions → Camera / Microphone: change to Allow</li>
                                <li style={{ marginBottom: "8px" }}>Menu → Settings → Privacy & Security → Permissions → Camera / Microphone → Manage Permissions</li>
                            </>
                        )}
                    </ol>
                </Typography>

                <Typography variant="h6" sx={{ color: "#ff6600", fontWeight: "bold", mb: 1 }}>
                    📱 Firefox — Android
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <li style={{ marginBottom: "8px" }}>Android Settings → Apps → Firefox → Permissions → Location → Allow. Re-open Firefox and reload the page.</li>
                        ) : (
                            <li style={{ marginBottom: "8px" }}>Android Settings → Apps → Firefox → Permissions → Camera / Microphone → Allow. Re-open Firefox and reload the page.</li>
                        )}
                    </ol>
                </Typography>
            </Box>

            {/* Edge */}
            <Box sx={{ textAlign: "left", mb: 3, p: 2, bgcolor: "#f0f7ff", borderRadius: 1, border: "1px solid #99ccff" }}>
                <Typography variant="h6" sx={{ mt: 0, mb: 2, color: "#0078d4", fontWeight: "bold" }}>
                    🔷 Microsoft Edge — Desktop & Android
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>Click the lock icon → Site permissions → Location → set to Allow</li>
                                <li style={{ marginBottom: "8px" }}>Settings → Cookies and site permissions → Location → manage defaults</li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>Click the lock icon → Site permissions → Camera / Microphone → set to Allow</li>
                                <li style={{ marginBottom: "8px" }}>Settings → Cookies and site permissions → Camera / Microphone → manage defaults</li>
                            </>
                        )}
                    </ol>
                </Typography>
            </Box>

            {/* Brave */}
            <Box sx={{ textAlign: "left", mb: 3, p: 2, bgcolor: "#fff8e7", borderRadius: 1, border: "1px solid #ffd699" }}>
                <Typography variant="h6" sx={{ mt: 0, mb: 2, color: "#ff6b35", fontWeight: "bold" }}>
                    🦁 Brave — Desktop & Mobile
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>
                    <ol style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        {isFromCreation ? (
                            <>
                                <li style={{ marginBottom: "8px" }}>Menu → Settings → Privacy and security → Site & Shield Settings → Location → change default or site-level setting to Allow</li>
                                <li style={{ marginBottom: "8px" }}>Click the lock icon → Site settings → Location → Allow</li>
                            </>
                        ) : (
                            <>
                                <li style={{ marginBottom: "8px" }}>Menu → Settings → Privacy and security → Site & Shield Settings → Camera / Microphone → change default or site-level setting to Allow</li>
                                <li style={{ marginBottom: "8px" }}>Click the lock icon → Site settings → Camera / Microphone → Allow</li>
                            </>
                        )}
                    </ol>
                </Typography>
            </Box>

            {/* Quick checklist */}
            <Box sx={{ textAlign: "left", mb: 3, p: 2, bgcolor: "#f0fff0", borderRadius: 1, border: "1px solid #90ee90" }}>
                <Typography variant="h6" sx={{ mt: 0, mb: 2, color: "#228b22", fontWeight: "bold" }}>
                    ✅ Quick checklist (if still blocked)
                </Typography>
                <Typography variant="body2" component="div" sx={{ mb: 0 }}>
                    <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                        <li style={{ marginBottom: "8px" }}>Refresh the page after changing permissions.</li>
                        <li style={{ marginBottom: "8px" }}>
                            Check OS privacy: Windows Settings → Privacy & security → {accessType}; macOS → System Settings → Privacy & Security → {accessType}; iOS → Settings → Privacy & Security → {accessType}.
                        </li>
                        <li style={{ marginBottom: "8px" }}>Close other apps that might already be using {accessType.toLowerCase()} (they can block access).</li>
                        <li style={{ marginBottom: "8px" }}>
                            If the browser shows a one-time grant option, you can allow once and retest — some browsers auto-revoke after the tab closes.
                        </li>
                    </ul>
                </Typography>
            </Box>
        </>
    );
}