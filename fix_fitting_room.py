import os

def replace_in_file(filepath, search, replace):
    try:
        with open(filepath, 'r') as f:
            content = f.read()

        if search not in content:
            print(f"Warning: '{search}' not found in {filepath}")
            return

        new_content = content.replace(search, replace)
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    except FileNotFoundError:
        print(f"Error: {filepath} not found")

# We want to add the button in the top left, where the Share/AI Try-On buttons are.
# Current code:
# <div className="absolute top-4 left-4 flex gap-2 z-20">
#     <button onClick={() => setShowShareModal(true)} ...>
#         <span>📤</span>
#     </button>
#     ...
# </div>

search_code = """        <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button onClick={() => setShowShareModal(true)} className="bg-charcoal/60 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-charcoal/80 transition-colors">
                <span>📤</span>
            </button>"""

replace_code = """        <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button onClick={() => useStore.getState().setSelectedBrand(null)} className="bg-charcoal/60 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-charcoal/80 transition-colors flex items-center gap-2 px-3">
                <span className="text-xs font-bold">← Back to brands</span>
            </button>
            <button onClick={() => setShowShareModal(true)} className="bg-charcoal/60 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-charcoal/80 transition-colors">
                <span>📤</span>
            </button>"""

# Wait, `useStore` hook is used inside component. `useStore.getState()` is valid if imported but usually we use the hook instance.
# `const { ..., setSelectedBrand } = useStore();` is already in the component.
# Let's check imports.
# imports: `import { useStore } from '@/store/useStore';`
# Destructuring: `const { userStats, selectedBrand, selectedItem, setSelectedItem, selectedMode, faceAnalysis, poseAnalysis, } = useStore();`
# `setSelectedBrand` is NOT destructured in the current `FittingRoom` implementation I read earlier!
# `const { userStats, selectedBrand, selectedItem, setSelectedItem, selectedMode, faceAnalysis, poseAnalysis, } = useStore();`
# I need to add `setSelectedBrand` to the destructuring.

search_destructure = "selectedMode, faceAnalysis, poseAnalysis,"
replace_destructure = "selectedMode, faceAnalysis, poseAnalysis, setSelectedBrand,"

search_button_area = """        <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button onClick={() => setShowShareModal(true)}"""

replace_button_area = """        <div className="absolute top-4 left-4 flex gap-2 z-20">
            <button onClick={() => setSelectedBrand(null)} className="bg-charcoal/60 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-charcoal/80 transition-colors flex items-center gap-2 px-3 text-xs font-bold text-white">
                ← Back to brands
            </button>
            <button onClick={() => setShowShareModal(true)}"""

replace_in_file('components/FittingRoom.tsx', search_destructure, replace_destructure)
replace_in_file('components/FittingRoom.tsx', search_button_area, replace_button_area)
