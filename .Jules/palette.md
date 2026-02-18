## 2024-05-22 - [Accessible File Input Pattern]
**Learning:** Using 'hidden' or 'display: none' on file inputs removes them from the accessibility tree, preventing keyboard users from uploading files.
**Action:** Use 'sr-only peer' on the input and 'peer-focus:ring-2' on the label. This keeps the input focusable while visually hiding it, and the label shows a focus ring when the input is active.
