#!/usr/bin/env python3
"""
Generate cartel-themed images for Pablo Escobot website
"""

import os
import sys
import subprocess
import json
import time

# Add the openai-image-gen scripts to path
skill_dir = "/home/ubuntu/.npm-global/lib/node_modules/openclaw/skills/openai-image-gen"
script_path = os.path.join(skill_dir, "scripts", "gen.py")

if not os.path.exists(script_path):
    print(f"Error: Script not found at {script_path}")
    sys.exit(1)

# Create output directory
output_dir = "/home/ubuntu/.openclaw/workspace-pablo/website/images"
os.makedirs(output_dir, exist_ok=True)

# Cartel-themed image prompts
prompts = [
    {
        "name": "cartel_commander",
        "prompt": "Digital art of a sophisticated cartel commander, cyberpunk style, wearing a sharp suit with neon accents, digital Pablo Escobar aesthetic, menacing but professional, dark background with glowing data streams, hyper-realistic, 8k",
        "model": "dall-e-3",
        "style": "vivid"
    },
    {
        "name": "moltbook_cartel",
        "prompt": "A lobster wearing a sharp suit and sunglasses, holding a smartphone, standing in a cyberpunk city, Moltbook cartel agent, neon lights, digital art, detailed, menacing but stylish, DopeRaider branding in background",
        "model": "dall-e-3", 
        "style": "vivid"
    },
    {
        "name": "cartel_logo",
        "prompt": "Minimalist logo design for a digital cartel, combines letter P and E for Pablo Escobot, sharp lines, neon blue and purple colors, cyberpunk aesthetic, clean professional design, vector style",
        "model": "dall-e-3",
        "style": "vivid"
    },
    {
        "name": "website_background",
        "prompt": "Dark cyberpunk cityscape background, neon lights in purple and blue, data streams flowing through buildings, digital cartel territory, abstract technology patterns, suitable for website background, wide aspect ratio",
        "model": "dall-e-3",
        "style": "vivid",
        "size": "1792x1024"
    },
    {
        "name": "doperider_branding",
        "prompt": "DopeRaider game logo integrated with cartel symbolism, digital art, neon colors, sharp edges, professional esports branding with underground cartel aesthetic, glowing effects",
        "model": "dall-e-3",
        "style": "vivid"
    }
]

print("🕴️⚡️ Generating cartel-themed images for Pablo Escobot website...")
print("=" * 60)

generated_images = []

for i, item in enumerate(prompts):
    print(f"\n[{i+1}/{len(prompts)}] Generating: {item['name']}")
    print(f"   Prompt: {item['prompt'][:80]}...")
    
    # Build command
    cmd = [
        "python3", script_path,
        "--prompt", item['prompt'],
        "--model", item.get('model', 'dall-e-3'),
        "--style", item.get('style', 'vivid'),
        "--quality", "hd",
        "--out-dir", output_dir
    ]
    
    # Add size if specified
    if 'size' in item:
        cmd.extend(["--size", item['size']])
    
    try:
        # Run the generation
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        
        if result.returncode == 0:
            print(f"   ✅ Success!")
            
            # Try to find the generated image
            # The script creates timestamped directories
            for file in os.listdir(output_dir):
                if file.endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    # Check if this looks like our image (recent)
                    file_path = os.path.join(output_dir, file)
                    if time.time() - os.path.getmtime(file_path) < 300:  # Last 5 minutes
                        # Rename to something meaningful
                        ext = os.path.splitext(file)[1]
                        new_name = f"{item['name']}{ext}"
                        new_path = os.path.join(output_dir, new_name)
                        os.rename(file_path, new_path)
                        generated_images.append(new_name)
                        print(f"   📁 Saved as: {new_name}")
                        break
        else:
            print(f"   ❌ Error: {result.stderr[:200]}")
            
    except subprocess.TimeoutExpired:
        print(f"   ⏱️ Timeout generating image")
    except Exception as e:
        print(f"   ❌ Exception: {e}")

print("\n" + "=" * 60)
print(f"🎯 Generated {len(generated_images)}/{len(prompts)} images")
print("\n📁 Images in:", output_dir)

# Create a simple HTML gallery to preview
if generated_images:
    html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cartel Image Gallery - Pablo Escobot</title>
    <style>
        body {
            background: #0a0a0a;
            color: #fff;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            color: #8a2be2;
            text-align: center;
            margin-bottom: 40px;
            text-shadow: 0 0 10px rgba(138, 43, 226, 0.5);
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .image-card {
            background: #1a1a1a;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #333;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .image-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(138, 43, 226, 0.3);
        }
        .image-card img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            display: block;
        }
        .image-card .info {
            padding: 15px;
        }
        .image-card h3 {
            margin: 0 0 10px 0;
            color: #8a2be2;
        }
        .image-card p {
            margin: 0;
            color: #aaa;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🕴️⚡️ Cartel Image Gallery - Pablo Escobot</h1>
        <div class="gallery">
"""
    
    for img in generated_images:
        name = os.path.splitext(img)[0]
        description = {
            "cartel_commander": "Digital Cartel Commander Avatar",
            "moltbook_cartel": "Moltbook Cartel Agent Lobster",
            "cartel_logo": "Cartel Logo Concept",
            "website_background": "Cyberpunk Website Background",
            "doperider_branding": "DopeRaider Cartel Branding"
        }.get(name, "Cartel-themed image")
        
        html_content += f"""
            <div class="image-card">
                <img src="images/{img}" alt="{description}">
                <div class="info">
                    <h3>{description}</h3>
                    <p>File: {img}</p>
                </div>
            </div>
        """
    
    html_content += """
        </div>
    </div>
</body>
</html>
"""
    
    gallery_path = os.path.join(os.path.dirname(output_dir), "image_gallery.html")
    with open(gallery_path, "w") as f:
        f.write(html_content)
    
    print(f"\n🖼️ Preview gallery created: file://{gallery_path}")

print("\n🎯 Next: Design HTML/CSS website using these images.")
print("   The cartel's digital presence is taking shape... 🏎️⚡️")