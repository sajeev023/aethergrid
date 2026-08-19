import os
import shutil

src_dir = r"E:\New project\lfjc teachers"
dest_dir = r"E:\New project\public\images\faculty"

os.makedirs(dest_dir, exist_ok=True)

# Copy all JPG, JFIF, PNG files except screenshots
files = os.listdir(src_dir)
teacher_images = []
screenshots = []

for file in files:
    src_path = os.path.join(src_dir, file)
    if not os.path.isfile(src_path):
        continue
    
    # Identify screenshots
    is_screenshot = file.endswith('.png') and (file.replace('.png', '').isdigit() or file.startswith('Screenshot_'))
    
    if is_screenshot:
        screenshots.append(file)
    else:
        dest_path = os.path.join(dest_dir, file.lower())
        shutil.copy2(src_path, dest_path)
        teacher_images.append((file, file.lower()))

# Generate a gallery HTML
html_content = """<!DOCTYPE html>
<html>
<head>
    <title>Teacher Images Gallery</title>
    <style>
        body { font-family: sans-serif; background: #f0f0f0; margin: 20px; }
        .section-title { font-size: 24px; font-weight: bold; margin-top: 30px; border-bottom: 2px solid #333; padding-bottom: 5px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; margin-top: 15px; }
        .card { background: white; border: 1px solid #ccc; padding: 10px; border-radius: 8px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .card img { max-width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
        .card-name { font-weight: bold; margin-top: 10px; font-size: 14px; word-break: break-all; }
        .screenshot-grid { display: grid; grid-template-columns: 1fr; gap: 30px; margin-top: 20px; }
        .screenshot-card { background: white; border: 1px solid #ccc; padding: 20px; border-radius: 8px; }
        .screenshot-card img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
        .screenshot-title { font-weight: bold; font-size: 18px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <h1>LFJC Faculty Reference Gallery</h1>
    
    <div class="section-title">Teacher Photograph Files</div>
    <div class="grid">
"""

for orig, lower in sorted(teacher_images):
    html_content += f"""
        <div class="card">
            <img src="/images/faculty/{lower}" alt="{orig}">
            <div class="card-name">{orig}</div>
        </div>
    """

html_content += """
    </div>
    
    <div class="section-title">Screenshots (Source of Truth)</div>
    <div class="screenshot-grid">
"""

for ss in sorted(screenshots):
    # Use direct file path for screenshots in the HTML (since we will view the file locally)
    # The browser will resolve the relative path to lfjc teachers/ss because we will serve/open this page
    # Let's copy screenshots to public as well just in case we need them or reference them
    shutil.copy2(os.path.join(src_dir, ss), os.path.join(dest_dir, ss))
    html_content += f"""
        <div class="screenshot-card">
            <div class="screenshot-title">{ss}</div>
            <img src="/images/faculty/{ss}" alt="{ss}">
        </div>
    """

html_content += """
    </div>
</body>
</html>
"""

with open(r"E:\New project\gallery.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Copied {len(teacher_images)} teacher images and {len(screenshots)} screenshots. Generated gallery.html")
