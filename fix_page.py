with open('app/luxury/fitting/page.tsx', 'r') as f:
    content = f.read()

content = content.replace('import PhotoFitting from "@/components/PhotoFitting";', 'import LuxuryLiveFitting from "@/components/LuxuryLiveFitting";')
content = content.replace('<PhotoFitting />', '<LuxuryLiveFitting />')

with open('app/luxury/fitting/page.tsx', 'w') as f:
    f.write(content)
