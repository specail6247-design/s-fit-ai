# 🎨 Product Hunt Assets Checklist

## 🖼️ Images

### 1. Thumbnail (Animated GIF)
- **Status:** [ ] To Do
- **Specs:** 240x240px, <3MB, GIF format.
- **Content:**
    - Loop: User Photo -> Flash -> 3D Model Wearing Clothes -> Flash -> Loop.
    - Fast-paced, eye-catching.

### 2. Gallery Images (Minimum 3, Max 6)
- **Specs:** 1270x760px, JPG/PNG, <3MB each.

| Image # | Name | Description | Status |
|:---:|:---:|:---|:---:|
| 1 | **Hero Header** | Split screen: Left (Selfie) / Right (Perfect AI Fit). Text: "S_FIT AI: Hyper-Realistic Virtual Try-On". | [ ] |
| 2 | **The Fitting Room** | Screenshot of the main 3D interface showing the mannequin, clothing selection bar, and background controls. | [ ] |
| 3 | **AI Analysis** | Close-up of the "Fit Score" panel and MediaPipe landmark overlay. Text: "Smart Body Analysis". | [ ] |
| 4 | **Brand Collections** | Grid view of ZARA, COS, Massimo Dutti logos and product cards. Text: "Shop Real Brands". | [ ] |
| 5 | **Mobile View** | Mockup of the app running on an iPhone. Text: "Your Pocket Stylist". | [ ] |

---

## 🎥 Video

### Demo Video
- **Status:** [ ] To Do
- **Specs:** 1920x1080px (16:9), MP4, 60-90 seconds.
- **Tools:** Use `scripts/generate_demo.py` for raw footage, then edit.

**Script / Shot List:**

| Time | Action | Voiceover/Text Overlay |
|:---:|:---|:---|
| **0:00** | **Hook:** Fast montage of "Online Shopping Fails" (stock footage or text). | "Tired of guessing your size?" |
| **0:05** | **Intro:** Logo animation S_FIT AI. | "Meet S_FIT AI." |
| **0:10** | **Upload:** Screen recording of uploading a user photo. | "Upload your photo..." |
| **0:15** | **Transformation:** AI processing effect -> 3D Model appears. | "...and get your Digital Twin instantly." |
| **0:25** | **Try-On:** Clicking different items (ZARA Blazer, COS Dress). | "Try on real brands like ZARA and COS." |
| **0:40** | **Detail:** Zooming in, rotating 360 degrees. | "Hyper-realistic fabric simulation." |
| **0:50** | **Analysis:** Showing the Fit Score popup. | "AI-powered Fit Analysis." |
| **1:00** | **Outro:** Final look + Website URL. | "Shop with confidence. S_FIT AI." |

---

## 🛠️ Tools & Resources
- **Figma:** For creating the Gallery Images and Thumbnail.
- **CapCut / Premiere:** For editing the video.
- **Screen Studio / OBS:** For additional screen recording if needed.
- **Playwright Script:** `scripts/generate_demo.py` (Use this to get the clean 3D shots).
