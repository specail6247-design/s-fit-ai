import imageio.v3 as iio
import os
import time
from playwright.sync_api import sync_playwright

def generate_demo_gif():
    output_path = "scripts/scrapers/demo_rotation.gif"

    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch()
        # Set viewport to a good size for GIF
        page = browser.new_page(viewport={"width": 800, "height": 600})

        try:
            print("Navigating to http://localhost:3000...")
            # Try to connect to localhost
            page.goto("http://localhost:3000", timeout=15000)

            print("Waiting for 3D scene...")
            # Wait for canvas to be present
            page.wait_for_selector("canvas", timeout=20000)

            # Wait extra time for the 3D model/texture to load fully
            time.sleep(5)

            frames = []

            # Coordinates for drag interaction
            center_x = 400
            center_y = 300

            # Simulate interaction: Click and Drag to rotate
            print("Starting rotation capture...")
            page.mouse.move(center_x, center_y)
            page.mouse.down()

            # Rotate 360 degrees (approx)
            # Adjust steps and delta based on OrbitControls sensitivity
            steps = 60
            delta_x = 5

            for i in range(steps):
                # Move mouse horizontally
                page.mouse.move(center_x + (i * delta_x), center_y)

                # Capture frame
                screenshot_bytes = page.screenshot()
                frames.append(iio.imread(screenshot_bytes))

                # Small delay to allow render update
                time.sleep(0.05)

            page.mouse.up()

            print(f"captured {len(frames)} frames. Saving GIF...")

            # Save frames as GIF
            # loop=0 means infinite loop
            iio.imwrite(output_path, frames, duration=100, loop=0)
            print(f"SUCCESS: Demo GIF saved to {output_path}")

        except Exception as e:
            print(f"Error generating demo: {e}")
            print("NOTE: Ensure the Next.js app is running ('npm run dev') on http://localhost:3000 before running this script.")
            # Create a placeholder file if it failed, just so the file exists for the user to see location
            if not os.path.exists(output_path):
                 with open("scripts/scrapers/README_DEMO.txt", "w") as f:
                     f.write("Run 'python3 scripts/generate_demo.py' while the app is running to generate the GIF.")
        finally:
            browser.close()

if __name__ == "__main__":
    generate_demo_gif()
