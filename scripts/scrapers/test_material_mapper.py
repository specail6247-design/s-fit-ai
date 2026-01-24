import unittest
from material_mapper import MaterialMapper

class TestMaterialMapper(unittest.TestCase):
    def test_parse_composition(self):
        self.assertEqual(MaterialMapper.parse_composition("100% Cotton"), {"cotton": 100})
        self.assertEqual(MaterialMapper.parse_composition("Wool 90%, Cashmere 10%"), {"wool": 90, "cashmere": 10})
        self.assertEqual(MaterialMapper.parse_composition("50% Polyester, 50% Cotton"), {"polyester": 50, "cotton": 50})
        self.assertEqual(MaterialMapper.parse_composition(""), {})

    def test_get_preset(self):
        # Direct matches
        self.assertEqual(MaterialMapper.get_preset("100% Silk"), "silk")
        self.assertEqual(MaterialMapper.get_preset("Denim"), "denim")

        # Composition logic
        self.assertEqual(MaterialMapper.get_preset("Wool 90%, Nylon 10%"), "wool")
        self.assertEqual(MaterialMapper.get_preset("Nylon 90%, Wool 10%"), "synthetic")

        # Fallbacks/Keywords
        self.assertEqual(MaterialMapper.get_preset("Tweed Jacket"), "heavy")
        self.assertEqual(MaterialMapper.get_preset("Unknown Stuff"), "cotton") # Default

    def test_invalid_material_rejection(self):
        # Should return empty dict because "Free Returns" is not in PRESETS
        self.assertEqual(MaterialMapper.parse_composition("100% Free Returns"), {})
        # Mixed valid and invalid
        self.assertEqual(MaterialMapper.parse_composition("100% Cotton, 100% Love"), {"cotton": 100})

if __name__ == '__main__':
    unittest.main()
