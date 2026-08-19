import os
import shutil

app_dir = r"E:\New project\app"
lfjc_dir = os.path.join(app_dir, "lfjc")

# 1. Copy app/lfjc/page.tsx to app/page.tsx (overwriting the old home page)
src_home = os.path.join(lfjc_dir, "page.tsx")
dest_home = os.path.join(app_dir, "page.tsx")
if os.path.exists(src_home):
    shutil.copy2(src_home, dest_home)
    print("Overwrote app/page.tsx with app/lfjc/page.tsx")

# 2. Move subdirectories from app/lfjc/ to app/
subdirs = ["about", "academics", "admissions", "campus", "contact", "faculty", "gallery"]
for s in subdirs:
    src_path = os.path.join(lfjc_dir, s)
    dest_path = os.path.join(app_dir, s)
    if os.path.exists(src_path):
        if os.path.exists(dest_path):
            shutil.rmtree(dest_path)
        shutil.move(src_path, dest_path)
        print(f"Moved {src_path} to {dest_path}")

# 3. Delete app/lfs, app/lfdc, and app/lfjc
for d in ["lfs", "lfdc", "lfjc"]:
    path_to_delete = os.path.join(app_dir, d)
    if os.path.exists(path_to_delete):
        shutil.rmtree(path_to_delete)
        print(f"Deleted directory {path_to_delete}")

print("Reorganization of routes and pages completed.")
