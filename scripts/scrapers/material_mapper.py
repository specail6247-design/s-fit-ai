import re
from typing import Dict, Any, Tuple

class MaterialMapper:
    """
    Parses material composition strings and maps them to physics engine presets.
    """

    # Physics properties from lib/MaterialLibrary.ts
    MATERIAL_LIBRARY = {
        "cotton": {
            "name": "Cotton",
            "roughness": 0.8,
            "metalness": 0,
            "thickness": 1,
            "color": "#ffffff",
            "stretchFactor": 0.3,
            "drapingFactor": 0.4,
            "stiffness": 0.5,
        },
        "silk": {
            "name": "Silk",
            "roughness": 0.2,
            "metalness": 0.1,
            "clearcoat": 0.5,
            "thickness": 0.2,
            "color": "#f0f0f0",
            "stretchFactor": 0.1,
            "drapingFactor": 0.9,
            "stiffness": 0.1,
        },
        "denim": {
            "name": "Denim",
            "roughness": 0.9,
            "metalness": 0,
            "thickness": 1.5,
            "color": "#3b5998",
            "stretchFactor": 0.1,
            "drapingFactor": 0.2,
            "stiffness": 0.8,
        },
        "leather": {
            "name": "Leather",
            "roughness": 0.3,
            "metalness": 0.2,
            "thickness": 2,
            "color": "#3d2b1f",
            "stretchFactor": 0.05,
            "drapingFactor": 0.3,
            "stiffness": 0.9,
        },
        "knit": {
            "name": "Knit",
            "roughness": 0.85,
            "metalness": 0,
            "thickness": 2.5,
            "color": "#e0e0e0",
            "stretchFactor": 0.6,
            "drapingFactor": 0.6,
            "stiffness": 0.4,
        },
        "linen": {
            "name": "Linen",
            "roughness": 0.7,
            "metalness": 0,
            "thickness": 0.8,
            "color": "#faf0e6",
            "stretchFactor": 0.1,
            "drapingFactor": 0.5,
            "stiffness": 0.6,
        },
        "polyester": {
            "name": "Polyester",
            "roughness": 0.4,
            "metalness": 0.1,
            "thickness": 0.5,
            "color": "#f5f5f5",
            "stretchFactor": 0.4,
            "drapingFactor": 0.7,
            "stiffness": 0.3,
        },
    }

    # Mapping keywords to presets
    PRESETS = {
        "cotton": ["cotton", "canvas", "hemp"],
        "wool": ["wool", "cashmere", "mohair", "alpaca"], # Maps to knit usually or heavier
        "knit": ["knit", "sweater", "ribbed", "jersey"],
        "silk": ["silk", "satin", "rayon", "viscose", "chiffon", "crepe"],
        "denim": ["denim", "jeans"],
        "leather": ["leather", "suede", "faux leather", "lambskin", "calfskin", "polyurethane"],
        "synthetic": ["polyester", "nylon", "elastane", "spandex", "acrylic", "polyamide"],
        "linen": ["linen", "flax"],
        "heavy": ["tweed", "velvet", "corduroy"],
    }

    # Fallback map for keywords that don't match PRESET keys directly
    PRESET_MAPPING = {
        "wool": "knit",
        "synthetic": "polyester",
        "heavy": "denim"
    }

    @staticmethod
    def parse_composition(text: str) -> Dict[str, int]:
        """
        Extracts material percentages from text.
        Example: "Wool 90%, Cashmere 10%" -> {'wool': 90, 'cashmere': 10}
        """
        if not text:
            return {}

        text = text.lower()
        # Regex to match patterns like "90% wool" or "wool 90%"
        # Pattern 1: Number% Material
        matches_1 = re.findall(r'(\d+)\s*%\s*([a-z\s\-]+)', text)

        # Pattern 2: Material Number%
        matches_2 = re.findall(r'([a-z\s\-]+)\s*(\d+)\s*%', text)

        composition = {}

        # validation set
        valid_keywords = set()
        for keywords in MaterialMapper.PRESETS.values():
            valid_keywords.update(keywords)

        def clean_material_name(mat):
            mat = mat.strip()
            # remove common fluff words if needed
            return mat

        for amount, material in matches_1:
            clean_mat = clean_material_name(material)
            if not clean_mat: continue

            # Must match a known keyword to be valid
            if any(k in clean_mat for k in valid_keywords):
                 composition[clean_mat] = composition.get(clean_mat, 0) + int(amount)

        for material, amount in matches_2:
            clean_mat = clean_material_name(material)
            if not clean_mat: continue
            if any(k in clean_mat for k in valid_keywords):
                composition[clean_mat] = composition.get(clean_mat, 0) + int(amount)

        return composition

    @staticmethod
    def get_preset_from_keyword(keyword: str) -> str:
        """Finds the preset key for a given material keyword"""
        keyword = keyword.lower()
        for preset, keywords in MaterialMapper.PRESETS.items():
            if any(k in keyword for k in keywords):
                # Check if this preset has a direct mapping in MATERIAL_LIBRARY
                if preset in MaterialMapper.MATERIAL_LIBRARY:
                    return preset
                # Check fallback
                return MaterialMapper.PRESET_MAPPING.get(preset, "cotton")
        return "cotton"

    @staticmethod
    def analyze_composition(text: str) -> Dict[str, Any]:
        """
        Full analysis of material text.
        Returns:
            {
                "original_text": str,
                "composition": Dict[str, int],
                "texture_type": str (preset key),
                "physics": Dict (properties)
            }
        """
        composition = MaterialMapper.parse_composition(text)

        dominant_material = "cotton"
        max_percentage = 0

        # Determine dominant material
        if composition:
            for mat, percent in composition.items():
                if percent > max_percentage:
                    max_percentage = percent
                    dominant_material = mat
        else:
            # Fallback if no percentages: Look for keywords in text
            text_lower = text.lower()
            for preset, keywords in MaterialMapper.PRESETS.items():
                if any(k in text_lower for k in keywords):
                    dominant_material = keywords[0] # Pick first keyword as proxy
                    break

        # Map to preset key (e.g. "cotton", "silk")
        preset_key = MaterialMapper.get_preset_from_keyword(dominant_material)

        # Get physics properties
        physics_props = MaterialMapper.MATERIAL_LIBRARY.get(preset_key, MaterialMapper.MATERIAL_LIBRARY["cotton"])

        return {
            "original_text": text,
            "composition": composition,
            "texture_type": preset_key,
            "physics": physics_props
        }

    @staticmethod
    def get_preset(material_text: str) -> str:
        """Legacy compatibility"""
        return MaterialMapper.analyze_composition(material_text)["texture_type"]
