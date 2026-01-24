import re

class MaterialMapper:
    """
    Parses material composition strings and maps them to physics engine presets.
    """

    PRESETS = {
        "cotton": ["cotton", "linen", "canvas", "hemp"],
        "wool": ["wool", "cashmere", "mohair", "alpaca", "knit"],
        "silk": ["silk", "satin", "rayon", "viscose", "chiffon", "crepe"],
        "denim": ["denim", "jeans"],
        "leather": ["leather", "suede", "faux leather", "lambskin", "calfskin"],
        "synthetic": ["polyester", "nylon", "elastane", "spandex", "acrylic", "polyurethane", "polyamide"],
        "heavy": ["tweed", "velvet", "corduroy"]
    }

    @staticmethod
    def parse_composition(text: str) -> dict:
        """
        Extracts material percentages from text.
        Example: "Wool 90%, Cashmere 10%" -> {'wool': 90, 'cashmere': 10}
        """
        if not text:
            return {}

        text = text.lower()
        # Regex to match patterns like "90% wool" or "wool 90%"
        # Pattern 1: Number% Material
        matches_1 = re.findall(r'(\d+)\s*%\s*([a-z\s]+)', text)

        # Pattern 2: Material Number%
        matches_2 = re.findall(r'([a-z\s]+)\s*(\d+)\s*%', text)

        composition = {}

        # validation set
        valid_keywords = set()
        for keywords in MaterialMapper.PRESETS.values():
            valid_keywords.update(keywords)

        for amount, material in matches_1:
            clean_mat = material.strip()
            if not clean_mat:
                continue
            # Basic validation: must contain at least one known material keyword
            if any(k in clean_mat for k in valid_keywords):
                composition[clean_mat] = composition.get(clean_mat, 0) + int(amount)

        for material, amount in matches_2:
            clean_mat = material.strip()
            if not clean_mat:
                continue
            if any(k in clean_mat for k in valid_keywords):
                composition[clean_mat] = composition.get(clean_mat, 0) + int(amount)

        return composition

    @staticmethod
    def get_preset(material_text: str) -> str:
        """
        Determines the dominant physics preset based on the material text.
        """
        if not material_text:
            return "cotton" # Default

        text = material_text.lower()

        # Check for composition percentages first
        composition = MaterialMapper.parse_composition(text)

        dominant_material = "cotton"
        max_percentage = 0

        if composition:
            # Find dominant material
            for mat, percent in composition.items():
                if percent > max_percentage:
                    max_percentage = percent
                    dominant_material = mat
        else:
            # Fallback to simple keyword search if no percentages found
            dominant_material = text

        # Map dominant material to preset
        for preset, keywords in MaterialMapper.PRESETS.items():
            for keyword in keywords:
                if keyword in dominant_material:
                    return preset

        return "cotton" # Default fallback
