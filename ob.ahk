; Variables to track Ctrl+C and Ctrl+V states
global isRunning := false
global isCtrlCPressed := false
global isCtrlVPressed := false

; Handle Ctrl+C press
^c::
    isCtrlCPressed := true
    CheckState()
    return

; Handle Ctrl+V press
^v::
    isCtrlVPressed := true
    CheckState()
    return

; Start or stop the script based on Ctrl+C and Ctrl+V states
CheckState() {
    if (isCtrlCPressed && !isCtrlVPressed && !isRunning) {
        isRunning := true
        isCtrlCPressed := false
        SetTimer, HoldLButton, -1
    }
    else if (isCtrlVPressed && !isCtrlCPressed && isRunning) {
        isRunning := false
        isCtrlVPressed := false
        SetTimer, HoldLButton, off
    }
}

; Function to hold the left mouse button
HoldLButton() {
    Loop {
        Click down
        Sleep 900000 ; 15 minutes in milliseconds (900,000 ms)
        Click up
        Send, t ; Press the 'T' key
        Sleep 100 ; Wait for 100 milliseconds
        SendInput, /repair all ; Type '/repair all/'
        Sleep 100 ; Wait for 100 milliseconds
        Send, {Enter} ; Press the Enter key
        Sleep 1000 ; Wait for 1 second before repeating the script
    }
}

