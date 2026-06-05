import re

# Read the file
with open(r'c:\Users\dell\Desktop\HPT\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the testimonials section
pattern = r'      <section class="testimonials section" data-anim>.*?</section>\s*\n'
new_content = re.sub(pattern, '', content, flags=re.DOTALL)

# Write the file back
with open(r'c:\Users\dell\Desktop\HPT\index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Testimonials section removed successfully!")
